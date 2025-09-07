# WelcomeIntro Component Documentation

A production-ready welcome animation component built with React, Tailwind CSS, and Framer Motion.

## Features

- ✨ **Smooth Animations**: Sequential logo scale bounce, heading slide-in, and subtext fade-in
- 🎨 **Beautiful Design**: Full viewport overlay with gradient background and subtle blur effects
- ♿ **Accessibility First**: Respects `prefers-reduced-motion` and includes proper ARIA attributes
- 💾 **Smart Persistence**: Shows only on first visit using localStorage
- 🔄 **CSS Fallback**: Includes pure CSS version for environments without Framer Motion
- 📱 **Responsive**: Optimized for mobile, tablet, and desktop

## Installation

1. Ensure you have the required dependencies:
```bash
npm install framer-motion tailwindcss
```

2. Import and use the component:
```jsx
import WelcomeIntro from './components/intro/WelcomeIntro';
```

## Basic Usage

```jsx
import React from 'react';
import WelcomeIntro from './components/intro/WelcomeIntro';

function App() {
  return (
    <div>
      <WelcomeIntro 
        logo="/path/to/logo.png"
        heading="Welcome to Your Site"
        subtext="Building amazing experiences."
      />
      {/* Your main app content */}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `string` | `null` | SVG string or image URL for the logo |
| `heading` | `string` | `"Welcome to jd"` | Main heading text |
| `subtext` | `string` | `"Building things with code."` | Subtitle text |
| `forceShow` | `boolean` | `false` | Force show animation regardless of localStorage |
| `onComplete` | `function` | `() => {}` | Callback when animation completes |

## Advanced Usage

### Custom Logo (SVG)
```jsx
const logoSVG = `<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#8B5CF6" />
</svg>`;

<WelcomeIntro logo={logoSVG} />
```

### Force Show for Testing
```jsx
<WelcomeIntro 
  forceShow={true}
  onComplete={() => console.log('Animation completed!')}
/>
```

### Development Mode (always show)
```jsx
<WelcomeIntro 
  forceShow={process.env.NODE_ENV === 'development'}
  heading="Welcome to Dev Mode"
  subtext="Testing the welcome animation."
/>
```

## Animation Sequence

1. **Logo** (0s → 1.2s): Scale from 0.65 → 1.12 → 1.0 with bounce effect
2. **Heading** (0.6s → 1.4s): Fade in with 14px upward slide
3. **Subtext** (1.2s → 1.8s): Simple fade in
4. **Auto-dismiss** (3.2s): Overlay fades out and unmounts

## Tailwind Classes Used

### Core Layout
- `fixed inset-0 z-50` - Full viewport overlay with high z-index
- `flex items-center justify-center` - Center content
- `bg-gradient-to-b from-purple-50 to-white` - Gradient background

### Background Accent
- `absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2` - Centered positioning
- `w-96 h-96 bg-gradient-to-r from-purple-200 to-blue-200` - Size and gradient
- `rounded-full blur-3xl opacity-30` - Circular blur effect

### Typography
- `text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800` - Responsive heading
- `text-lg md:text-xl text-gray-600 font-light` - Responsive subtext
- `font-sans` - System font stack

### Logo
- `w-20 h-20 md:w-24 md:h-24 object-contain` - Responsive logo sizing

## CSS-Only Fallback

For environments where Framer Motion is not available, use the CSS-only version:

```jsx
import WelcomeIntroCSS from './components/intro/WelcomeIntroCSS';
import './components/intro/WelcomeIntro.css';

// Same props as the main component
<WelcomeIntroCSS logo="/logo.png" heading="Welcome!" />
```

## Accessibility Features

- **Reduced Motion**: Automatically detects and respects `prefers-reduced-motion`
- **ARIA**: Includes `role="dialog"` and `aria-label="Welcome overlay"`
- **Focus Management**: Properly manages focus states
- **Keyboard Navigation**: No focus traps (overlay is non-interactive)

## Browser Support

- **Modern Browsers**: Full Framer Motion support
- **Legacy Browsers**: CSS-only fallback
- **Mobile**: Optimized for touch devices
- **Screen Readers**: Full accessibility support

## Customization

### Colors
Modify the gradient colors in the component:
```jsx
// Change from purple to blue gradient
className="bg-gradient-to-b from-blue-50 to-white"
```

### Timing
Adjust animation delays in the variants:
```jsx
const headingVariants = {
  animate: {
    transition: {
      delay: 0.8, // Changed from 0.6s
      duration: 1.0, // Changed from 0.8s
    }
  }
};
```

### Auto-dismiss Timing
Change the auto-dismiss delay:
```jsx
setTimeout(() => {
  handleDismiss();
}, 2000); // Changed from 1000ms
```

## Troubleshooting

### Component Not Showing
1. Check if `introSeen` is set in localStorage - clear it for testing
2. Ensure Tailwind CSS is properly configured
3. Verify z-index isn't being overridden

### Animation Not Working
1. Confirm Framer Motion is installed and imported
2. Check for JavaScript errors in console
3. Verify reduced motion settings if animations seem instant

### Performance Issues
1. Use the CSS-only version for better performance
2. Consider lazy loading for better initial page load
3. Optimize logo image size and format

## Examples

### E-commerce Site
```jsx
<WelcomeIntro 
  logo="/brand-logo.svg"
  heading="Welcome to ShopName"
  subtext="Discover amazing products at great prices."
/>
```

### Portfolio Site
```jsx
<WelcomeIntro 
  logo="/profile-photo.jpg"
  heading="Hi, I'm John Doe"
  subtext="Full-stack developer and designer."
/>
```

### SaaS Application
```jsx
<WelcomeIntro 
  logo="/app-icon.svg"
  heading="Welcome to AppName"
  subtext="Streamline your workflow with powerful tools."
/>
```
