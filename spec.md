# Suhel Chicken Traders

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full single-page React app for a chicken shop in Kotma
- Sticky header with SVG logo and floating cart icon
- Hero section: animated shop name, tagline, call/WhatsApp/Instagram buttons, decorative SVG chicken, floating particles
- Products section: two product cards (Cutting Chicken ₹220/kg, Zinda Chicken ₹150/kg) with weight sliders, preset buttons, live price display, "Add to Cart"
- "Today Fresh Stock" badge on each product card (admin-toggleable)
- "Out of Stock" overlay (admin-toggleable)
- Slide-in cart drawer with item list, remove buttons, subtotal, checkout button
- Checkout modal: name, phone (10-digit), address (must contain "Kotma"), COD payment, order summary, Place Order
- On Place Order: generate WhatsApp message and open wa.me/919301567327
- Order confirmation screen with thank you message and new order option
- Admin panel (password: suhel123): toggle fresh badge, toggle stock status, update prices per kg; all persisted in localStorage
- Footer with contact info and social links
- Framer Motion animations: hero entrance, scroll reveal, cart open/close, price flip, hover lift, button press, floating badges

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: minimal Motoko actor (no server-side state needed; all state in localStorage/Zustand)
2. Frontend state: Zustand stores for cart and admin settings (prices, stock, fresh badge) with localStorage persistence
3. SVG Logo component: rooster icon + shop name + tagline
4. Hero section with gradient background, shimmer text animation, CTA buttons, animated chicken SVG, particles
5. Products section: ProductCard component with slider, presets, custom input, live price, add to cart
6. CartDrawer component: slide-in sidebar, item list, subtotal, proceed to checkout
7. CheckoutModal: React Hook Form, address Kotma validation, WhatsApp message generation
8. OrderConfirmation screen
9. AdminPanel: password gate, toggles and price inputs, localStorage sync
10. Footer component
11. Responsive mobile-first layout throughout
