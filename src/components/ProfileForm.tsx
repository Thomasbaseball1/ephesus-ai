'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, Building2, Phone, Mail, Save } from 'lucide-react';

interface ProfileFormProps {
  initialData: {
    name: string;
    email: string;
    companyName: string;
    phone: string;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [name, setName] = useState(initialData.name);
  const [companyName, setCompanyName] = useState(initialData.companyName);
  const [phone, setPhone] = useState(initialData.phone);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), companyName: companyName.trim(), phone: phone.trim() }),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast.success('Profile updated successfully.');
    } catch {
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      <Card className="p-6 gradient-border">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-[#0D9488]" /> Account Information
        </h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Smith"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                value={initialData.email}
                disabled
                className="pl-10 opacity-60 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-muted-foreground">Email cannot be changed from this page.</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-sm">Company Name</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="company"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-sm">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
