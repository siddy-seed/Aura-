const cloudinary = require('../config/cloudinary.config');
const fs = require('fs');
const path = require('path');

// Manually configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dgdpqdahl',
    api_key: '444826374453113',
    api_secret: 'jpwkJqdPaFtbfFtMVkGBblgt7E4',
});

// Define images to upload with their local paths and desired Cloudinary folder structure
const imagesToUpload = [
    // Product images
    { local: '../../client/public/products/product-1.jpg', folder: 'aura/products', publicId: 'product-1' },
    { local: '../../client/public/products/product-2.jpg', folder: 'aura/products', publicId: 'product-2' },
    { local: '../../client/public/products/product-3.jpg', folder: 'aura/products', publicId: 'product-3' },
    { local: '../../client/public/products/product-4.jpg', folder: 'aura/products', publicId: 'product-4' },
    { local: '../../client/public/products/product-5.jpg', folder: 'aura/products', publicId: 'product-5' },
    { local: '../../client/public/products/product-6.jpg', folder: 'aura/products', publicId: 'product-6' },
    { local: '../../client/public/products/product-7.png', folder: 'aura/products', publicId: 'product-7' },
    { local: '../../client/public/products/product-8.jpg', folder: 'aura/products', publicId: 'product-8' },

    // Testimonial images
    { local: '../../client/public/testimonials/customer1.png', folder: 'aura/testimonials', publicId: 'customer1' },
    { local: '../../client/public/testimonials/customer2.png', folder: 'aura/testimonials', publicId: 'customer2' },
    { local: '../../client/public/testimonials/customer3.png', folder: 'aura/testimonials', publicId: 'customer3' },

    // Logo and brand assets
    { local: '../../client/public/aura-logo.png', folder: 'aura/brand', publicId: 'aura-logo' },
    { local: '../../client/src/assets/about-logo-floral.png', folder: 'aura/brand', publicId: 'about-logo-floral' },
    { local: '../../client/src/assets/about-logo.png', folder: 'aura/brand', publicId: 'about-logo' },
    { local: '../../client/src/assets/about-brand.png', folder: 'aura/brand', publicId: 'about-brand' },
];

const uploadResults = [];

async function uploadImage(imageConfig) {
    const { local, folder, publicId } = imageConfig;
    const imagePath = path.join(__dirname, local);

    // Check if file exists
    if (!fs.existsSync(imagePath)) {
        console.log(`❌ File not found: ${imagePath}`);
        return null;
    }

    try {
        console.log(`📤 Uploading: ${local}...`);
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: folder,
            public_id: publicId,
            overwrite: true,
            resource_type: 'auto',
        });

        console.log(`✅ Uploaded successfully: ${result.secure_url}`);
        return {
            localPath: local,
            cloudinaryUrl: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error(`❌ Error uploading ${local}:`, error.message);
        return null;
    }
}

async function bulkUpload() {
    console.log('🚀 Starting bulk upload to Cloudinary...\n');
    console.log(`Cloud Name: ${cloudinary.config().cloud_name}\n`);

    for (const imageConfig of imagesToUpload) {
        const result = await uploadImage(imageConfig);
        if (result) {
            uploadResults.push(result);
        }
    }

    // Save results to JSON file
    const outputPath = path.join(__dirname, '../cloudinary-urls.json');
    fs.writeFileSync(outputPath, JSON.stringify(uploadResults, null, 2));

    console.log('\n✨ Upload complete!');
    console.log(`📝 Results saved to: ${outputPath}`);
    console.log(`\n📊 Summary: ${uploadResults.length}/${imagesToUpload.length} images uploaded successfully\n`);

    // Print all URLs
    console.log('🔗 Cloudinary URLs:');
    uploadResults.forEach(result => {
        console.log(`${result.localPath} → ${result.cloudinaryUrl}`);
    });
}

bulkUpload().catch(console.error);
