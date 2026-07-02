# Wayne Kerr Official Refurbished Store

Independent storefront for Wayne Kerr refurbished and factory-recalibrated equipment.

## Included

- Inventory landing page
- Product detail pages
- Contact form with used-equipment prefill
- Locale switching

## Local development

```bash
npm install
npm run dev
```

## Contact form email setup

Add these environment variables locally in `.env.local` and in Vercel Project Settings:

```bash
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL="Wayne Kerr Refurbished Store <onboarding@resend.dev>"
CONTACT_NOTIFICATION_EMAIL=kevchen1129@gmail.com
```

Notes:

- `CONTACT_NOTIFICATION_EMAIL` is where enquiry notifications will be sent.
- `RESEND_FROM_EMAIL` can use `onboarding@resend.dev` for initial testing.
- For production, verify your own domain in Resend and then change `RESEND_FROM_EMAIL` to your branded sender address.

## Suggested GitHub repo name

`wayne-kerr-official-refurbished-store`
