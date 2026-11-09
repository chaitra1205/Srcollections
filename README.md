# Sairam Collections — Luxury Jewellery Web Application

A modern, high-conversion storefront website for **Sairam Collections** (*"Quiet luxury, everyday treasures"*), designed with warm champagne silk aesthetics, instant entrance animations, dynamic counting stats, interactive shopping bag, and direct WhatsApp checkout.

---

## 🌟 Key Features

1. **Immediate Entrance Animations Upon Opening**:
   - **Header Slide-Down**: Smooth top navigation reveal with glassmorphism.
   - **Staggered Hero Reveal**: Title lines (*"Quiet luxury,"* and *"everyday treasures."*) float up gracefully.
   - **Continuous Golden Shimmer**: Shimmering metallic gold wave effect across the italic hero text.
   - **Live Number Counter**: Real-time counter from `0` to `500+` Happy Customers, `120+` Unique Designs, and `4.9★` Average Rating.
   - **Hero Floating Movement**: Zero-gravity gentle floating effect for the jewellery showcase.
   - **Springy Badge Pop-In**: *"✨ Hand-packed orders | Ready in 24 hours"* badge springs into position with twinkling star icon.
   - **Ambient Gold Sparkles**: Dynamic background particle canvas generating delicate drifting stardust.

2. **Authentic Design & Layout**:
   - **Top Announcement Bar**: Free shipping over ₹1,499 alert.
   - **Trust Bar / Value Propositions**: Free Shipping, Trusted by 500+ buyers, Personally Packed, Gift Wrap Available.
   - **Shop by Category**: 5 interactive category cards (01 Earrings, 02 Necklaces, 03 Bangles, 04 Kids Jewellery, 05 Bridal Collection) that auto-scroll and filter the collection.
   - **Just In / New Arrivals**: Antique Gold Jhumka, Engraved Bangle Duo, Little Charm Bracelets.
   - **Full Curated Catalog**: Interactive category filter pills + real-time live search bar.
   - **Brand Story**: About the home-based studio in Karmanghat, Hyderabad.
   - **Kind Words / Reviews**: Real customer testimonials from Hyderabad, Bengaluru, and Chennai.
   - **Interactive FAQ Accordion**: Expandable answers with rotating (+) toggle icons.
   - **Contact Us Cards**: Direct WhatsApp chat (+91 88858 22322), Instagram (@sairamcollections), Email, and Location.

3. **Shopping Bag & WhatsApp Checkout**:
   - **Cart Drawer**: Slides in from right, tracks items, allows quantity change and removal.
   - **Free Shipping Progress Tracker**: Visual progress bar toward ₹1,499 threshold.
   - **WhatsApp Checkout Generator**: Automatically compiles items, quantities, and order total into a pre-filled WhatsApp message.
   - **Quick View Modal**: Inspect piece details, specifications, and pricing before adding to bag.

---

## 🚀 How to Run and View the Website

### Option 1: Direct Double-Click (Zero Install)
You can directly open `index.html` in Google Chrome, Microsoft Edge, or Firefox:
```bash
# File location:
c:\Users\bonag\OneDrive\Desktop\new\index.html
```
Double-click `index.html` in File Explorer, and the website will open immediately with full animations!

### Option 2: Run with Node.js
In your terminal, navigate to this folder and run:
```bash
npm start
```
Then open: **`http://localhost:3000`** in your browser.

---

## 📁 File Structure

```
c:\Users\bonag\OneDrive\Desktop\new\
│
├── index.html          # Main HTML5 semantic document
├── styles.css          # Luxury design system, typography, layout & cards
├── animations.css      # Keyframes for immediate load, float, shimmer & reveal
├── script.js           # Immediate load orchestration, cart, filters, modal & WhatsApp
├── server.js           # Lightweight local Node.js server
├── package.json        # NPM scripts configuration
├── README.md           # Documentation and guide
│
└── assets\
    └── images\         # High-resolution cropped jewellery images & icons
        ├── hero-jewellery.jpg
        ├── cat-earrings.jpg
        ├── cat-necklaces.jpg
        ├── cat-bangles.jpg
        ├── cat-kids.jpg
        ├── cat-bridal.jpg
        ├── product-jhumka.jpg
        ├── product-bangle-duo.jpg
        ├── product-charms.jpg
        ├── product-bridal-heirloom.jpg
        ├── product-layered-necklace.jpg
        ├── product-pearl-drops.jpg
        └── product-gold-stack.jpg
```

---

## ⚙️ How to Customize

- **Change WhatsApp Number**: Open `script.js` and edit `const WHATSAPP_PHONE = '918885822322';`.
- **Add / Edit Products**: Open `script.js` and modify items in `PRODUCTS_DATA`.
- **Change Free Shipping Threshold**: In `script.js`, edit `const FREE_SHIPPING_THRESHOLD = 1499;`.
