# ContractorsCalc

ContractorsCalc provides smart and accurate construction calculators designed for contractors, builders, engineers, and homeowners. Easily estimate concrete, cement, bricks, paint, tiles, roofing, flooring, HVAC, labour costs, and more with fast, reliable, and mobile-friendly tools built for modern construction projects.

- Cement calculator
- Concrete calculator
- Bricks calculator
- Paint calculator
- Tile calculator
- Labour cost calculator
- HVAC calculator
- Roofing calculator
- Flooring calculator
- AI bot query assistant with backend integration stub
- SEO-ready metadata, structured data, sitemap, and robots rules
- Full SEO content plan in `seo-plan.md`

## Files

- `index.html` — main website page
- `style.css` — responsive styling
- `app.js` — calculator logic and chat assistant
- `sitemap.xml` — sitemap for search engines
- `robots.txt` — crawler settings
- `server.js` — AI backend endpoint stub
- `vite.config.js` — Vite development config and API proxy
- `package.json` — project dependencies and scripts
- `seo-plan.md` — SEO content and keyword plan
- `.env.example` — environment variable example for OpenAI API key

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the AI backend:
   ```bash
   npm run server
   ```
3. Start the Vite development server in another terminal:
   ```bash
   npm run dev
   ```
4. Open the site at the address shown by Vite.

## AI Bot setup

1. Copy `.env.example` to `.env`.
2. Add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```
3. Start `npm run server` and use the chat assistant on the page.

## Deployment

- Use a platform that supports Vite builds and optional backend hosting for `/api/ai`.
- For static-only hosting, the AI assistant will still work with the local fallback messages.
- Ensure `sitemap.xml` and `robots.txt` are served from the root.
- Keep metadata and canonical URL pointing to `https://www.contractorscalc.in/`.

## Vercel Deployment

1. Install the Vercel CLI if needed:
   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel:
   ```bash
   vercel login
   ```
3. Deploy the site:
   ```bash
   vercel --prod
   ```

The project includes `vercel.json` so Vercel will deploy the static site and the `api/ai.js` serverless function.

### Vercel environment variables

- Set `OPENAI_API_KEY` in Vercel project settings so the AI bot can call OpenAI.
