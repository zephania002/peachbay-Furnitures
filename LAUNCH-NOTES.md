# PeachBay Furniture — Launch Notes

## 1. Files in this folder
- `index.html`, `style.css`, `script.js` — the site.
- `_headers` — security headers that Cloudflare Pages applies automatically (see below).

## 2. Photos
Your uploaded files didn't include an `Assets` image folder, so this version pulls real interior/furniture
photography from Unsplash (free-to-use stock images) so the site looks finished today. To swap in your own
product photography:
1. Put your images in a folder named `Assets/` next to `index.html`.
2. In `index.html`, replace each `src="https://images.unsplash.com/..."` with `src="./Assets/your-photo.jpg"`.
Do this for the hero, the six Signature Edit (bento) pieces, the eight Shop the Depot cards, and the
Spacious Living banner.

## 3. Putting this on Cloudflare (step-by-step)
The strongest, simplest way to host this with Cloudflare's security in front of it is **Cloudflare Pages**:
1. Create a free Cloudflare account at cloudflare.com.
2. Go to **Workers & Pages → Create → Pages → Upload assets**, and upload this whole folder
   (or connect it to a GitHub repo for auto-deploys).
3. Cloudflare automatically issues a free SSL certificate, puts the site behind its global CDN/DDoS protection,
   and — because the `_headers` file is included — applies the security headers above (HSTS, no iframes,
   a locked-down Content-Security-Policy, etc.) without any extra setup.
4. Once deployed, go to **Custom domains** in your Pages project and add `peachbayfurniture.com` (or whichever
   domain you own) — Cloudflare will guide you through pointing its DNS at the new site.
5. Optional hardening once you're live: turn on **Bot Fight Mode** and **"Always Use HTTPS"** under the
   domain's SSL/TLS and Security tabs, and set the WAF security level to "Medium" or higher.

I can't create or configure your actual Cloudflare account from here, but every file needed for a secure,
ready-to-deploy upload is in this folder.

## 4. WhatsApp chat
The floating WhatsApp bubble, the sidebar button, and the footer button all open a chat to
**+254 748 333 486** with a pre-filled message. There's no bot logic involved — messages go straight to
that WhatsApp number, which is the most reliable "chatbot" for a small depot since you reply personally.
If you'd later like automated replies (FAQs, order status, hours), that requires the official
WhatsApp Business Platform API, which is a separate paid integration — let me know if you want help
scoping that.
