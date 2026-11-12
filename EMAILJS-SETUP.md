# EmailJS setup — form submissions to anthonyrichard@jobnexushr.com

The **Contact form** and the **job application form** email every submission to
`anthonyrichard@jobnexushr.com` through [EmailJS](https://www.emailjs.com). Submissions are also
saved to the database when one is connected. The visitor sees "Message received" if either works.

The code is ready; it needs three keys from your EmailJS account. Until they are added, emails are
not sent.

## 1. Create the EmailJS pieces (about 10 minutes)

1. Sign up / log in at emailjs.com.
2. **Email Services → Add New Service** → connect the mailbox that will *send* the emails
   (e.g. Gmail or Outlook). Copy the **Service ID** (looks like `service_xxxxxxx`).
3. **Email Templates → Create New Template**, then set:
   - **To Email:** `{{to_email}}` (the site sends `anthonyrichard@jobnexushr.com` here — or type the address directly)
   - **From Name:** `Job Nexus HR website`
   - **Reply To:** `{{reply_to}}` (so "Reply" answers the person who filled in the form)
   - **Subject:** `{{subject}}`
   - **Content** (plain text is fine):

     ```
     New {{form_type}} from {{from_name}}

     {{details}}

     Sent from: {{page_url}}
     Time: {{submitted_at}}
     ```

   **Designed version (recommended):** in the Content box switch to the code view (`<>`) and paste
   everything from **`emailjs-template.html`** (project folder) instead — branded header, sender card,
   details box and a "Reply" button.

   Save, and copy the **Template ID** (`template_xxxxxxx`).
4. **Account → General** → copy the **Public Key**.
5. Recommended: **Account → Security** → allow only your website's domain, so nobody else can use
   the keys. (EmailJS keys are designed to be public in the browser; the domain lock is what protects them.)

## 2. Add the keys to the site

Create a file named `.env.local` in the project folder (or add them in your hosting provider's
environment settings, e.g. Vercel → Project → Settings → Environment Variables):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

Then restart `pnpm dev` (or redeploy). Send a test message from `/contact`.

## What each email contains

| Form | Fields in the email |
|---|---|
| Contact (`/contact`) | Inquiry type, Name, Email, Phone, Company, Message |
| Job application (`/jobs/[id]`) | Role (title + id), Name, Email, Phone, Experience, Note |

Each field is also available as its own template variable (e.g. `{{Name}}`, `{{Message}}`) if you
want a designed HTML template instead of `{{details}}`.

## Notes

- To change the recipient, edit `NOTIFY_EMAIL` in `src/lib/emailjs.ts` (or hard-code it in the template).
- EmailJS's free plan has a monthly send limit — check your plan if traffic grows.
- A hidden "honeypot" field drops simple spam bots without bothering real visitors.
