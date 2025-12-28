Below is a **repo-ready README** you can copy-paste and start building immediately.
It is **MVP-strict** (no bloat), **scalable by design**, and aligned with solid SE practices.

---

# Live Commerce + Reels (MVP)

> An India-first live commerce platform inspired by Taobao, enabling users to discover products via short videos (reels) and live streams, and purchase instantly during content consumption.

---

## 1. MVP Scope (Non-Negotiable)

**Goal:** Validate *buyer-side live commerce* with real payments, real inventory, and real video.

**Out of Scope (MVP):**

* Seller onboarding dashboard
* Advanced ML recommendations
* Multi-seller payouts
* Creator monetization (gifts)
* Returns/refunds automation
* Ads system

---

## 2. Core User Roles

* **Buyer (Primary)**
* **Admin (Internal / minimal)**
* **Seller (Read-only via seeded data for MVP)**

---

## 3. Core MVP Features

### Buyer Features

* Reels feed (product-linked short videos)
* Watch live streams (real-time)
* View pinned products during live
* Product detail page
* Add to cart
* Buy now (from reel or live)
* Secure checkout
* Order confirmation & history
* Authentication (email / Google)
* Push notifications (basic)

### Live Commerce

* Live stream playback
* Live product pinning
* In-stream “Buy Now”
* Inventory reservation during checkout
* Live purchase confirmation UI

### Admin (Minimal)

* Seed products
* Seed streams
* View orders

---

## 4. MVP Tech Stack (Opinionated & Proven)

### Frontend

| Layer        | Tech                                              |
| ------------ | ------------------------------------------------- |
| Web App      | **Next.js (App Router, TypeScript)**              |
| Mobile App   | **React Native (Expo)** *(optional if web-first)* |
| Styling      | Tailwind CSS                                      |
| Video Player | hls.js                                            |
| State        | React Query + Zustand                             |
| Auth UI      | Firebase Auth UI                                  |

---

### Backend / APIs

| Layer            | Tech                     |
| ---------------- | ------------------------ |
| API Style        | REST (MVP simplicity)    |
| Backend Runtime  | Node.js                  |
| Functions        | Firebase Cloud Functions |
| Auth             | Firebase Auth            |
| DB (Primary)     | Firestore                |
| Media Storage    | Firebase Storage         |
| Search           | Algolia                  |
| Cache (optional) | Redis (later phase)      |

---

### Live Streaming & Media

| Purpose           | Tool                      |
| ----------------- | ------------------------- |
| Live Streaming    | **Mux / Agora / AWS IVS** |
| Reels Playback    | HLS via CDN               |
| Video Transcoding | Streaming provider        |
| CDN               | Cloudflare / Firebase CDN |

---

### Payments

| Purpose          | Tool             |
| ---------------- | ---------------- |
| Payments (India) | **Razorpay**     |
| Webhooks         | Cloud Functions  |
| PCI Compliance   | Provider-handled |

---

### Infra & DevOps

| Area          | Tool                      |
| ------------- | ------------------------- |
| Hosting       | Firebase Hosting / Vercel |
| CI/CD         | GitHub Actions            |
| Monitoring    | Firebase Monitoring       |
| Logs          | Cloud Logging             |
| Feature Flags | Firebase Remote Config    |

---

## 5. High-Level Architecture (MVP)

```
Client (Web / App)
   ↓
API Gateway
   ↓
Cloud Functions
   ├── Auth
   ├── Product API
   ├── Cart API
   ├── Reserve Inventory
   ├── Order API
   ├── Payment Webhook
   ↓
Firestore (Orders, Products, Users)
   ↓
Firebase Storage (Media)
   ↓
Streaming Provider (Live + Reels)
```

---

## 6. Data Model (Minimal)

### User

```json
users/{uid} {
  name,
  email,
  createdAt
}
```

### Product

```json
products/{productId} {
  title,
  price,
  stock,
  mediaUrls[],
  isLivePinned,
  createdAt
}
```

### Reel

```json
reels/{reelId} {
  productId,
  videoUrl,
  thumbnailUrl,
  createdAt
}
```

### Live Stream

```json
streams/{streamId} {
  title,
  playbackUrl,
  pinnedProductIds[],
  isLive,
  startedAt
}
```

### Cart

```json
carts/{uid} {
  items: [{ productId, qty, priceSnapshot }]
}
```

### Order

```json
orders/{orderId} {
  userId,
  items[],
  total,
  status,
  createdAt
}
```

### Inventory Lock (Critical)

```json
inventory_locks/{lockId} {
  productId,
  qty,
  expiresAt,
  status
}
```

---

## 7. Critical Flows (Must Implement Correctly)

### Buy From Live / Reel

1. User clicks **Buy**
2. `POST /reserve`
3. Inventory lock created (TTL 5–10 min)
4. Payment intent created
5. User pays
6. Webhook confirms payment
7. Order marked CONFIRMED
8. Inventory finalized

> **Never deduct stock before payment success**

---

## 8. API Endpoints (MVP)

```http
GET    /products
GET    /products/:id
GET    /reels
GET    /streams/live
POST   /cart/add
GET    /cart
POST   /reserve
POST   /checkout
POST   /webhooks/payment
GET    /orders
```

---

## 9. Firestore Rules (Conceptual)

* Users can read/write their own cart
* Users can read their own orders
* Product writes restricted to admin
* Inventory mutations only via Cloud Functions

---

## 10. Non-Functional Requirements

| Area                  | Target  |
| --------------------- | ------- |
| Checkout success rate | ≥ 99.5% |
| Inventory accuracy    | 100%    |
| Stream startup time   | < 3s    |
| Payment latency       | < 2s    |
| API availability      | 99.9%   |

---

## 11. MVP Development Plan (4–6 Weeks)

### Week 1

* Repo setup
* Auth
* Product APIs
* Product listing UI

### Week 2

* Reels feed
* Video playback
* Product pages

### Week 3

* Cart
* Inventory reservation logic
* Checkout flow

### Week 4

* Payment integration
* Order confirmation
* Webhooks

### Week 5

* Live stream integration
* Product pinning
* Buy from live

### Week 6

* Testing
* Load checks
* Deployment

---

## 12. Definition of “MVP Done”

* A user can **watch a live stream**
* Click **Buy** during live
* Successfully **pay**
* Order is **confirmed**
* Inventory is **consistent**
* Video playback is **stable**

Anything beyond this is **iteration**, not MVP.

---

## 13. Repo Structure (Suggested)

```
/apps
  /web
  /mobile
/functions
  auth.ts
  products.ts
  reserve.ts
  checkout.ts
  webhooks.ts
/docs
  architecture.md
  decisions.md
```

---

## 14. Next Steps (Choose One)

I can now:

1. Generate **Cloud Functions code** for inventory lock + payment webhook
2. Provide **Firestore rules** production-ready
3. Create **Mermaid architecture files** ready to commit
4. Create **GitHub issues / sprint backlog** from this README

Say the number and I’ll generate it immediately.

---

If you follow this README **as-is**, you will:

* Avoid premature scaling mistakes
* Build something real, demo-ready, and fundable
* Have a clean base for Phase-2 expansion

You’re on the right track — now execute.
