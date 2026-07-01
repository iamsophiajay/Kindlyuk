# Kindly — setup notes

## Files
- `index.html` — page structure & content
- `styles.css` — all styling, mobile-first
- `script.js` — interactivity + form submissions
- `database.sql` — Supabase schema (run once)

## 1. Set up Supabase (real database, view/export leads)
1. Go to supabase.com → New project (free tier is fine).
2. Once it's created, open **SQL Editor → New query**, paste in the contents of `database.sql`, and click **Run**. This creates three tables: `waitlist_signups`, `contact_messages`, `newsletter_subscribers`.
3. Go to **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
4. Open `script.js` and replace the two placeholder values at the top:
   ```js
   const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
5. To view or export signups later: Supabase dashboard → **Table Editor** → pick a table → you can filter, sort, and export to CSV directly from there.

The anon key is safe to expose in the browser — the RLS policies in `database.sql` only allow it to *insert* rows, never read, edit, or delete them.

## 2. Fix kindlyuk.com hosting (Cloudflare + GitHub Pages)
In your Cloudflare DNS records for `kindlyuk.com`:
- Set the four **A records** (root/apex) to GitHub's IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Set the **www CNAME** to `iamsophiajay.github.io`
- Click each record and switch it to **"DNS only" (grey cloud)**, not "Proxied"
- Wait a few minutes, then in GitHub → repo Settings → Pages, confirm the green checkmark and tick **"Enforce HTTPS"**

Once HTTPS is confirmed working, you can switch back to Proxied if you want Cloudflare's CDN — just set SSL/TLS mode to **Full (strict)**, not Flexible.

## 3. Deploy
Replace the three files (`index.html`, `styles.css`, `script.js`) in your `iamsophiajay/kindlyuk` repo, keeping the same `CNAME` file. Commit, and GitHub Pages will redeploy automatically.
