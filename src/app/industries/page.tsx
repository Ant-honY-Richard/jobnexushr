import { PageHero } from "@/components/PageHero";
import { SignatureLine } from "@/components/SignatureLine";
import { CTASection } from "@/components/CTASection";

export const metadata = {
  title: "Industries — Job Nexus HR",
  description: "Workforce capability across IT, BFSI, healthcare, pharma, manufacturing, retail, e-commerce, logistics, hospitality, telecom, construction and more.",
};

const INDUSTRIES = [
  { name: "IT & Technology", roles: ["Developers", "QA", "Support", "Analysts", "Infrastructure", "Operations"] },
  { name: "BFSI", roles: ["Branch Operations", "Sales", "Compliance", "Customer Service", "Back Office", "Analysts"] },
  { name: "Healthcare", roles: ["Clinical Support", "Administration", "Operations", "Healthcare Staff", "Front Office", "Technicians"] },
  { name: "Pharma", roles: ["Production", "Quality", "Sales", "Regulatory Support", "Distribution", "Research"] },
  { name: "Manufacturing", roles: ["Production Staff", "Quality", "Engineering", "Maintenance", "Operations", "Supervisors"] },
  { name: "Engineering", roles: ["Site Engineers", "Project Support", "Design", "Supervisors", "QC", "Operations"] },
  { name: "Automotive", roles: ["Production", "Assembly", "Quality", "Service", "Sales", "Supervisors"] },
  { name: "Retail", roles: ["Store Operations", "Sales", "Customer Support", "Supervisors", "Warehouse", "Visual Merchandising"] },
  { name: "E-commerce", roles: ["Fulfilment", "Last-Mile", "Sorting", "Returns", "Customer Support", "Operations"] },
  { name: "Logistics & Supply Chain", roles: ["Drivers", "Sorting", "Warehouse", "Inventory", "Dispatch", "Operations"] },
  { name: "Warehousing", roles: ["Pickers", "Packers", "Loaders", "Inventory", "Supervisors", "Operations"] },
  { name: "FMCG", roles: ["Sales", "Distribution", "Production", "Merchandising", "Supervisors", "Operations"] },
  { name: "Hospitality", roles: ["Service Staff", "Front Office", "Housekeeping", "Kitchen", "Supervisors", "Management"] },
  { name: "Travel", roles: ["Operations", "Sales", "Customer Service", "Ground Staff", "Ticketing", "Supervisors"] },
  { name: "Telecommunications", roles: ["Field Operations", "Sales", "Network", "Customer Service", "Installation", "Support"] },
  { name: "Education", roles: ["Administration", "Operations", "Teaching Support", "Coordination", "Front Office", "Management"] },
  { name: "Real Estate", roles: ["Sales", "Site Operations", "Customer Service", "Supervisors", "Back Office", "Management"] },
  { name: "Construction", roles: ["Skilled Labour", "Supervisors", "Site Engineers", "Safety", "Project Support", "Operators"] },
  { name: "Media & Entertainment", roles: ["Production Support", "Operations", "Crew", "Sales", "Post-Production", "Events"] },
  { name: "Customer Support", roles: ["Voice", "Non-Voice", "Chat", "Email", "Team Leads", "Quality"] },
  { name: "BPO / KPO", roles: ["Customer Support", "Voice", "Back Office", "Operations", "Quality", "Team Leads"] },
  { name: "Professional Services", roles: ["Administrative", "Operations", "Sales", "Coordination", "Reception", "Management"] },
  { name: "Energy", roles: ["Field Operations", "Engineering", "Maintenance", "Technicians", "Supervisors", "Safety"] },
  { name: "Infrastructure", roles: ["Project Support", "Supervisors", "Site Operations", "Safety", "Maintenance", "Skilled"] },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        index="/ Industries"
        label="Industries"
        title={
          <>
            One workforce partner.
            <br />
            <span className="text-green">Every industry.</span>
          </>
        }
        description="We hire across the sectors below — from specialist roles to full shifts. Ask us about our experience in yours."
        visual={{ asset: "page-industries", icon: "manufacturing", label: "Industries" }}
      />

      <section className="bg-off-white py-14 lg:py-24 border-t border-rule">
        <div className="mx-auto px-6 lg:px-10" style={{ maxWidth: "1480px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule">
            {INDUSTRIES.map((ind) => (
              <article
                key={ind.name}
                className="group bg-off-white p-6 lg:p-8 hover:bg-ink/[0.02] transition-colors duration-500"
                data-cursor="label"
                data-cursor-label="Open"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-green mb-4">
                  Roles we fill
                </p>
                <h3 className="editorial text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.05] tracking-[-0.025em] text-ink group-hover:text-green transition-colors duration-500">
                  {ind.name}
                </h3>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
                  {ind.roles.map((r) => (
                    <li
                      key={r}
                      className="text-[12px] text-muted flex items-center gap-2"
                    >
                      <span className="block w-1 h-1 bg-ink/30 rounded-full" />
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                A note on experience
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[15px] leading-relaxed text-ink/80 max-w-2xl">
                Being able to work in a sector isn&apos;t the same as a track
                record there. We&apos;re happy to talk through our experience in
                your industry before you commit.
              </p>
              <SignatureLine className="mt-10" />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Don't see your industry listed?"
        subtitle="Talk to us. If the roles are real, we'll tell you honestly whether we can help."
        primaryLabel="Tell us what you need"
      />
    </>
  );
}
