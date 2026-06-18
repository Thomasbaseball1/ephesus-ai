import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageSquare } from "lucide-react";

export default function SMSTermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#388087]/20 to-[#6FB3B8]/20 text-foreground text-sm font-medium backdrop-blur-sm">
              <MessageSquare className="w-4 h-4" />
              <span>SMS Communication Terms</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              SMS Terms &amp; <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Conditions</span>
            </h1>
            <p className="text-muted-foreground">
              Last Updated: November 16, 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. SMS Program Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ephesus AI Solutions ("we," "us," or "our") offers SMS/text messaging services to provide you with 
                important updates, notifications, appointment reminders, promotional offers, and customer service 
                communications. By opting in to receive SMS messages from us, you agree to these SMS Terms and Conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Consent to Receive SMS Messages</h2>
              <p className="text-muted-foreground leading-relaxed">
                By providing your mobile phone number and opting in to our SMS program, you expressly consent to 
                receive text messages from Ephesus AI Solutions at the phone number you provided. This consent is 
                not a condition of purchase. You may opt out at any time by following the instructions provided in 
                Section 6 below.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You represent and warrant that you are the account holder for the mobile phone number you provide, 
                or that you have authorization from the account holder to receive SMS messages at that number.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Types of SMS Messages</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may receive the following types of SMS messages from us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Transactional Messages:</strong> Order confirmations, appointment reminders, service updates, account notifications</li>
                <li><strong>Marketing Messages:</strong> Promotional offers, new service announcements, special discounts, company news</li>
                <li><strong>Customer Service Messages:</strong> Responses to your inquiries, support communications, follow-up messages</li>
                <li><strong>AI Voice Receptionist Messages:</strong> Automated reminders, scheduling confirmations, callback notifications</li>
                <li><strong>Survey and Feedback Requests:</strong> Customer satisfaction surveys, feedback requests</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Message Frequency</h2>
              <p className="text-muted-foreground leading-relaxed">
                Message frequency may vary depending on your interaction with our services. You may receive:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Up to 10 messages per month for promotional communications</li>
                <li>Transactional messages as needed based on your service usage</li>
                <li>Appointment reminders 24-48 hours before scheduled consultations</li>
                <li>Urgent service updates or account-related notifications as necessary</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Message and Data Rates</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Message and data rates may apply.</strong> Standard text messaging rates from your wireless 
                carrier will apply to all SMS messages sent and received. The number of messages you receive will 
                depend on your interaction with our services. Please contact your wireless carrier for information 
                about your text messaging plan and pricing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We do not charge for SMS messages, but your carrier's standard messaging rates apply. You are 
                responsible for all charges from your wireless carrier.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. How to Opt Out (STOP)</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may opt out of receiving SMS messages at any time by:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Text "STOP":</strong> Reply with "STOP," "UNSUBSCRIBE," "CANCEL," "END," or "QUIT" to any SMS message from us</li>
                <li><strong>Email Request:</strong> Send an email to support@ephesusai.com with "SMS Opt-Out" in the subject line</li>
                <li><strong>Account Settings:</strong> Update your communication preferences in your account dashboard</li>
                <li><strong>Contact Support:</strong> Call or email our customer support team to request removal</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                After you opt out, you will receive one final confirmation message acknowledging your opt-out 
                request. You will not receive further marketing SMS messages from us unless you opt back in.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Note:</strong> Opting out of marketing messages does not opt you out of transactional 
                messages related to your active services, appointments, or account security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. How to Get Help (HELP)</h2>
              <p className="text-muted-foreground leading-relaxed">
                For assistance with our SMS program, you can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Text "HELP":</strong> Reply with "HELP" or "INFO" to any SMS message from us</li>
                <li><strong>Email Support:</strong> Contact us at support@ephesusai.com</li>
                <li><strong>Visit Website:</strong> View our help resources at ephesusai.com/contact</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                After texting "HELP," you will receive a message with instructions on how to use our SMS program 
                and how to opt out.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. Supported Carriers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our SMS program is supported by major U.S. wireless carriers including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>AT&amp;T, T-Mobile, Verizon Wireless, Sprint, Boost Mobile, Cricket Wireless</li>
                <li>MetroPCS, U.S. Cellular, Virgin Mobile, and other major carriers</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                T-Mobile is not liable for delayed or undelivered messages. Carriers are not liable for delayed 
                or undelivered messages.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">9. TCPA Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                We comply with the Telephone Consumer Protection Act (TCPA) and all applicable federal and state 
                regulations regarding SMS communications. Our practices include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Express Written Consent:</strong> We obtain your express written consent before sending marketing SMS messages</li>
                <li><strong>Clear Identification:</strong> All messages clearly identify Ephesus AI Solutions as the sender</li>
                <li><strong>Easy Opt-Out:</strong> Every marketing message includes clear opt-out instructions</li>
                <li><strong>Opt-Out Honoring:</strong> We process opt-out requests immediately and within 24 hours</li>
                <li><strong>No Auto-Dialing Without Consent:</strong> We do not use automatic telephone dialing systems without your prior express consent</li>
                <li><strong>Record Keeping:</strong> We maintain records of all opt-in consents and opt-out requests</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">10. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. Information collected through our SMS program is subject to our 
                Privacy Policy. We collect and use your mobile phone number and related information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Send you the SMS messages you requested</li>
                <li>Provide customer service and support</li>
                <li>Improve our services and communications</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We will not sell, rent, or share your mobile phone number with third parties for their marketing 
                purposes without your explicit consent. We may share your information with service providers who 
                assist us in delivering SMS messages, but only as necessary to provide the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">11. Automated SMS and AI-Powered Communications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some SMS messages you receive may be automated or generated by our AI systems, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>AI Voice Receptionist Follow-Ups:</strong> Automated messages after AI voice interactions</li>
                <li><strong>Appointment Reminders:</strong> System-generated reminders for scheduled consultations</li>
                <li><strong>Status Updates:</strong> Automated notifications about your service requests</li>
                <li><strong>Survey Invitations:</strong> AI-triggered feedback requests</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                By opting in, you consent to receive these automated messages. You can opt out at any time using 
                the methods described in Section 6.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">12. Message Delivery and Reliability</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to deliver all SMS messages promptly and reliably:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We do not guarantee delivery of any SMS message</li>
                <li>Message delivery may be delayed or fail due to carrier issues, network problems, or device compatibility</li>
                <li>We are not responsible for messages that are not received due to carrier filtering, user device settings, or other technical issues</li>
                <li>Time-sensitive information should not be solely communicated via SMS</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">13. Age Restrictions</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be 18 years of age or older to use this SMS service. By opting in, you represent and
                warrant that you are at least 18 years of age. We do not knowingly send SMS communications to
                individuals under the age of 18. If we become aware that a user is under 18, we will immediately
                remove them from our SMS program.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">14. Number Changes and Updates</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for notifying us of any changes to your mobile phone number. If you change 
                your mobile number or transfer it to another person:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Update your contact information in your account settings</li>
                <li>Contact us at support@ephesusai.com to update your number</li>
                <li>Text "STOP" from your old number if you still have access to it</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We are not responsible for messages sent to a phone number you no longer control.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">15. Prohibited Uses</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use our SMS program to send spam, harassing, or inappropriate messages</li>
                <li>Provide false or misleading information when opting in</li>
                <li>Share your access to our SMS program with unauthorized third parties</li>
                <li>Attempt to interfere with or disrupt our SMS systems</li>
                <li>Use our SMS program for any illegal purpose</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">16. International SMS</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our SMS program is primarily designed for users with U.S. mobile phone numbers. International 
                SMS delivery may be limited or unavailable. International message and data rates may be 
                significantly higher. Please check with your carrier before opting in if you have an international 
                phone number.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">17. Modifications to SMS Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these SMS Terms at any time. We will notify you of material changes 
                via SMS or through other communication channels. Your continued participation in our SMS program 
                after such notification constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">18. Termination of SMS Program</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to terminate or suspend our SMS program or your participation in it at any 
                time, with or without notice, for any reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Violation of these SMS Terms</li>
                <li>Fraudulent or abusive behavior</li>
                <li>Technical or business reasons</li>
                <li>Legal or regulatory requirements</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">19. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                OUR SMS PROGRAM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR 
                IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
                PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SMS PROGRAM WILL BE UNINTERRUPTED, 
                ERROR-FREE, OR COMPLETELY SECURE.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">20. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, EPHESUS AI SOLUTIONS SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, 
                WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE 
                LOSSES RESULTING FROM YOUR USE OF OUR SMS PROGRAM.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">21. Dispute Resolution</h2>
              <p className="text-muted-foreground leading-relaxed">
                Any disputes arising from these SMS Terms shall be resolved in accordance with the dispute 
                resolution provisions in our main Terms of Service, including arbitration requirements if applicable.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">22. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions, concerns, or support regarding our SMS program, please contact us:
              </p>
              <div className="bg-secondary/30 rounded-lg p-6 space-y-2 text-muted-foreground">
                <p><strong>Ephesus AI Solutions</strong></p>
                <p>Email: support@ephesusai.com</p>
                <p>Website: ephesusai.com/contact</p>
                <p>Text "HELP" to any message for immediate assistance</p>
              </div>
            </section>

            <section className="space-y-4 mt-12 p-6 bg-gradient-to-r from-[#388087]/10 to-[#6FB3B8]/10 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground">Quick Reference</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>To Opt Out:</strong> Text STOP to any message</li>
                <li><strong>For Help:</strong> Text HELP to any message</li>
                <li><strong>Message Frequency:</strong> Varies, up to 10/month for marketing</li>
                <li><strong>Msg &amp; Data Rates May Apply:</strong> Standard carrier rates</li>
                <li><strong>Support:</strong> support@ephesusai.com</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}