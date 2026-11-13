import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CONTACT, LEGAL_NAME } from "@/lib/site";

export const metadata = {
  title: "Terms of Use — Job Nexus HR",
  description:
    "Terms for using the Job Nexus HR website: no fees for job seekers, no guarantee of employment, acceptable use, intellectual property, liability and Indian governing law.",
  alternates: { canonical: "/terms" },
};

const a = "text-dark-green underline underline-offset-4";

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
          This website is run by {LEGAL_NAME} to describe our recruitment, staffing, payroll and compliance services
          and to let employers and job seekers contact us. By using it you agree to these terms. If you don&apos;t
          agree, please don&apos;t use the site.
        </p>
      }
      sections={[
        {
          id: "job-seekers",
          title: "For job seekers",
          body: (
            <ul>
              <li>
                <strong>We never charge candidates any fee</strong> — not for registration, interviews, training,
                documents or a job offer. If anyone asks you for money in our name, don&apos;t pay; report it to{" "}
                <a href={`tel:${CONTACT.tel}`} className={a}>{CONTACT.phone}</a> or{" "}
                <a href={`mailto:${CONTACT.email}`} className={a}>{CONTACT.email}</a>.
              </li>
              <li>
                Registering or applying doesn&apos;t guarantee an interview or a job. Hiring decisions are made by our
                clients.
              </li>
              <li>Please give true and complete information. We may stop working with anyone who submits false details.</li>
              <li>You must be 18 or older to register or apply.</li>
            </ul>
          ),
        },
        {
          id: "employers",
          title: "For employers",
          body: (
            <p>
              Information on this site, including service descriptions, is general and is not an offer or a binding
              commitment. Services are provided only under a separate written agreement, whose terms (scope, fees,
              timelines, compliance responsibilities) apply instead of anything on this website.
            </p>
          ),
        },
        {
          id: "equal-opportunity",
          title: "Equal opportunity",
          body: (
            <p>
              We consider every candidate on merit and don&apos;t discriminate on the basis of caste, religion, gender,
              gender identity, disability, age, marital status, region or any other characteristic protected by law,
              and we expect our clients to do the same.
            </p>
          ),
        },
        {
          id: "use",
          title: "Acceptable use",
          body: (
            <ul>
              <li>Don&apos;t misuse the site: no hacking, scraping in bulk, spam, malware or attempts to break security.</li>
              <li>Don&apos;t submit someone else&apos;s details without their permission.</li>
              <li>Don&apos;t use the site for anything unlawful or misleading, including posing as {LEGAL_NAME}.</li>
            </ul>
          ),
        },
        {
          id: "ip",
          title: "Content and trademarks",
          body: (
            <p>
              The text, design, images and the Job Nexus HR name and logo belong to {LEGAL_NAME}. Client names and
              logos belong to their owners and are shown with permission. You may share links to our pages, but
              don&apos;t copy or reuse our content commercially without written permission.
            </p>
          ),
        },
        {
          id: "links",
          title: "Other websites",
          body: (
            <p>
              Links to other sites (for example WhatsApp, LinkedIn or Google) are for convenience. We don&apos;t
              control those sites and aren&apos;t responsible for their content or privacy practices.
            </p>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <p>
              We work to keep the site accurate and available, but it is provided &ldquo;as is&rdquo;. To the extent
              the law allows, {LEGAL_NAME} is not liable for indirect or consequential loss arising from use of the
              website. Nothing here limits liability that cannot be limited by law.
            </p>
          ),
        },
        {
          id: "privacy",
          title: "Privacy",
          body: (
            <p>
              How we handle personal data is explained in our <Link href="/privacy" className={a}>Privacy Policy</Link>{" "}
              and <Link href="/cookies" className={a}>Cookie Policy</Link>.
            </p>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have exclusive jurisdiction
              over any dispute about this website.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes and contact",
          body: (
            <p>
              We may update these terms; the date at the top shows the latest version. Questions:{" "}
              <a href={`mailto:${CONTACT.email}`} className={a}>{CONTACT.email}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
