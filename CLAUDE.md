# Job Nexus HR website — working notes for Claude

**Before touching code, read [`spec.md`](spec.md).** It maps every route, component, design token,
server action and asset, plus a dated change log and open issues — so you rarely need to open
every source file.

## After every change (required)
1. Add a numbered row to the newest section of `spec.md §7 Change Log` (what + files), and update any
   other `spec.md` section that is now out of date (routes, components, assets, known issues).
2. Update `PRICING.md`: add a row to the §5 price log, add/adjust the item in §2/§3/§4, and recompute
   the totals in §1. Prices there are estimates unless the Actual column is filled.
3. Run `npx tsc --noEmit` and `npx eslint .` (both must be clean), and `npx next build` for anything
   structural.

## Style rules to preserve
- Keep the existing look: tokens in `globals.css`, `mx-auto px-6 lg:px-10` + `maxWidth:1480px`
  sections, mono uppercase labels, `.editorial` headlines, the button patterns listed in `spec.md §3`.
- Mobile-first: test at 375px; no horizontal scroll; hover-only reveals must also work on tap.
- Never import `src/db` at module scope in a way that needs `DATABASE_URL` during build (the pool is lazy).
- Use `next/link` for internal links and escape apostrophes in JSX text (`&apos;`).

## Dev-server gotcha
`next build` and `next dev` share the `.next` folder. Running a build while `pnpm dev` is running can leave
the dev server serving STALE CSS/JS (symptom: a change in the source has no effect in the browser, e.g. old
`animation: none` rules). Fix: stop the dev server, delete `.next`, start it again. Verify a suspected stale
server with `curl http://localhost:3000/_next/static/chunks/<globals css>` and compare with the source.
Prefer testing a production build on a different port (`next start -p 3100`) and restarting `pnpm dev` after.
