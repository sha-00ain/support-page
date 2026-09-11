# Support Page

A lightweight, static support/donation page for software projects by **Md. Shakil Hossain**.

## Features

- HTML5 + CSS3 + vanilla JavaScript
- No framework, npm, build system, backend, database, or external runtime dependency
- Responsive desktop/mobile layout
- System light/dark theme by default
- Manual theme toggle with localStorage
- Configuration-driven support methods
- Supports future link, QR, copyable identifier, local, and international methods
- Accessible focus states and reduced-motion support
- `/support` route
- Cloudflare Pages + GitHub compatible

## Project structure

```text
support-page/
├── index.html
├── support/
│   └── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── app.js
├── assets/
│   ├── icons/
│   └── qr/
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Configure payment methods

Edit only `js/config.js`.

Example public link:

```js
{
  name: "bKash",
  enabled: true,
  type: "link",
  url: "https://example.com/public-payment-page"
}
```

For a copyable public identifier:

```js
{
  name: "Example Payment ID",
  enabled: true,
  type: "copy",
  identifier: "PUBLIC-ID-HERE"
}
```

For a QR code:

```js
{
  name: "Example QR",
  enabled: true,
  type: "qr",
  image: "/assets/qr/example.png",
  url: "https://example.com/public-payment-page"
}
```

Only put information that is intentionally public. Never put API keys, passwords, private tokens, bank credentials, or other secrets in `config.js`.

If a method is disabled, or its required public data is missing/invalid, it is not rendered.

## Add another method

No HTML change is required. Add another object to the relevant array in `js/config.js`, set `enabled: true`, and provide the required public information.

## Configure public profile links

At the bottom of `js/config.js`:

```js
const publicLinks = {
  github: "https://github.com/YOUR-USERNAME",
  linkedin: "https://www.linkedin.com/in/YOUR-USERNAME",
  portfolio: "https://YOUR-PORTFOLIO-DOMAIN"
};
```

Leave a value as `""` to hide it.

## Domain placeholders

Replace `https://MY-DOMAIN` in:

- `index.html`
- `robots.txt`
- `sitemap.xml`

with the real production domain when available.

## Cloudflare Pages deployment

1. Push this folder to a GitHub repository.
2. In Cloudflare, open **Workers & Pages**.
3. Create a new Pages project and connect the GitHub repository.
4. Select the repository and production branch, normally `main`.
5. For this static project:
   - Build command: leave empty
   - Build output directory: `/` (the repository root)
6. Deploy.
7. Add the custom domain in the Pages project when ready.

Every push to the connected production branch can then trigger a new deployment.

## Stable `/support` route

The repository contains `support/index.html`, so `/support` resolves directly without server-side code.

If you later change the site's root structure, keep `support/index.html` in place so existing software releases can continue pointing at:

```text
https://MY-DOMAIN/support
```

## Software integration

Each desktop application only needs a stable public URL:

```text
https://MY-DOMAIN/support
```

Do not put payment account details or credentials inside the applications. All public support information stays on this central website.

## Local testing

Because this is static, it can be tested with any simple static server. If Python is installed:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/support
```

For production, Cloudflare Pages serves the same static files without a backend.
