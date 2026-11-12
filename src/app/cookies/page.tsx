import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Cookies — Job Nexus HR" };

export default function CookiesPage() {
  return (
    <LegalPage
      current="/cookies"
      index="/ Cookies"
      label="Cookies"
      title={
        <>
          Cookies
          <br />
          <span className="text-green">on this site.</span>
        </>
      }
      intro={
        <p>
          This website uses a small number of essential and analytics
          cookies to operate and improve the experience.
        </p>
      }
      sections={[
        {
          id: "what-we-use",
          title: "What we use",
          body: (
            <ul>
              <li>Essential cookies to operate the site.</li>
              <li>Analytics cookies to understand traffic patterns.</li>
              <li>No advertising or third-party tracking is set up.</li>
            </ul>
          ),
        },
        {
          id: "your-control",
          title: "Your control",
          body: (
            <p>
              You can disable cookies through your browser settings.
              Disabling certain cookies may affect site functionality.
            </p>
          ),
        },
      ]}
    />
  );
}
