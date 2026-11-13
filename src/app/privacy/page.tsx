import { LegalPage } from "@/components/LegalPage";
import { CONTACT } from "@/lib/site";

export const metadata = { title: "Privacy Policy — Job Nexus HR", alternates: { canonical: "/privacy" } };

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
          Job Nexus HR is the data controller for personal information
          collected through this website and through our recruitment
          engagements. This page summarises what we collect, how we use it
          and how you can reach us about it.
        </p>
      }
      sections={[
        {
          id: "what-we-collect",
          title: "What we collect",
          body: (
            <ul>
              <li>Contact information from brief forms and applications.</li>
              <li>Resume and employment-related information you submit.</li>
              <li>Engagement-level information shared by client organizations.</li>
              <li>Standard website analytics for understanding site use.</li>
            </ul>
          ),
        },
        {
          id: "how-we-use-it",
          title: "How we use it",
          body: (
            <ul>
              <li>To match candidates with relevant engagements.</li>
              <li>To operate, administer and support workforce engagements.</li>
              <li>To communicate with you about roles, services and operations.</li>
              <li>To comply with statutory obligations.</li>
            </ul>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <p>
              You can request access to, correction of or deletion of personal
              information we hold about you. Reach us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-dark-green underline underline-offset-4">
                {CONTACT.email}
              </a>
              .
            </p>
          ),
        },
      ]}
      note={
        <>
          This is a summary suitable for an informational website. It is
          not legal advice. For a full policy tailored to your jurisdiction
          and scope of engagement, contact our team.
        </>
      }
    />
  );
}
