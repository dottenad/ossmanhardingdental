#!/usr/bin/env node

/**
 * Image Compression Script
 * Compresses all JPG, PNG, and WEBP images in /public/images
 *
 * Usage: node scripts/compress-images.mjs
 *
 * Options:
 *   --dry-run    Show what would be compressed without making changes
 *   --quality=N  Set JPEG/WEBP quality (default: 80)
 *   --max-width=N  Max width to resize to (default: 1920)
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, relative } from 'path';
import { existsSync } from 'fs';

const IMAGES_DIR = './public/images';
const BACKUP_DIR = './public/images-backup';
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const qualityArg = args.find(a => a.startsWith('--quality='));
const maxWidthArg = args.find(a => a.startsWith('--max-width='));

const QUALITY = qualityArg ? parseInt(qualityArg.split('=')[1]) : 80;
const MAX_WIDTH = maxWidthArg ? parseInt(maxWidthArg.split('=')[1]) : 1920;

let totalOriginalSize = 0;
let totalCompressedSize = 0;
let filesProcessed = 0;
let filesSkipped = 0;

async function getAllImages(dir) {
    const images = [];

    async function scan(currentDir) {
        const entries = await readdir(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = join(currentDir, entry.name);

            if (entry.isDirectory()) {
                await scan(fullPath);
            } else if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if (SUPPORTED_EXTENSIONS.includes(ext)) {
                    images.push(fullPath);
                }
            }
        }
    }

    await scan(dir);
    return images;
}

async function compressImage(filePath) {
    const ext = extname(filePath).toLowerCase();
    const stats = await stat(filePath);
    const originalSize = stats.size;

    try {
        let image = sharp(filePath);
        const metadata = await image.metadata();

        // Resize if wider than MAX_WIDTH
        if (metadata.width && metadata.width > MAX_WIDTH) {
            image = image.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        let buffer;

        if (ext === '.png') {
            buffer = await image
                .png({ quality: QUALITY, compressionLevel: 9 })
                .toBuffer();
        } else if (ext === '.webp') {
            buffer = await image
                .webp({ quality: QUALITY })
                .toBuffer();
        } else {
            // JPG/JPEG
            buffer = await image
                .jpeg({ quality: QUALITY, mozjpeg: true })
                .toBuffer();
        }

        const compressedSize = buffer.length;

        // Only save if we actually reduced the size
        if (compressedSize < originalSize) {
            if (!dryRun) {
                await sharp(buffer).toFile(filePath);
            }
            return { originalSize, compressedSize, saved: true };
        } else {
            return { originalSize, compressedSize: originalSize, saved: false, reason: 'already optimized' };
        }
    } catch (error) {
        return { originalSize, compressedSize: originalSize, saved: false, reason: error.message };
    }
}

function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function formatPercent(original, compressed) {
    const saved = ((original - compressed) / original) * 100;
    return saved.toFixed(1) + '%';
}

async function main() {
    console.log('\n🖼️  Image Compression Script');
    console.log('================================');
    console.log(`Quality: ${QUALITY}%`);
    console.log(`Max Width: ${MAX_WIDTH}px`);
    if (dryRun) {
        console.log('🔍 DRY RUN - No files will be modified\n');
    } else {
        console.log('');
    }

    // Check if images directory exists
    if (!existsSync(IMAGES_DIR)) {
        console.error(`❌ Directory not found: ${IMAGES_DIR}`);
        process.exit(1);
    }

    // Get all images
    const images = await getAllImages(IMAGES_DIR);
    console.log(`Found ${images.length} images to process\n`);

    if (images.length === 0) {
        console.log('No images found.');
        return;
    }

    // Process each image
    for (const imagePath of images) {
        const relativePath = relative('.', imagePath);
        const result = await compressImage(imagePath);

        totalOriginalSize += result.originalSize;

        if (result.saved) {
            totalCompressedSize += result.compressedSize;
            filesProcessed++;
            const savings = formatPercent(result.originalSize, result.compressedSize);
            console.log(`✅ ${relativePath}`);
            console.log(`   ${formatBytes(result.originalSize)} → ${formatBytes(result.compressedSize)} (saved ${savings})`);
        } else {
            totalCompressedSize += result.compressedSize;
            filesSkipped++;
            console.log(`⏭️  ${relativePath} - ${result.reason || 'skipped'}`);
        }
    }

    // Summary
    console.log('\n================================');
    console.log('📊 Summary');
    console.log('================================');
    console.log(`Files processed: ${filesProcessed}`);
    console.log(`Files skipped: ${filesSkipped}`);
    console.log(`Original total: ${formatBytes(totalOriginalSize)}`);
    console.log(`Compressed total: ${formatBytes(totalCompressedSize)}`);
    console.log(`Total saved: ${formatBytes(totalOriginalSize - totalCompressedSize)} (${formatPercent(totalOriginalSize, totalCompressedSize)})`);

    if (dryRun) {
        console.log('\n💡 Run without --dry-run to apply changes');
    }
}

main().catch(console.error);
