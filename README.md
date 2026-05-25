# Ionous - https://ionous-seven.vercel.app/

Marketing site for Ionous — infrastructure and software consultancy for enterprise space companies and warfighting organizations.

## Stack
- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind v4**
- **react-three-fiber** + **drei** + **postprocessing** (3D scenes)
- **GSAP** + **ScrollTrigger** (UI + scroll-driven animation)
- **Vercel** (hosting, Functions, env vars)
- **Zapier** (briefing form → CRM / Slack)

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

## Deploy (Vercel)
Pushes to `main` auto-deploy production at (https://ionous-seven.vercel.app/)(and ionous.com once DNS resolves). Pushes to any other branch (`stg`, feature branches) create unique preview URLs.

Manual deploy from CLI is still available:
```bash
npx vercel --prod --scope shafeeq-1509-team --yes
```

### Environment variables
Set via `npx vercel env add <NAME> production` or the Vercel dashboard.

| Name | Used by | Required |
|---|---|---|
| `ZAPIER_WEBHOOK_URL` | `src/app/api/contact/route.ts` | Yes — without it, the briefing form returns 500 |

## Briefing form (Zapier)
The contact form POSTs JSON to `/api/contact`, which validates and forwards to the Zapier `Catch Hook` URL stored in `ZAPIER_WEBHOOK_URL`. The Zap fans out to Slack / a shared inbox / CRM. Honeypot field + server-side validation are in place; no rate limiting yet (see TODO).

## 3D models
The capability cards render `.glb` files from `public/models/` when present, and fall back to procedural geometry when missing. Current state:

| Slug | File | Status |
|---|---|---|
| `mission-systems` | `mission-systems.glb` | ✅ shipped (NASA Saturn V, 236 KB) |
| `space-infrastructure` | `space-infrastructure.glb` | ⏳ procedural fallback (icosahedron) |
| `enterprise-integration` | `enterprise-integration.glb` | ⏳ procedural fallback (torus) |
| `software-engineering` | — | intentionally procedural (orbital network mesh) |

`useGLTF` is wired with both **Draco** and **Meshopt** decoders; new exports can use either compression. Each loaded scene is auto-normalized (centered + scaled to ~2 unit longest axis) so Blender exports don't need pre-scaling.

See `public/models/README.md` for export and sourcing notes.

## Brand
Monochrome system — near-black `#0b0f1a`, paper `#ffffff`, no chromatic accent. The 3D scene supplies all "color" via emissive lighting.

## TODOs
- Rate-limit `/api/contact` (Upstash) before public launch
- Ship `space-infrastructure.glb` (TDRS-D) and `enterprise-integration.glb` (DSN 70m antenna)
- Get counsel review on `/privacy` and `/terms` draft copy
- Add Crew section (`#crew` is referenced in Nav but not yet built)
