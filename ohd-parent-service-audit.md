# OHD Parent Service Page Link Strength Audit

## Executive Summary

The parent `/services/[slug]` pages receive significantly fewer inlinks (6-15) than their child location+service pages (24-27). The primary issue is that **location service templates contain zero links to parent service pages**, while area service templates contain only a weak "Learn more" link.

---

## 1. Template Locations

### Location Service Templates
- **Enumclaw**: `app/locations/enumclaw/services/[service]/page.tsx`
- **Bonney Lake**: `app/locations/bonney-lake/services/[service]/page.tsx`

### Areas-We-Serve Service Template
- **All areas**: `app/areas-we-serve/[area]/[service]/page.tsx`

---

## 2. Current Links to Parent `/services/[slug]` Pages

### Location Service Templates (`/locations/[city]/services/[slug]`)

| File | Line | Location | Link to Parent? |
|------|------|----------|-----------------|
| `app/locations/enumclaw/services/[service]/page.tsx` | - | - | **NONE** |
| `app/locations/bonney-lake/services/[service]/page.tsx` | - | - | **NONE** |

**Finding**: Neither location service template contains ANY link to the parent `/services/[slug]` page. This is the primary cause of the inverted link hierarchy.

### Areas-We-Serve Service Template (`/areas-we-serve/[area]/[service]`)

| File | Lines | Location | Anchor Text |
|------|-------|----------|-------------|
| `app/areas-we-serve/[area]/[service]/page.tsx` | 359-367 | Main content body | `"Learn more about {serviceName} →"` |

```tsx
{/* Link to Parent Service Page */}
<div className="mb-8">
    <Link
        href={`/services/${params.service}`}
        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
    >
        Learn more about {serviceName} →
    </Link>
</div>
```

**Issues with this link**:
1. Generic "Learn more" anchor text (weak for SEO)
2. Positioned below the CTA card, easy to miss
3. Uses arrow symbol (→) which is less natural

---

## 3. Anchor Text Analysis

### Current Anchor Text Patterns

| Template | Anchor Text | SEO Quality |
|----------|-------------|-------------|
| `/areas-we-serve/[area]/[service]` | `"Learn more about {serviceName} →"` | **Weak** - generic |
| `/locations/[city]/services/[slug]` | N/A | **Missing** |

**Recommendation**: Use descriptive 3-6 word anchors like:
- "Complete guide to {serviceName}"
- "About our {serviceName} services"
- "{serviceName} overview and options"

---

## 4. Recommended Link Placement Opportunities

### For `/locations/[city]/services/[slug]` Templates

**Best Location**: After the service content intro, before the CTA card.

**Suggested placement** (around line 216, after `serviceContent?.process`):

```tsx
{/* After "What to Expect" section, add: */}
<div className="bg-gray-50 p-4 rounded-lg mb-6">
    <p className="text-gray-700">
        <Link
            href={`/services/${params.service}`}
            className="text-primary-600 hover:text-primary-700 font-semibold"
        >
            Learn about {serviceName} options and benefits
        </Link>
        {" "}available at all our locations.
    </p>
</div>
```

**File locations to modify**:
- `app/locations/enumclaw/services/[service]/page.tsx:216`
- `app/locations/bonney-lake/services/[service]/page.tsx:206`

### For `/areas-we-serve/[area]/[service]` Template

**Current link at line 359-367 should be enhanced**:
1. Move higher in content (before CTA card)
2. Change anchor text to be more descriptive
3. Add supporting context

**Suggested replacement**:
```tsx
<p className="text-gray-700 mb-6">
    For detailed information about procedures and what to expect, see our{" "}
    <Link
        href={`/services/${params.service}`}
        className="text-primary-600 hover:text-primary-700 font-semibold"
    >
        complete {serviceName} guide
    </Link>.
</p>
```

---

## 5. Enumclaw Sleep-Medicine and EMFACE-EXION Redirect Sources

These services are configured as Bonney Lake-only in `lib/config.ts:190-195`:

```typescript
export const locationOnlyServices: Record<string, string[]> = {
    "bonney-lake": [
        "sleep-medicine",
        "emface-exion",
    ],
};
```

### Internal Link Sources Generating Redirects

#### Source 1: "Other Services" Section (BUG)

**Files**:
- `app/locations/enumclaw/services/[service]/page.tsx:307-333`
- `app/locations/bonney-lake/services/[service]/page.tsx:297-323`

**Problem**: The "Other Services in {Location}" section dynamically lists all services WITHOUT filtering by `isServiceAvailableAtLocation`. This creates links like:
- `/locations/enumclaw/services/sleep-medicine` (redirects to Bonney Lake)
- `/locations/enumclaw/services/emface-exion` (redirects to Bonney Lake)

**Code causing the issue** (`enumclaw/services/[service]/page.tsx:314-331`):
```tsx
{otherServices.map((service) => {
    const serviceSlug = service
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    return (
        <Link
            key={service}
            href={`/locations/${LOCATION.slug}/services/${serviceSlug}`}
            // NO FILTERING - links to all services regardless of availability
```

**Fix needed**: Filter `otherServices` using `isServiceAvailableAtLocation` before mapping:
```tsx
{otherServices
    .filter((service) => {
        const serviceSlug = service.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-");
        return isServiceAvailableAtLocation(serviceSlug, LOCATION.slug);
    })
    .map((service) => {
```

#### Source 2: Areas-We-Serve "Other Areas" Section (OK)

**File**: `app/areas-we-serve/[area]/[service]/page.tsx:436-458`

**Status**: Correctly filtered by `isServiceAvailableAtLocation` at line 439:
```tsx
].filter((loc) => isServiceAvailableAtLocation(params.service, loc.slug));
```

#### Source 3: Main Services Page (OK)

**File**: `app/services/[service]/page.tsx:630-704`

**Status**: Correctly checks `getServiceLocation()` and only shows the appropriate location link.

#### Source 4: Location Home Pages (OK)

**Files**:
- `app/locations/enumclaw/page.tsx:196-237`
- `app/locations/bonney-lake/page.tsx:205-247`

**Status**: Correctly filtered by `isServiceAvailableAtLocation` at lines filtering `topServices`.

---

## Summary of Required Changes

### Priority 1: Add Parent Service Links to Location Templates
- [ ] Add link to `/services/[slug]` in `app/locations/enumclaw/services/[service]/page.tsx`
- [ ] Add link to `/services/[slug]` in `app/locations/bonney-lake/services/[service]/page.tsx`
- [ ] Use descriptive anchor text (3-6 words)

### Priority 2: Enhance Existing Link in Areas-We-Serve Template
- [ ] Improve anchor text from "Learn more about X" to something more descriptive
- [ ] Consider repositioning higher in content

### Priority 3: Fix Redirect-Causing Links
- [ ] Filter "Other Services" section in `app/locations/enumclaw/services/[service]/page.tsx:307-333`
- [ ] Filter "Other Services" section in `app/locations/bonney-lake/services/[service]/page.tsx:297-323`

---

## Impact Estimate

Adding prominent links from all 72 location service pages + 76 area service pages to parent service pages would approximately:
- **Before**: Parent pages receive 6-15 inlinks each
- **After**: Parent pages would receive 6-15 + ~8-10 per service = potentially 14-25+ inlinks each

This would rebalance the hierarchy so parent pages have equal or greater link authority than their children.
