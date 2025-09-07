# Image Assets Directory Structure

This directory contains all the image assets for the JD Bath Fittings website.

## Directory Structure

```
images/
├── hero/           # Hero section images
├── about/          # About us section images
├── products/       # Product images
│   ├── faucets/    # Faucet product images
│   ├── sanitaryware/ # Sanitaryware product images
│   ├── bathroom/   # Bathroom accessories images
│   └── kitchen/    # Kitchen fittings images
├── gallery/        # Gallery/showcase images
├── banners/        # Banner and promotional images
└── logos/          # Company logos and branding
```

## Usage Instructions

1. **Product Images**: Place product images in their respective category folders
2. **Hero Images**: Add hero banner images and featured product images
3. **Company Images**: Store showroom, office, and team photos in the about folder
4. **Gallery Images**: High-quality showcase images for the gallery section

## Image Requirements

- **Format**: JPG, PNG, or WebP recommended
- **Size**: Optimize for web (compress images for faster loading)
- **Naming**: Use descriptive names (e.g., `premium-faucet-x1.jpg`)

## Image Placeholders

The website currently uses ImagePlaceholder components that can be easily replaced with actual images by:

1. Adding your image files to the appropriate directories
2. Importing the images in the component files
3. Replacing the ImagePlaceholder components with actual `<img>` tags or Chakra UI `<Image>` components

Example:
```jsx
// Replace this:
<ImagePlaceholder text="Product Image" />

// With this:
<Image src="/assets/images/products/faucets/product1.jpg" alt="Product Name" />
```

## Current Image Spaces

The website includes image placeholders in:

- **Hero Section**: Featured product thumbnails
- **Products Section**: Product showcase and grid
- **About Section**: Company showroom and team images
- **Contact Section**: Store front and interior views
- **Gallery Section**: Comprehensive product gallery with modal view











