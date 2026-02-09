# Sound Custom Fences Website

This is the client-specific website configuration for Sound Custom Fences, built from the SEO Marketing Template.

## Client-Specific Files

This directory contains client-specific configuration files:

- `lib/config.ts` - Business configuration with all Sound Custom Fences information
- `public/images/` - Client logos, photos, and images (add your images here)
- `amplify.yml` - AWS Amplify build configuration (if using separate deployment)

## Setup

1. **Copy template files** (if not already done):
   ```bash
   # From the Template directory
   ./create-client.sh sound-custom-fences
   ```
   Or manually copy template files to this directory.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add client images**:
   - Add logo files to `public/images/` (logo.png, logo-white.png)
   - Add hero images, gallery images, etc.
   - Update image paths in `lib/config.ts` if needed

4. **Update configuration** (if needed):
   - Edit `lib/config.ts` to update business information (phone, email, address)
   - Update social media links
   - Customize colors, fonts, etc.

5. **Run development server**:
   ```bash
   npm run dev
   ```

## Deployment

This site can be deployed to AWS Amplify. The `amplify.yml` file contains the build configuration.

## Updating from Template

To get the latest template updates, run from the Template directory:
```bash
./sync-template.sh sound-custom-fences
```

**Note:** This will update template files but preserve:
- `lib/config.ts` (your business config)
- `public/images/` (your images)
- `app/page.tsx` (if customized)

## Configuration

The main configuration file is `lib/config.ts`, which includes:
- Business information (name, contact, address) - **TODO: Update phone, email, and address**
- Service areas
- Navigation menu
- Reviews
- Gallery projects
- Blog posts
- FAQs
- Industry-specific settings (fencing)

## TODO Items

Before going live, make sure to:
- [ ] Update phone number in `lib/config.ts`
- [ ] Update email address in `lib/config.ts`
- [ ] Update physical address in `lib/config.ts`
- [ ] Update website domain in `lib/config.ts`
- [ ] Update social media links in `lib/config.ts`
- [ ] Add logo images to `public/images/`
- [ ] Add hero and gallery images
- [ ] Review and customize all content (reviews, gallery, blog posts, FAQs)

