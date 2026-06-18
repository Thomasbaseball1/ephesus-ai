import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#388087]/20 to-[#6FB3B8]/20 text-foreground text-sm font-medium backdrop-blur-sm">
              <Shield className="w-4 h-4" />
              <span>Data Protection &amp; Privacy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Privacy <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last Updated: November 16, 2025
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ephesus AI Solutions ("we," "us," "our," or "Company") is committed to protecting your privacy and 
                ensuring the security of your personal information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our website, services, AI solutions, and 
                communications, including our AI Voice Receptionist, SMS programs, and custom AI development services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using our services, you agree to the terms of this Privacy Policy. If you do not 
                agree with our practices, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">2.1 Information You Provide Directly</h3>
              <p className="text-muted-foreground leading-relaxed">
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Create an Account:</strong> Name, email address, phone number, company name, job title, password</li>
                <li><strong>Contact Us:</strong> Name, email, phone number, message content, company information</li>
                <li><strong>Schedule Consultations:</strong> Contact details, preferred dates/times, consultation topic, business requirements</li>
                <li><strong>Use Our Services:</strong> Service preferences, project specifications, custom requirements</li>
                <li><strong>Make Purchases:</strong> Billing information, payment card details (processed securely by third-party payment processors)</li>
                <li><strong>Complete Surveys:</strong> Survey responses, feedback, ratings, comments</li>
                <li><strong>Opt-In to Communications:</strong> Phone number for SMS, email address for newsletters, communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.2 Information Collected Automatically</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you access our website or services, we automatically collect certain information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Information:</strong> Pages viewed, links clicked, time spent on pages, access times, referral URLs</li>
                <li><strong>Location Information:</strong> General geographic location based on IP address</li>
                <li><strong>Cookies and Tracking:</strong> Session IDs, preferences, analytics data (see Section 9 for details)</li>
                <li><strong>Log Data:</strong> Server logs, error reports, performance data</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.3 AI Voice Receptionist Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you interact with our AI Voice Receptionist, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Voice Recordings:</strong> Audio recordings of your conversations with our AI system</li>
                <li><strong>Transcripts:</strong> Text transcriptions of voice interactions</li>
                <li><strong>Call Metadata:</strong> Call duration, date/time, phone number, call outcome</li>
                <li><strong>Intent and Context:</strong> Purpose of call, topics discussed, inquiries made</li>
                <li><strong>Conversation Analytics:</strong> Sentiment analysis, language preferences, interaction patterns</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Note:</strong> Voice recordings are used to improve AI accuracy, provide services, and ensure 
                quality. Recordings may be reviewed by our team for training and quality assurance.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.4 SMS and Communication Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you participate in our SMS program:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Phone Number:</strong> Mobile phone number and carrier information</li>
                <li><strong>Message Content:</strong> Content of SMS messages sent and received</li>
                <li><strong>Engagement Data:</strong> Message open rates, response times, opt-in/opt-out status</li>
                <li><strong>Consent Records:</strong> Date/time of opt-in, consent method, opt-out requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.5 Information from Third Parties</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may receive information about you from third-party sources:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Business Partners:</strong> Referral information, lead data</li>
                <li><strong>Analytics Providers:</strong> Website analytics, user behavior insights</li>
                <li><strong>Social Media:</strong> Public profile information if you interact with us on social platforms</li>
                <li><strong>Data Enrichment Services:</strong> Company information, business intelligence data</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the collected information for various purposes:
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">3.1 Service Delivery</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide, operate, and maintain our AI services and website</li>
                <li>Process transactions and send related information</li>
                <li>Schedule and manage consultations and appointments</li>
                <li>Deliver AI Voice Receptionist services and call handling</li>
                <li>Develop and implement custom AI solutions</li>
                <li>Provide customer support and respond to inquiries</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">3.2 Communications</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Send transactional emails and SMS messages (order confirmations, appointment reminders)</li>
                <li>Send marketing communications, newsletters, and promotional offers (with your consent)</li>
                <li>Respond to comments, questions, and customer service requests</li>
                <li>Conduct surveys and gather feedback</li>
                <li>Send important notices about our services, policies, or terms</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">3.3 AI Improvement and Training</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Train and improve our AI models and algorithms</li>
                <li>Enhance voice recognition and natural language processing capabilities</li>
                <li>Develop new AI features and services</li>
                <li>Conduct research and development in artificial intelligence</li>
                <li>Analyze conversation patterns to improve response accuracy</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">3.4 Analytics and Business Operations</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Improve website functionality and user experience</li>
                <li>Conduct business planning and reporting</li>
                <li>Detect, prevent, and address technical issues and fraud</li>
                <li>Ensure security and integrity of our services</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">3.5 Legal and Compliance</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Comply with legal obligations and regulatory requirements</li>
                <li>Enforce our Terms of Service and other policies</li>
                <li>Protect our rights, property, and safety</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Respond to legal requests and prevent illegal activity</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information in the following circumstances:
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">4.1 Service Providers</h3>
              <p className="text-muted-foreground leading-relaxed">
                We share information with third-party service providers who perform services on our behalf:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Cloud Hosting:</strong> AWS, Google Cloud, or similar providers for data storage and computing</li>
                <li><strong>Payment Processing:</strong> Stripe, PayPal, or other payment processors for transaction processing</li>
                <li><strong>SMS Services:</strong> Twilio, MessageBird, or similar providers for SMS delivery</li>
                <li><strong>Email Services:</strong> SendGrid, Mailchimp, or similar providers for email delivery</li>
                <li><strong>Analytics:</strong> Google Analytics, Mixpanel, or similar tools for usage analytics</li>
                <li><strong>AI Infrastructure:</strong> OpenAI, Anthropic, or other AI service providers for AI processing</li>
                <li><strong>Customer Support:</strong> Zendesk, Intercom, or similar platforms for support services</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                These service providers are contractually obligated to protect your information and use it only for 
                the specific services they provide to us.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">4.2 Business Transfers</h3>
              <p className="text-muted-foreground leading-relaxed">
                If we are involved in a merger, acquisition, sale of assets, financing, bankruptcy, or other business 
                transaction, your information may be transferred as part of that transaction. We will notify you of 
                any such change in ownership or control of your personal information.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">4.3 Legal Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may disclose your information if required to do so by law or in response to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Court orders, subpoenas, or other legal processes</li>
                <li>Government or regulatory requests</li>
                <li>Law enforcement inquiries</li>
                <li>Legal claims or investigations</li>
                <li>Protection of our legal rights and safety</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">4.4 With Your Consent</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with third parties when you give us explicit consent to do so.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">4.5 SMS Data — No Third-Party Sharing</h3>
              <p className="text-muted-foreground leading-relaxed">
                <strong>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.</strong> Information sharing to subcontractors in support services, such as customer service, is permitted. All other uses require your explicit consent.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">4.6 Aggregated and De-Identified Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may share aggregated, anonymized, or de-identified information that cannot reasonably be used to
                identify you for business purposes, research, or marketing.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">Retention Periods:</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Account Information:</strong> Retained while your account is active and for 3 years after account closure</li>
                <li><strong>Voice Recordings:</strong> Retained for up to 2 years for quality assurance and AI training</li>
                <li><strong>Transaction Data:</strong> Retained for 7 years for tax and accounting purposes</li>
                <li><strong>Marketing Data:</strong> Retained until you opt out or for 3 years of inactivity</li>
                <li><strong>Website Analytics:</strong> Retained for up to 26 months</li>
                <li><strong>Support Communications:</strong> Retained for 3 years after resolution</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                After the retention period expires, we will securely delete or anonymize your information. Some 
                information may be retained in backup systems for a limited time after deletion.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Encryption:</strong> Data is encrypted in transit (TLS/SSL) and at rest (AES-256)</li>
                <li><strong>Access Controls:</strong> Role-based access controls and multi-factor authentication</li>
                <li><strong>Secure Infrastructure:</strong> Firewall protection, intrusion detection, and monitoring</li>
                <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                <li><strong>Employee Training:</strong> Staff trained on data protection and security practices</li>
                <li><strong>Incident Response:</strong> Procedures for detecting and responding to security incidents</li>
                <li><strong>Vendor Security:</strong> Third-party vendors must meet our security standards</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Important:</strong> No method of transmission over the internet or electronic storage is 100% 
                secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">7. Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">7.1 General Rights</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Access:</strong> Request access to your personal information and receive a copy</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal retention requirements)</li>
                <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">7.2 California Residents (CCPA Rights)</h3>
              <p className="text-muted-foreground leading-relaxed">
                California residents have additional rights under the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information (with exceptions)</li>
                <li>Right to opt-out of the sale of personal information (we do not sell your information)</li>
                <li>Right to non-discrimination for exercising your CCPA rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">7.3 European Residents (GDPR Rights)</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you are in the European Economic Area (EEA), you have rights under the General Data Protection 
                Regulation (GDPR):
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
                <li>Right to data portability</li>
                <li>Right to object to processing for direct marketing</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">7.4 How to Exercise Your Rights</h3>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of your rights, contact us at:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Email: privacy@ephesusai.com or support@ephesusai.com</li>
                <li>Submit a request through our Contact page</li>
                <li>For SMS opt-out: Text STOP to any message</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We will respond to your request within 30 days (or as required by applicable law). We may need to 
                verify your identity before processing your request.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal 
                information from children under 18. If you believe we have collected information from a child under 18, 
                please contact us immediately at privacy@ephesusai.com, and we will take steps to delete such information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">9. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to collect and store information about your use of 
                our website and services.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">9.1 Types of Cookies We Use</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Essential Cookies:</strong> Required for website functionality (authentication, security)</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (Google Analytics)</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Track visits across websites for advertising purposes (with your consent)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">9.2 Managing Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                You can control cookies through:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Your browser settings (most browsers allow you to refuse or delete cookies)</li>
                <li>Our cookie consent banner when you first visit our website</li>
                <li>Opt-out tools provided by advertising networks</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Note: Disabling cookies may affect website functionality and your user experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">10. Third-Party Links and Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites, services, or applications. We are not 
                responsible for the privacy practices of these third parties. We encourage you to review their 
                privacy policies before providing any personal information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">11. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. 
                These countries may have different data protection laws. When we transfer your information 
                internationally, we ensure appropriate safeguards are in place, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Standard Contractual Clauses approved by the European Commission</li>
                <li>Data Processing Agreements with service providers</li>
                <li>Compliance with applicable data protection frameworks</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">12. AI and Automated Decision-Making</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use AI and automated systems to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide AI Voice Receptionist services</li>
                <li>Analyze customer interactions and sentiment</li>
                <li>Personalize user experiences</li>
                <li>Detect fraud and security threats</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We do not make automated decisions that significantly affect you without human oversight or your 
                explicit consent. You have the right to request human review of automated decisions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">13. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, 
                legal requirements, or other factors. When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Update the "Last Updated" date at the top of this policy</li>
                <li>Notify you via email or through a prominent notice on our website</li>
                <li>For significant changes, obtain your consent where required by law</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Your continued use of our services after changes to this Privacy Policy constitutes acceptance of the 
                updated terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">14. Data Protection Officer</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our privacy practices or wish to exercise your privacy rights, you can 
                contact our Data Protection Officer at:
              </p>
              <div className="bg-secondary/30 rounded-lg p-6 space-y-2 text-muted-foreground">
                <p><strong>Data Protection Officer</strong></p>
                <p>Ephesus AI Solutions</p>
                <p>Email: privacy@ephesusai.com</p>
                <p>General Inquiries: contact@ephesusai.com</p>
                <p>Website: ephesusai.com/contact</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">15. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="bg-secondary/30 rounded-lg p-6 space-y-2 text-muted-foreground">
                <p><strong>Ephesus AI Solutions</strong></p>
                <p>Email: support@ephesusai.com</p>
                <p>Privacy Inquiries: privacy@ephesusai.com</p>
                <p>Website: ephesusai.com/contact</p>
              </div>
            </section>

            <section className="space-y-4 mt-12 p-6 bg-gradient-to-r from-[#388087]/10 to-[#6FB3B8]/10 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground">Your Privacy Matters</h3>
              <p className="text-sm text-muted-foreground">
                We are committed to protecting your privacy and handling your personal information responsibly. 
                If you have any questions or concerns about how we collect, use, or protect your data, please 
                don't hesitate to reach out to us at privacy@ephesusai.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}