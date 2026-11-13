import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT, LEGAL, LEGAL_NAME } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy — Job Nexus HR",
  description:
    "How Job Nexus HR collects, uses, shares and protects personal data, how long we keep it, your rights under India's DPDP Act, and how to reach our Grievance Officer.",
  alternates: { canonical: "/privacy" },
};

const a = "text-dark-green underline underline-offset-4";
const G = LEGAL.grievanceOfficer;

export default function PrivacyPage() {
  return (
    <LegalPage
      current="/privacy"
      index="/ Privacy"
      label="Privacy"
      title={
        <>
          Privacy
          <br />
          <span className="text-green">policy.</span>
        </>
      }
      intro={
        <p>
          This policy explains what personal data {LEGAL_NAME} (&ldquo;we&rdquo;) collects through this website and
          our recruitment and staffing work, why we collect it, who we share it with, how long we keep it and the
          rights you have. We follow India&apos;s Digital Personal Data Protection Act, 2023 (DPDP Act) and the
          Information Technology Act, 2000 with its rules. We are the &ldquo;Data Fiduciary&rdquo; for this data.
        </p>
      }
      sections={[
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <ul>
              <li>
                {LEGAL_NAME}, recruitment and staffing services, {LEGAL.registeredAddress || CONTACT.city}.
                {LEGAL.cin && <> CIN: {LEGAL.cin}.</>}
              </li>
              <li>
                Email <a href={`mailto:${CONTACT.email}`} className={a}>{CONTACT.email}</a> · Phone{" "}
                <a href={`tel:${CONTACT.tel}`} className={a}>{CONTACT.phone}</a>
              </li>
            </ul>
          ),
        },
        {
          id: "what-we-collect",
          title: "What we collect",
          body: (
            <ul>
              <li>
                <strong>Job seekers</strong> (registration and job application forms, WhatsApp, calls): name, phone,
                email, city, the kind of job you want, experience, CV or CV link, and anything you choose to tell us.
              </li>
              <li>
                <strong>Employers</strong> (contact form, calls, email): your name, company, work email, phone and the
                details of your hiring requirement.
              </li>
              <li>
                <strong>Placed workers</strong> (only during an engagement, collected with your consent): identity and
                address proof, bank details for salary, PF/ESI numbers and background-verification results.
              </li>
              <li>
                <strong>Website use</strong> — only if you click &ldquo;Accept&rdquo; in the cookie banner: Google
                Analytics data such as pages viewed, device type, approximate location and clicks on our phone,
                email or WhatsApp links. See the <Link href="/cookies" className={a}>Cookie Policy</Link>.
              </li>
            </ul>
          ),
        },
        {
          id: "why",
          title: "Why we use it",
          body: (
            <ul>
              <li>To contact you about jobs that match you, and to share your profile with an employer for a role you agree to.</li>
              <li>To reply to employer enquiries, prepare proposals and deliver the services you ask for.</li>
              <li>For placed workers: to run payroll, statutory compliance (PF, ESI, PT, LWF) and agreed background checks.</li>
              <li>To understand and improve the website (analytics, only with consent).</li>
              <li>To meet legal duties, prevent fraud and protect our rights.</li>
            </ul>
          ),
        },
        {
          id: "consent",
          title: "Your consent",
          body: (
            <p>
              We process your data on the basis of the consent you give when you tick the box on our forms, accept
              analytics cookies, or contact us — and, where the law allows, for legitimate uses such as meeting a
              legal obligation. You can withdraw consent at any time by emailing{" "}
              <a href={`mailto:${G.email}`} className={a}>{G.email}</a> or using &ldquo;Cookie settings&rdquo; in the
              footer. Withdrawing doesn&apos;t affect anything done before, but we may no longer be able to put you
              forward for roles.
            </p>
          ),
        },
        {
          id: "sharing",
          title: "Who we share it with",
          body: (
            <ul>
              <li><strong>Employers (our clients)</strong> — your profile, only for roles you have agreed to be considered for.</li>
              <li>
                <strong>Service providers</strong> who process data for us under contract: website hosting (Vercel),
                form delivery by email (EmailJS), email and domain services (Cloudflare), analytics (Google, only with
                consent), and background-verification partners for agreed checks.
              </li>
              <li><strong>Government bodies</strong> where the law requires it (e.g. EPFO, ESIC, tax authorities, courts).</li>
              <li>We never sell personal data, and we don&apos;t use it for advertising.</li>
            </ul>
          ),
        },
        {
          id: "transfers",
          title: "Data outside India",
          body: (
            <p>
              Some of these providers store or process data on servers outside India (for example in the United
              States). Such transfers are allowed under the DPDP Act except to countries the Government restricts,
              and our providers apply their own security safeguards.
            </p>
          ),
        },
        {
          id: "retention",
          title: "How long we keep it",
          body: (
            <ul>
              <li>
                Job-seeker details: up to {LEGAL.candidateRetentionMonths} months after our last contact with you, so we
                can offer new roles — or sooner if you ask us to delete them.
              </li>
              <li>Employer enquiries: as long as needed to respond and manage the business relationship.</li>
              <li>Records of placed workers: for the periods required by labour, tax and social-security laws.</li>
              <li>Analytics data: no longer than 14 months (Google Analytics retention setting).</li>
            </ul>
          ),
        },
        {
          id: "security",
          title: "How we protect it",
          body: (
            <p>
              We limit access to people who need it, use encrypted connections (HTTPS) and reputable providers, and
              ask clients and partners to protect the data we share. If a personal-data breach happens, we will inform
              the Data Protection Board of India and the people affected as the law requires.
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <ul>
              <li>Ask what personal data we hold about you and who we&apos;ve shared it with.</li>
              <li>Ask us to correct, complete, update or delete it.</li>
              <li>Withdraw your consent at any time.</li>
              <li>Nominate someone to exercise these rights if you die or become unable to.</li>
              <li>Raise a grievance with us, and if you&apos;re not satisfied, complain to the Data Protection Board of India.</li>
              <li>You can ask for this policy in Hindi or Kannada and we will provide it.</li>
            </ul>
          ),
        },
        {
          id: "grievance",
          title: "Grievance Officer",
          body: (
            <>
              <p>For any privacy question, request or complaint, contact our Grievance Officer:</p>
              <ul>
                {G.name && <li>{G.name}, Grievance Officer, {LEGAL_NAME}</li>}
                <li>Email: <a href={`mailto:${G.email}`} className={a}>{G.email}</a></li>
                <li>Phone: <a href={`tel:${G.phone.replace(/\s/g, "")}`} className={a}>{G.phone}</a></li>
              </ul>
              <p>We acknowledge requests within 72 hours and resolve them within {LEGAL.grievanceDays} days.</p>
            </>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: (
            <p>
              Our services are for people aged 18 and over. We don&apos;t knowingly collect data from anyone under 18;
              if you believe we have, contact us and we&apos;ll delete it.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: (
            <p>
              We&apos;ll update the date at the top of this page when the policy changes, and ask for fresh consent
              if we start using your data for a new purpose.
            </p>
          ),
        },
      ]}
      note={<>This policy is written to be read. If anything is unclear, email us and a person will explain.</>}
    />
  );
}
