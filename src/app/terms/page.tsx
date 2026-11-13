import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Terms — Job Nexus HR", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <LegalPage
      current="/terms"
      index="/ Terms"
      label="Terms of Use"
      title={
        <>
          Terms
          <br />
          <span className="text-green">of use.</span>
        </>
      }
      intro={
        <p>
          By using this website you agree to the following terms. This is a
          general informational website operated by Job Nexus HR for the
          purpose of describing our recruitment and staffing services.
        </p>
      }
      sections={[
        {
          id: "content",
          title: "Content",
          body: (
            <p>
              Content on this website is provided for general information
              about Job Nexus HR&apos;s services. It is not a contract or binding
              commitment for service delivery, which requires a separate
              written engagement.
            </p>
          ),
        },
        {
          id: "use",
          title: "Use",
          body: (
            <p>
              You agree not to misuse this website, attempt to access it in
              unauthorized ways, or use any content for unlawful purposes.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <p>
              Job Nexus HR is not liable for indirect or consequential losses
              arising from use of this website. Service engagements are
              governed by their own contractual terms.
            </p>
          ),
        },
      ]}
      note={
        <>
          For full terms covering specific jurisdictions and engagement
          scopes, contact our team.
        </>
      }
    />
  );
}
