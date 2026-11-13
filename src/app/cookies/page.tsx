import { LegalPage } from "@/components/LegalPage";

export const metadata = { title: "Cookies — Job Nexus HR", alternates: { canonical: "/cookies" } };

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
              <li>
                Google Analytics 4 cookies to understand how visitors use the
                site (pages viewed, contact clicks, form submissions).
              </li>
              <li>No advertising or remarketing cookies are set.</li>
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
