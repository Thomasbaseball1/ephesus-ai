import type { LucideIcon } from 'lucide-react';

interface DashboardPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status?: string;
}

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  status,
}: DashboardPageHeaderProps) {
  return (
    <header className="dashboard-page-header">
      <div className="dashboard-page-header__glow" />
      <div className="dashboard-page-header__content">
        <div className="dashboard-page-icon">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="dashboard-kicker">{eyebrow}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1>{title}</h1>
            {status && (
              <span className="dashboard-live-badge">
                <span />
                {status}
              </span>
            )}
          </div>
          <p className="dashboard-page-header__description">{description}</p>
        </div>
      </div>
    </header>
  );
}
