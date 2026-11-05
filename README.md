# Shixiao Wang — personal research website

English-first, responsive static website for academic and industry collaboration. No build step, external fonts, tracking or runtime dependencies.

## Preview

Open `dist/index.html` directly, or run `python -m http.server 4173 --directory dist` and visit http://localhost:4173.

## GitHub Pages

Create the public repository `Forainest789.github.io` under `Forainest789`, upload the contents of this project (including `.github/workflows/pages.yml`), and select **Settings → Pages → Source → GitHub Actions**. Push to `main` or manually run the workflow. The intended address after a successful deployment is `https://forainest789.github.io/`. This address is not a claim of completed deployment.

If using a different repository name, relative asset URLs also support a project Pages URL.

## Editing

- `dist/index.html`: identity, research vision, Symbiosis and collaboration copy.
- `dist/app.js`: publications, manuscripts, projects and experience.
- `dist/style.css`: responsive layout and visual styles.
- `dist/premium.css`: Apple-inspired visual layer: silver background, oversized system typography, translucent navigation and the dark Symbiosis scene.
- `dist/neural-field.svg`: original deterministic vector artwork; conceptual, not experimental data.
- `dist/motion.js`: isolated pointer-parallax adapter with reduced-motion and touch handling.

## Future animation integration

The semantic content remains outside the visual scenes. Replace the contents of `[data-motion-slot="neural-field"]` for the hero and `[data-motion-slot="symbiosis"]` for the research scene with a video, canvas or WebGL renderer. Preserve a static poster/fallback and the conceptual-art caption. Keep decorative canvas layers `aria-hidden`, maintain the scene dimensions to avoid layout shifts, and do not place navigation in the animation layer.

The hero uses a dependency-free Canvas renderer in `dist/neural-3d.js`: 80 three-dimensional fibres rotate around the object Y axis over 90 seconds. Each frame reprojects vertices with perspective, sorts fibre segments by depth, and adjusts opacity for depth. This is real geometry rotation, not an image or CSS-plane rotation. Scroll translates the separate wrapper up to 32px and scales it to 1.08; no planar rotation is added. Rendering pauses offscreen, in hidden tabs, and on manual pause. Reduced-motion mode renders a single static pose. Device pixel ratio is capped at 2; the SVG remains as a fallback if Canvas is unavailable.

Visual palette: graphite `#1d1d1f`, silver `#f5f5f7`, white `#ffffff`, interaction blue `#0071e3`, muted text `#62626b`, midnight scene `#080a12`. System sans-serif typography follows the OS. The hero is centred; research and evidence sections stay left aligned. Only the abstract neural sculpture carries expressive colour; publication text retains a quiet reading surface.

## Content provenance / editorial notes

Identity and email: provided directly by the owner. Publications, education, awards and experience: supplied `Shixiao_Wang_Coembodied_CV.pdf`, reviewed 2026-11-05. Repository summaries: public Brainbind, Bidsify, EEGDecoding_Robotarm and MultiObjective-Optimization repositories. Publication statuses follow the supplied CV; venue records were not independently validated. ACM MM author list is incomplete in the CV and is intentionally not invented. Missing paper URLs are omitted.

Symbiosis is described in the CV as ongoing research, not an incorporated company, funded startup or commercially validated product. Website collaboration offerings are invitations to scope work, not claims of existing clients or delivered products. U-test/SlotMem is not attributed as original work; NII experience describes the actual research contribution in the CV.

The complete CV is not bundled into the public site; its contents were curated for the page. No personal phone numbers or private local paths are included in public assets.
