import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

export const metadata = {
  title: "Cookie Policy — Job Nexus HR",
  description:
    "The cookies and browser storage the Job Nexus HR website uses, what each one does, how long it lasts, and how to accept, reject or change your choice.",
  alternates: { canonical: "/cookies" },
};

const a = "text-dark-green underline underline-offset-4";

const ROWS = [
  { name: "jn-cookie-consent", who: "Job Nexus HR (browser storage)", why: "Remembers whether you accepted or rejected analytics", how: "Until you clear it", type: "Essential" },
  { name: "_ga", who: "Google Analytics", why: "Tells visits apart to count unique visitors", how: "2 years", type: "Analytics — only after Accept" },
  { name: "_ga_<id>", who: "Google Analytics", why: "Keeps the state of the current visit", how: "2 years", type: "Analytics — only after Accept" },
];

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
          Cookies are small files a website stores in your browser. We use as few as possible: one essential item to
          remember your choice, and Google Analytics cookies <strong>only if you click &ldquo;Accept&rdquo;</strong>.
          We don&apos;t use advertising, remarketing or social-media tracking cookies.
        </p>
      }
      sections={[
        {
          id: "what-we-use",
          title: "What we use",
          body: (
            <>
              <div className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
                  <thead>
                    <tr className="border-b border-rule text-ink">
                      {["Name", "Set by", "Purpose", "Lasts", "Type"].map((h) => (
                        <th key={h} className="px-1 py-2 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((r) => (
                      <tr key={r.name} className="border-b border-rule align-top text-ink/80">
                        <td className="px-1 py-2 font-mono text-[13px]">{r.name}</td>
                        <td className="px-1 py-2">{r.who}</td>
                        <td className="px-1 py-2">{r.why}</td>
                        <td className="px-1 py-2">{r.how}</td>
                        <td className="px-1 py-2">{r.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Fonts are loaded from Google Fonts, which receives your IP address to deliver them but sets no cookies.
                Form messages are delivered by EmailJS when you press send; it sets no cookies.
              </p>
            </>
          ),
        },
        {
          id: "your-choice",
          title: "Your choice",
          body: (
            <>
              <p>
                When you first visit, a banner asks you to accept or reject analytics cookies — both are one click.
                Nothing analytics-related loads until you accept. You can change your mind at any time:
              </p>
              <p>
                <CookieSettingsButton className="rounded-xl border-2 border-forest px-5 py-2.5 text-[15px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white" />
              </p>
              <p>
                If you reject after accepting, we remove the Google Analytics cookies we can reach and reload the page.
                You can also block or delete cookies in your browser settings.
              </p>
            </>
          ),
        },
        {
          id: "more",
          title: "More information",
          body: (
            <p>
              How we use the information is explained in our <Link href="/privacy" className={a}>Privacy Policy</Link>.
              Google&apos;s use of Analytics data is described in Google&apos;s own privacy policy.
            </p>
          ),
        },
      ]}
    />
  );
}
