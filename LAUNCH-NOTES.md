# PeachBay Furniture — Launch Notes

## Before you push
1. Delete `Assets/RECOVERY/` and purge it from git history (it contains recovery codes in a public repo); rotate those codes.
2. The old stock-photo/product `Assets/*.jpg` and `*.mp4` files are no longer referenced. Optimised copies live in `img/`. Keep the originals elsewhere and remove them from the repo to shrink it (81 MB).

## After deploy
- Submit https://peachbayfurniture.com/sitemap.xml in Google Search Console and Bing Webmaster Tools.
- Test structured data: Rich Results Test + validator.schema.org.
- Put Cloudflare Cache Rules in front of GitHub Pages (see `_headers` for values); GitHub Pages ignores `_headers`.
- Complete the Google Business Profile with the same name, phone, address and hours as the site.

## Content to confirm
- Listed prices (KES 46,500 / 76,500 / 56,500 / 26,500 / 42,000 / 96,500) were carried over from the old site. Confirm them against the correct products.
- Email: site now uses ombokfelistus@gmail.com everywhere (old sidebar showed studio@peachbayfurniture.com).
- "Delivery across Kenya" carried over from the old copy.
