# SEO-Optimized Local Business Website Template — Technical Spec for SaaS

Use this spec to build a SaaS that lets users generate and customize this type of SEO-optimized, configuration-driven website template. The output should be a **single codebase** where one **central config** drives branding, content, and structure so each tenant (e.g. a fencing company, plumber, HVAC) gets a full site from the same template.

---

## 1. Core technical stack

- **Framework:** Next.js (App Router), React 18+, TypeScript.
- **Styling:** Tailwind CSS. Support themeable primary and accent (button) colors via config (hex).
- **Fonts:** One configurable Google Font (e.g. Inter, Poppins, Montserrat); load via next/font.
- **No CMS:** All content comes from a single **configuration module** (e.g. `lib/config.ts`) plus optional env for API keys. The SaaS can either let users edit this config via UI and emit the file, or inject config at build/deploy time.

---

## 2. Configuration-driven architecture

**Single source of truth:** One `BusinessConfig` (and related types) that defines the entire site.

### 2.1 Required config shape (minimum)

- **Identity:** `name`, `tagline`, `description`, `website` (base URL).
- **Contact:** `phone`, `email`, `address` (street, city, state, zipCode, country).
- **Service areas:** `serviceAreas: string[]` (e.g. `["Tacoma, WA", "Seattle, WA"]`) — used for nav, schema, sitemap, and location pages.
- **Industry:** Enum or union (e.g. `"hvac" | "plumbing" | "roofing" | "fencing" | "painting"`). Drives:
  - Schema.org `@type` (e.g. HVACBusiness, Plumber, LocalBusiness).
  - Industry-specific copy, service lists, and keywords.
- **Services:** Defined per industry in an `industryConfig`: at least `services: string[]` (main services) and optionally `allServices` for broader slugs. Examples: "Privacy Fence Installation", "Fence Repair". Used for nav, service pages, and forms.
- **Navigation:** `navigation?: NavigationItem[]` — each item has `label`, optional `href`, optional `children` (dropdown). If omitted, derive from industry + service areas (e.g. Services dropdown, Service Areas dropdown, About, Contact, etc.).

### 2.2 Optional but recommended

- **Branding:** `logo`, `logoLight`, `primaryColor`, `buttonColor`, `heroImage`, `font`.
- **Banner:** Top bar (e.g. "Free Estimates • Licensed & Insured") with `enabled`, `text`, `link`, `linkText`, `color`, `colorDark`.
- **Per-page hero images:** `pageHeroImages: { [route: string]: string }` (e.g. `"/services": "/images/services-hero.jpg"`). Fallback to `heroImage`.
- **Reviews:** `reviews?: { author, rating, text, date, service? }[]` — for schema and a reviews page/carousel.
- **FAQs:** `faqs?: { question, answer }[]` — for FAQ page and FAQPage schema.
- **Gallery:** `gallery?: { id, name, projectType, location?, description, images[], featuredImage, date? }[]` — for gallery index and dynamic project pages.
- **Social / SEO:** `socialMedia` (facebook, instagram, twitter, linkedin, googleBusiness), `facebookReviewsUrl`, `googleReviewFormUrl`.
- **Maps:** `googleMapsApiKey`, `showFooterMap`, `serviceAreaMapImage` (fallback when no API key).
- **Service-area images:** `serviceAreaPageImages: { default, [areaSlug]?, [areaSlug/serviceSlug]? }` for location pages.
- **Service page images:** Per-service slug → image path (e.g. for hero and content on service and location-service pages).

---

## 3. SEO requirements (non-negotiable)

### 3.1 Metadata (every page)

- **Title:** `{Page Title} | {Business Name}` or `{Business Name} | {Tagline}` for home. Never generic "Home" alone.
- **Description:** Unique per page; include business name and relevant keywords. Max ~155–160 chars for SERP.
- **Keywords:** Merge industry keywords + page-specific + service areas; output as meta keywords (and use in content where natural).
- **Canonical:** Every page has `alternates.canonical` = full URL (use `metadataBase` + path).
- **Open Graph:** `og:title`, `og:description`, `og:url`, `og:image` (1200×630 or consistent ratio), `og:type`, `og:locale`.
- **Twitter:** `summary_large_image`; title, description, image.
- **Robots:** Per-page control where needed (e.g. noindex for /privacy, /terms); otherwise index,follow. Support `googleBot` hints (max-snippet, max-image-preview, etc.).

Implement via a **shared `generateMetadata(props, businessConfig)`** that accepts page-level overrides (title, description, keywords, url, image, noindex) and returns Next.js `Metadata`.

### 3.2 Structured data (JSON-LD)

Inject **application/ld+json** scripts from a single structured-data module. Use **absolute URLs** (base = `businessConfig.website`) for all URLs and images in schema.

- **Root layout (global):**
  - **Organization:** name, url, logo (absolute), contactPoint (telephone, email, areaServed), sameAs.
  - **LocalBusiness** (or industry-specific type per schema.org): name, description, url, telephone, email, address (PostalAddress), areaServed (array of City), image (absolute), priceRange, sameAs, optional openingHoursSpecification. If reviews exist: aggregateRating and review array.
- **Per-page:**
  - **BreadcrumbList** on every page (Home → … → current).
  - **WebPage** (or **ContactPage**, **AboutPage**, **FAQPage**, **CollectionPage** where appropriate): name, url, description.
  - **Service** (on service pages): serviceType, provider (LocalBusiness), areaServed.
  - **FAQPage** (on FAQ page): mainEntity = Question/Answer array from config.
  - **ItemList** of **Review** (on reviews page); each Review with author (Person), datePublished, reviewBody, reviewRating, optional itemReviewed (Service or LocalBusiness).
  - **CreativeWork** / **ItemList** for gallery (project pages and gallery index).

Ensure no duplicate or conflicting types on the same page; keep Organization + LocalBusiness at root, page-specific types on each page.

### 3.3 Sitemap and robots

- **Sitemap (e.g. `/sitemap.xml`):** Generate from config. Include: home, /services, /service-areas, /about, /contact, /reviews, /gallery, /faq; all dynamic routes: `/services/[service]`, `/service-areas/[area]`, `/service-areas/[area]/[service]`, `/gallery/[project]`. Optionally /privacy, /terms with lower priority. Set `lastModified`, `changeFrequency`, `priority` (e.g. home 1, main sections 0.8–0.9).
- **Robots.txt:** Allow `/`, disallow `/api/`, reference sitemap URL.

### 3.4 URLs and routing

- **Clean, semantic URLs:** `/services`, `/services/privacy-fence-installation`, `/service-areas/tacoma`, `/service-areas/tacoma/wood-fence-installation`, `/gallery`, `/gallery/project-slug`.
- **Slug generation:** Normalize service/area names to lowercase, spaces → hyphens, strip non-alphanumeric; use same logic for `generateStaticParams` and for lookups so URLs are stable and consistent.

---

## 4. Page inventory and behavior

| Route | Purpose | Key SEO / content |
|-------|--------|--------------------|
| `/` | Home | Hero (config heroImage), services list, service areas, CTA, optional FAQ accordion, reviews carousel. |
| `/services` | Service index | List all services from config; internal links to each service page. |
| `/services/[service]` | Single service | Title/description from service name + config; breadcrumb; one primary image (config or slug-based path); related services; contact form. |
| `/service-areas` | Location index | List/map of service areas; optional map (Google or image). |
| `/service-areas/[area]` | Single area | City name + industry; list of services in that area; optional area-specific image. |
| `/service-areas/[area]/[service]` | Area + service | e.g. "Wood Fence Installation in Tacoma"; hero and primary image = service-appropriate image (same as content); breadcrumb. |
| `/about` | About | AboutPage schema; business story, optional team/owner. |
| `/contact` | Contact | ContactPage schema; contact details + quote/contact form. |
| `/faq` | FAQ | FAQPage schema; accordion from config faqs. |
| `/reviews` | Reviews | ItemList of Review schema; display reviews; optional external links (Google, Facebook). |
| `/gallery` | Gallery index | CollectionPage schema; grid of projects. |
| `/gallery/[project]` | Project detail | CreativeWork schema; project name, type, description, images. |
| `/privacy`, `/terms` | Legal | WebPage; optional noindex. |

All pages: consistent header (logo, nav, CTA), footer (contact, service areas, social, optional map), and breadcrumbs where depth > 1.

---

## 5. Contact / quote form

- **Single form component** used on home, contact, FAQ, and optionally service pages. Fields: firstName, lastName, email, phone, service (dropdown from config services + "Other"), message, marketingConsent, textConsent.
- **Submit:** POST to configurable API route (e.g. `/api/contact`). Back end can send email (e.g. Resend) and/or forward to CRM (e.g. Jobber). Do not expose API keys in client; use server routes only.
- **UX:** Client-side validation; success/error state; clear labels and accessibility (aria, sr-only where appropriate).

---

## 6. Images and performance

- Use **next/image** for all images (sizing, lazy load, modern formats).
- **Paths:** Config holds paths like `/images/hero.jpg` or `/images/service-images/privacy-fence-installation.jpg`. Resolve to absolute URLs for schema; for display, use path as-is with Next.js Image.
- **Hero images:** One global `heroImage`; override per route via `pageHeroImages`. For `/service-areas/[area]/[service]`, hero can match the primary content image (service-specific) for consistency.
- **Service images:** Map service slug → image path (with fallback e.g. `/images/service-images/{slug}.jpg`). Use for service pages and location-service pages (hero + content).

---

## 7. Accessibility and UX

- **Semantic HTML:** header, main, footer, nav, section, headings (h1 → h2 → h3) in order.
- **Skip link:** "Skip to main content" at top of body.
- **Focus:** Visible focus states; trap focus in mobile menu when open; close on Escape.
- **Mobile:** Responsive layout; hamburger menu with accessible toggle and expanded state.
- **Forms:** Labels, error messages, and success feedback; avoid placeholder-only labels.

---

## 8. What the SaaS must produce or support

1. **Config schema:** Typed `BusinessConfig` (and industry config) that matches the above. The SaaS can expose a UI that writes this config (or a subset) and outputs the config file.
2. **Static generation:** Use `generateStaticParams` for all dynamic routes (services, areas, area+service, gallery) so the site can be fully static and fast.
3. **Env:** Document env vars (e.g. `RESEND_API_KEY`, `JOBBER_ACCESS_TOKEN`, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`) in `.env.example`; never commit real keys.
4. **One template, many tenants:** Same codebase; only config (and env) change per deployment. The SaaS can clone the template repo and replace config + env per user, or build the site in a pipeline that injects config at build time.

---

## 9. Summary checklist for the generator

- [ ] Next.js App Router + TypeScript + Tailwind.
- [ ] Single `BusinessConfig` + industry config driving all content and nav.
- [ ] Per-page metadata (title, description, canonical, OG, Twitter) via shared helper.
- [ ] JSON-LD: Organization, LocalBusiness, BreadcrumbList, WebPage/ContactPage/AboutPage/FAQPage, Service, Review/ItemList, FAQ, gallery types; all URLs absolute.
- [ ] Dynamic routes: services, service-areas, service-areas/[area], service-areas/[area]/[service], gallery/[project]; slug generation consistent and used in sitemap.
- [ ] Sitemap.xml and robots.txt generated from config.
- [ ] Contact/quote form with configurable server-side handler (email and/or CRM).
- [ ] Responsive, accessible layout (skip link, focus, semantic HTML).
- [ ] Images via next/image; service and hero images configurable and used for both display and schema where relevant.

This spec captures the core technical tenets of the SEO-optimized local-business template so a SaaS can generate or customize it consistently.
