# Ossman Harding Dental Website

Website for Ossman Harding Dental, a family and cosmetic dentistry practice with offices in Enumclaw and Bonney Lake, WA.

## Configuration

The main configuration file is `lib/config.ts`, which includes:
- Business information (name, contact, addresses)
- Service areas
- Navigation menu
- Reviews
- Gallery projects
- FAQs
- Dental services

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add images**:
   - Add logo files to `public/images/` (logo.png, logo-white.png)
   - Add hero images, gallery images, etc.
   - Update image paths in `lib/config.ts` if needed

3. **Run development server**:
   ```bash
   npm run dev
   ```

## Deployment

This site can be deployed to AWS Amplify. The `amplify.yml` file contains the build configuration.

## Office Locations

- **Enumclaw Office**: 1705 Cole St. Enumclaw, WA 98022
- **Bonney Lake Office**: 19034 141st Street Ct E, Bonney Lake, WA 98391

## Contact

- Phone: (360) 825-5585
- Email: Info@TeamOHD.com
- Website: https://www.teamohd.com
