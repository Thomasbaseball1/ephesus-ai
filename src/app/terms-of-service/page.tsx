import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Terms of Service | Ephesus AI Solutions",
  description: "Terms of Service for Ephesus AI Solutions - AI consulting, implementation, and voice receptionist services.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Terms of <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Service</span>
              </h1>
              <p className="text-muted-foreground">Last Updated: November 11, 2025</p>
            </div>

            <Card className="p-8 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the services provided by Ephesus AI Solutions ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our services. These Terms apply to all visitors, users, and others who access or use our services, including but not limited to AI consulting, implementation services, AI voice receptionist systems, custom AI development, SMS outreach campaigns, cold calling services, and any other services we may offer.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">2. Eligibility and Age Restriction</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    <strong>You must be 18 years of age or older to use our services, including our SMS program.</strong> By accessing or using any Ephesus AI Solutions service, you represent and warrant that you are at least 18 years of age. If you are under 18, you are not permitted to use our services.
                  </p>
                  <p>
                    We do not knowingly provide services to or collect personal information from individuals under the age of 18. If we become aware that a user is under 18, we will immediately terminate their access and remove them from any active SMS programs or communications.
                  </p>
                  <p>
                    By opting into our SMS communications, you confirm that you are at least 18 years old and are the account holder or authorized user of the phone number provided.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. Description of Services</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Ephesus AI Solutions provides a comprehensive suite of artificial intelligence services designed to transform business operations:
                  </p>
                  <div className="pl-6 space-y-2">
                    <p><strong>2.1 AI Voice Receptionist Services:</strong> We provide 24/7 intelligent voice assistant solutions that handle inbound and outbound calls, schedule appointments, answer customer inquiries, qualify leads, and provide automated customer support with human-like conversation capabilities.</p>
                    
                    <p><strong>2.2 Custom AI Development:</strong> Bespoke artificial intelligence solutions tailored to your specific business requirements, including but not limited to machine learning models, natural language processing systems, computer vision applications, predictive analytics, and automation workflows.</p>
                    
                    <p><strong>2.3 AI Strategy Consulting:</strong> Strategic advisory services to help organizations develop and implement AI transformation roadmaps, identify use cases, assess technical feasibility, and optimize AI implementations for maximum business impact.</p>
                    
                    <p><strong>2.4 SMS Outreach Services:</strong> Automated and semi-automated text message marketing campaigns, customer engagement sequences, appointment reminders, lead nurturing communications, and transactional messaging services using AI-powered personalization and optimization.</p>
                    
                    <p><strong>2.5 Cold Calling Services:</strong> AI-assisted and AI-automated outbound calling campaigns for lead generation, customer acquisition, market research, appointment setting, and sales prospecting using advanced voice AI technology.</p>
                    
                    <p><strong>2.6 Implementation and Integration:</strong> End-to-end deployment of AI solutions into your existing business infrastructure, including system integration, API connections, workflow automation, and technical support.</p>
                    
                    <p><strong>2.7 Training and Support:</strong> Comprehensive training programs for your team on AI tool utilization, ongoing technical support, troubleshooting assistance, and continuous optimization services.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">3. SMS Outreach and Communication Terms</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>3.1 Compliance Requirements:</strong> All SMS outreach services provided by Ephesus AI Solutions are conducted in compliance with the Telephone Consumer Protection Act (TCPA), CAN-SPAM Act, and all applicable federal, state, and international telecommunications regulations. You agree that you have obtained proper consent from all recipients of SMS messages sent through our services.</p>
                  
                  <p><strong>3.2 Consent and Opt-In:</strong> You represent and warrant that you have obtained express written consent from all individuals before sending them SMS messages through our platform. This includes clear disclosure of message frequency, standard message and data rates, and easy opt-out mechanisms. You are solely responsible for maintaining records of all consents obtained.</p>
                  
                  <p><strong>3.3 Content Restrictions:</strong> You agree not to send SMS messages that contain illegal content, spam, harassment, threats, fraudulent information, misleading claims, adult content, or any content that violates applicable laws or regulations. We reserve the right to review and reject any message content that violates these Terms.</p>
                  
                  <p><strong>3.4 Opt-Out Compliance:</strong> All SMS messages must include clear opt-out instructions (typically "Reply STOP to unsubscribe"). You agree to immediately honor all opt-out requests and maintain a suppression list of individuals who have opted out. We will automatically process standard opt-out keywords (STOP, UNSUBSCRIBE, CANCEL, etc.).</p>
                  
                  <p><strong>3.5 Message Rates and Delivery:</strong> While we strive for reliable message delivery, we do not guarantee delivery of all SMS messages. Factors beyond our control, including carrier restrictions, network issues, and recipient device limitations, may affect delivery. Standard message and data rates apply to all recipients and are the responsibility of the recipient.</p>
                  
                  <p><strong>3.6 Volume Limitations:</strong> We reserve the right to implement rate limits, volume restrictions, or throttling on SMS campaigns to ensure compliance with carrier guidelines and maintain service quality. High-volume campaigns may require additional verification or approval.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">4. Cold Calling and Voice Communication Terms</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>4.1 TCPA Compliance:</strong> All cold calling services, whether AI-automated or AI-assisted, are provided in compliance with the Telephone Consumer Protection Act (TCPA), Federal Communications Commission (FCC) regulations, and all applicable state and federal do-not-call laws. You agree to comply with all applicable telemarketing regulations.</p>
                  
                  <p><strong>4.2 Do Not Call Registry:</strong> You represent and warrant that you will not use our services to contact numbers registered on the National Do Not Call Registry unless you have an established business relationship or express written consent. You are responsible for scrubbing your contact lists against the DNC registry before initiating campaigns.</p>
                  
                  <p><strong>4.3 Calling Time Restrictions:</strong> All outbound calls must be made during permitted calling hours as defined by applicable law (typically 8 AM to 9 PM in the recipient's local time zone). You agree not to use our services to make calls outside of these permitted hours.</p>
                  
                  <p><strong>4.4 Disclosure Requirements:</strong> All calls must include proper identification of the calling party, the purpose of the call, and clear disclosure that an artificial intelligence system may be in use if applicable. You must provide accurate callback information and honor all opt-out requests immediately.</p>
                  
                  <p><strong>4.5 Call Recording:</strong> When using our services, calls may be recorded for quality assurance, training, compliance monitoring, and service improvement purposes. You agree to comply with all applicable call recording consent laws and to notify call recipients of recording where required by law.</p>
                  
                  <p><strong>4.6 AI Voice Disclosure:</strong> When using AI-powered voice assistants or synthetic voices for customer interactions, you agree to make appropriate disclosures as required by applicable law. While our AI systems are designed to sound natural, transparency with customers is encouraged.</p>
                  
                  <p><strong>4.7 Campaign Monitoring:</strong> We reserve the right to monitor, review, and audit calling campaigns for compliance with these Terms and applicable laws. We may suspend or terminate services if we detect violations or receive complaints about calling practices.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">5. User Obligations and Responsibilities</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>5.1 Legal Compliance:</strong> You agree to use our services only for lawful purposes and in compliance with all applicable local, state, federal, and international laws and regulations. You are solely responsible for ensuring your use of our services complies with all laws applicable to your business and industry.</p>
                  
                  <p><strong>5.2 Accurate Information:</strong> You agree to provide accurate, current, and complete information when using our services and to maintain and update this information to keep it accurate and complete. You are responsible for all information, data, and content you submit through our services.</p>
                  
                  <p><strong>5.3 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access or security breaches.</p>
                  
                  <p><strong>5.4 Prohibited Activities:</strong> You agree not to: (a) use our services for any illegal or unauthorized purpose; (b) violate any laws, regulations, or third-party rights; (c) transmit any malicious code, viruses, or harmful content; (d) attempt to gain unauthorized access to our systems; (e) interfere with or disrupt our services; (f) engage in any activity that could damage our reputation; (g) use our services to harass, abuse, or harm others; or (h) violate any intellectual property rights.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">6. Data Privacy and Security</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>6.1 Data Collection:</strong> We collect and process personal and business data necessary to provide our services, including contact information, communication records, usage data, and any information you provide to us. Our collection and use of data is governed by our Privacy Policy.</p>
                  
                  <p><strong>6.2 Data Security:</strong> We implement industry-standard security measures to protect your data, including encryption, access controls, secure data storage, and regular security audits. However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
                  
                  <p><strong>6.3 Data Processing:</strong> By using our services, you consent to the processing of data as described in our Privacy Policy. For AI services, this may include using your data to train, improve, and optimize AI models, subject to appropriate confidentiality and security measures.</p>
                  
                  <p><strong>6.4 Third-Party Services:</strong> Our services may integrate with third-party platforms, APIs, and services. We are not responsible for the privacy practices or content of these third parties. You should review their privacy policies and terms of service.</p>
                  
                  <p><strong>6.5 Data Retention:</strong> We retain your data for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your data subject to legal and contractual retention requirements.</p>
                  
                  <p><strong>6.6 GDPR and International Compliance:</strong> If you are located in the European Economic Area or other jurisdictions with specific data protection laws, additional rights and protections may apply as outlined in our Privacy Policy.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">7. Intellectual Property Rights</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>7.1 Our Intellectual Property:</strong> All content, software, technology, AI models, algorithms, code, designs, trademarks, logos, and other materials provided through our services are the exclusive property of Ephesus AI Solutions or our licensors and are protected by copyright, trademark, patent, and other intellectual property laws.</p>
                  
                  <p><strong>7.2 Limited License:</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our services for your business purposes in accordance with these Terms. This license does not include any right to: (a) resell or commercially exploit our services; (b) modify, reverse engineer, or create derivative works; (c) download or copy content except as necessary for service use; or (d) use our intellectual property for any purpose other than as expressly permitted.</p>
                  
                  <p><strong>7.3 Your Content:</strong> You retain all ownership rights to content, data, and materials you provide through our services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and process your content solely to provide and improve our services.</p>
                  
                  <p><strong>7.4 Custom Development:</strong> For custom AI development projects, intellectual property ownership will be specified in individual project agreements or statements of work. Unless otherwise agreed in writing, we retain ownership of all underlying technology, frameworks, and tools, while you receive a license to use the custom solution.</p>
                  
                  <p><strong>7.5 Feedback:</strong> If you provide feedback, suggestions, or ideas about our services, we may use them without any obligation to compensate you and without any restrictions.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">8. Payment Terms and Pricing</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>8.1 Fees:</strong> You agree to pay all fees associated with your use of our services as specified in your service agreement, subscription plan, or project proposal. All fees are in U.S. Dollars unless otherwise specified.</p>
                  
                  <p><strong>8.2 Payment Methods:</strong> We accept payment via credit card, ACH transfer, wire transfer, or other methods as agreed upon. By providing payment information, you authorize us to charge the specified payment method for all fees incurred.</p>
                  
                  <p><strong>8.3 Billing Cycles:</strong> Subscription services are billed on a recurring basis (monthly, quarterly, or annually as selected). Fees are due in advance and are non-refundable except as expressly provided in these Terms or required by law.</p>
                  
                  <p><strong>8.4 Usage-Based Fees:</strong> Certain services (such as SMS messages, phone minutes, or API calls) may incur usage-based fees. You will be charged for actual usage based on our current rate card. We will provide usage tracking and reporting tools.</p>
                  
                  <p><strong>8.5 Price Changes:</strong> We reserve the right to modify our pricing at any time. Price changes for existing subscriptions will be communicated at least 30 days in advance and will take effect at the next renewal period. Continued use of services after a price change constitutes acceptance of the new pricing.</p>
                  
                  <p><strong>8.6 Late Payments:</strong> Late payments may result in service suspension and may incur late fees of 1.5% per month or the maximum rate permitted by law, whichever is less. You are responsible for all costs of collection, including reasonable attorney fees.</p>
                  
                  <p><strong>8.7 Taxes:</strong> All fees are exclusive of applicable taxes, duties, and similar charges. You are responsible for all taxes except those based on our net income.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">9. Service Level and Availability</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>9.1 Service Availability:</strong> We strive to maintain high availability of our services but do not guarantee uninterrupted or error-free service. Services may be temporarily unavailable due to maintenance, updates, technical issues, or circumstances beyond our control.</p>
                  
                  <p><strong>9.2 Maintenance:</strong> We may perform scheduled maintenance with advance notice when possible. Emergency maintenance may be performed without notice. We will make reasonable efforts to minimize service disruptions.</p>
                  
                  <p><strong>9.3 Service Level Agreements:</strong> Specific uptime guarantees and service level commitments may be provided in separate service level agreements (SLAs) for enterprise customers. SLA terms will govern in the event of any conflict with these general Terms.</p>
                  
                  <p><strong>9.4 AI Performance:</strong> While our AI systems are designed to perform at high levels of accuracy and effectiveness, AI technology is inherently probabilistic. We do not guarantee specific performance metrics, outcomes, or results from AI services unless expressly stated in a written agreement.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">10. Warranties and Disclaimers</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>10.1 Limited Warranty:</strong> We warrant that our services will be provided in a professional and workmanlike manner consistent with industry standards. This is your sole and exclusive warranty.</p>
                  
                  <p><strong>10.2 DISCLAIMER:</strong> EXCEPT AS EXPRESSLY PROVIDED, OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND THOSE ARISING FROM COURSE OF DEALING OR USAGE OF TRADE.</p>
                  
                  <p><strong>10.3 No Guarantee of Results:</strong> We do not guarantee specific business results, revenue increases, cost savings, lead generation outcomes, conversion rates, or any other specific outcomes from using our services. Results will vary based on numerous factors outside our control.</p>
                  
                  <p><strong>10.4 AI Limitations:</strong> AI technology has inherent limitations and may produce unexpected or incorrect results. You are responsible for reviewing and validating all AI-generated content, decisions, and outputs before use in business operations.</p>
                  
                  <p><strong>10.5 Third-Party Content:</strong> We are not responsible for any third-party content, products, services, or websites that may be accessed through our services. Your use of third-party resources is at your own risk.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">11. Limitation of Liability</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>11.1 LIABILITY CAP:</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR OUR SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR $1,000, WHICHEVER IS GREATER.</p>
                  
                  <p><strong>11.2 EXCLUSION OF DAMAGES:</strong> IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                  
                  <p><strong>11.3 Allocation of Risk:</strong> These limitations reflect the allocation of risk between the parties. The limitations will apply regardless of the form of action, whether in contract, tort, negligence, strict liability, or otherwise.</p>
                  
                  <p><strong>11.4 Exceptions:</strong> These limitations do not apply to liability that cannot be excluded or limited under applicable law, such as liability for fraud, gross negligence, or willful misconduct.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">12. Indemnification</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    You agree to indemnify, defend, and hold harmless Ephesus AI Solutions, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorney fees) arising from or related to: (a) your use of our services; (b) your violation of these Terms; (c) your violation of any law or regulation; (d) your violation of any third-party rights; (e) any content or data you provide; (f) your SMS or calling campaigns and compliance failures; or (g) any negligent or wrongful acts or omissions by you or your employees.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">13. Term and Termination</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>13.1 Term:</strong> These Terms commence when you first access or use our services and continue until terminated as provided herein.</p>
                  
                  <p><strong>13.2 Termination by You:</strong> You may terminate your account at any time by providing written notice. Termination will be effective at the end of your current billing period. You will not receive refunds for any prepaid fees.</p>
                  
                  <p><strong>13.3 Termination by Us:</strong> We may suspend or terminate your access to services immediately without notice if: (a) you violate these Terms; (b) your account is past due; (c) we are required to do so by law; (d) we discontinue services; or (e) your use of services creates security or legal risks.</p>
                  
                  <p><strong>13.4 Effect of Termination:</strong> Upon termination, your right to use services immediately ceases. We may delete your data after termination unless retention is required by law. Provisions regarding intellectual property, payment obligations, disclaimers, limitations of liability, and indemnification survive termination.</p>
                  
                  <p><strong>13.5 Data Export:</strong> Upon request prior to termination, we will provide your data in a standard format, subject to technical limitations and applicable fees.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">14. Dispute Resolution and Arbitration</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>14.1 Informal Resolution:</strong> Before filing a claim, you agree to contact us at support@ephesusai.com to attempt to resolve the dispute informally. We will attempt to resolve disputes in good faith.</p>
                  
                  <p><strong>14.2 Binding Arbitration:</strong> Any dispute, claim, or controversy arising from or relating to these Terms or our services that cannot be resolved informally shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.</p>
                  
                  <p><strong>14.3 Class Action Waiver:</strong> You agree that any arbitration or proceeding shall be conducted on an individual basis and not as a class action, consolidated action, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration.</p>
                  
                  <p><strong>14.4 Exceptions:</strong> Either party may seek injunctive relief in court to protect intellectual property rights or confidential information.</p>
                  
                  <p><strong>14.5 Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of the State of [Your State], without regard to conflict of law principles.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">15. Confidentiality</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of the business relationship. Confidential information includes business strategies, technical data, customer lists, pricing information, and any information marked as confidential. This obligation survives termination of these Terms.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">16. Modifications to Terms</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    We reserve the right to modify these Terms at any time. Material changes will be communicated via email or through our services at least 30 days before taking effect. Your continued use of services after changes take effect constitutes acceptance of the modified Terms. If you do not agree to changes, you must discontinue use of services.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">17. General Provisions</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p><strong>17.1 Entire Agreement:</strong> These Terms, together with any referenced policies and agreements, constitute the entire agreement between you and Ephesus AI Solutions regarding our services and supersede all prior agreements.</p>
                  
                  <p><strong>17.2 Severability:</strong> If any provision of these Terms is found invalid or unenforceable, that provision will be enforced to the maximum extent possible, and the remaining provisions will remain in full effect.</p>
                  
                  <p><strong>17.3 Waiver:</strong> Failure to enforce any right or provision of these Terms will not constitute a waiver of that right or provision.</p>
                  
                  <p><strong>17.4 Assignment:</strong> You may not assign these Terms without our prior written consent. We may assign these Terms without restriction.</p>
                  
                  <p><strong>17.5 Force Majeure:</strong> Neither party will be liable for delays or failures in performance resulting from circumstances beyond reasonable control, including natural disasters, war, terrorism, pandemics, or government actions.</p>
                  
                  <p><strong>17.6 Notices:</strong> All notices must be in writing and sent to the addresses specified in your account or to support@ephesusai.com for notices to us.</p>
                  
                  <p><strong>17.7 Relationship:</strong> These Terms do not create any partnership, joint venture, employment, or agency relationship between the parties.</p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">18. Contact Information</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    If you have questions about these Terms of Service, please contact us at:
                  </p>
                  <div className="pl-6">
                    <p>Ephesus AI Solutions</p>
                    <p>Email: support@ephesusai.com</p>
                    <p>Website: www.ephesusai.com</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">19. Compliance with Communication Laws</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    By using our SMS and cold calling services, you acknowledge that you are solely responsible for compliance with all applicable laws including but not limited to the TCPA, TSR (Telemarketing Sales Rule), CAN-SPAM Act, GDPR, CCPA, and state-specific telemarketing and privacy laws. You agree to indemnify us for any violations or claims resulting from your use of communication services.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">20. Acknowledgment</h2>
                <div className="space-y-3 text-muted-foreground leading-relaxed">
                  <p>
                    BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS OF SERVICE. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE OUR SERVICES.
                  </p>
                </div>
              </section>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}