# Ionous

Marketing site for Ionous — infrastructure and software consultancy for enterprise space companies and warfighting organizations.

## Stack
- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind v4**
- **react-three-fiber** + **drei** + **postprocessing** (3D scenes)
- **GSAP** (UI animation)
- **Netlify** (hosting + Forms for contact)

## Develop
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build
```bash
npm run build
npm start
```

## Deploy (Netlify)
1. Connect this repo to a new Netlify site.
2. Netlify reads `netlify.toml` — build command and the Next.js runtime plugin are pre-configured.
3. The contact form uses **Netlify Forms** (`data-netlify="true"`); submissions appear in the Netlify dashboard once deployed.

## 3D models
The capability cards render `.glb` files from `public/models/` when present, and fall back to procedural geometry when missing. Expected files:
- `public/models/space-infrastructure.glb`
- `public/models/mission-systems.glb`
- `public/models/enterprise-integration.glb`
- `software-engineering` intentionally stays procedural (orbital network mesh)

See `public/models/README.md` for export and sourcing notes.

## Brand
Monochrome system — near-black `#0b0f1a`, paper `#ffffff`, no chromatic accent. The 3D scene supplies all "color" via emissive lighting.
