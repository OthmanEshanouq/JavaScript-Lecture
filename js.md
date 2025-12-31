# JavaScript Implementation Documentation

## Overview
This document outlines the JavaScript functionality implemented for the N-Tech Fabric website.

## Features Implemented

### 1. FAQ Section
- Collapsible FAQ section with multiple questions about shipping, refunds, and international shipping
- Toggle button to show/hide FAQ content
- Default state: Hidden
- Smooth animations for expanding/collapsing

### 2. Shopping Cart Functionality
- "Add to Cart" button replaces "Buy Now"
- Quantity controls with +/- buttons
- Real-time cart count display on cart icon in header
- Cart count badge shows total items in cart

### 3. Dark/Light Mode Toggle
- Theme switcher in header
- Toggle button with sun (day) and moon (night) icons
- Smooth transitions between themes
- Theme preference saved to localStorage

## JavaScript Functions

### Cart Management
- `addToCart()` - Adds items to cart
- `increaseQuantity()` - Increases item quantity
- `decreaseQuantity()` - Decreases item quantity
- `updateCartCount()` - Updates cart count badge
- `updateCartDisplay()` - Updates cart UI

### FAQ Management
- `toggleFAQ()` - Toggles FAQ section visibility

### Theme Management
- `toggleTheme()` - Switches between light and dark mode
- `initializeTheme()` - Loads saved theme preference on page load
- `applyTheme()` - Applies theme styles

## Event Listeners
- Button clicks for cart operations
- FAQ toggle button
- Theme toggle switch
- Quantity control buttons

## LocalStorage Usage
- Theme preference (`theme`)
- Cart data (`cart`)

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox

