import Link from "next/link";
import { LEGAL, LEGAL_NAME } from "@/lib/site";

/** Value recorded with each submission as proof of consent (DPDP Act s.6(10)). */
export const consentRecord = () => `Yes — ${new Date().toISOString()} — privacy policy ${LEGAL.policyVersion}`;

/**
 * Required, unticked consent box shown above every submit button that collects personal data.
 * `purpose` finishes the sentence "…to use these details to …".
 */
export function ConsentCheckbox({ id, purpose, className = "" }: { id: string; purpose: string; className?: string }) {
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-ink/75 ${className}`}>
      <input
        id={id}
        name="consent"
        type="checkbox"
        value="yes"
        required
        className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-rule accent-[#0E956A]"
      />
      <span>
        I agree to {LEGAL_NAME} using these details to {purpose}, as described in the{" "}
        <Link href="/privacy" className="font-medium text-dark-green underline underline-offset-2">
          Privacy Policy
        </Link>
        . I can withdraw this any time by emailing {LEGAL.grievanceOfficer.email}.
      </span>
    </label>
  );
}
