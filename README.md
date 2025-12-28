# Live Commerce + Reels Platform

> An India-first live commerce platform enabling users to discover products via short videos (reels) and live streams, with instant purchase capabilities.

---

## 🏗️ System Architecture

### Architecture Overview (Cloud Functions)

<img width="569" height="807" alt="image" src="https://github.com/user-attachments/assets/ed627c13-858e-42ac-b623-a0980bea344f" />

```plantuml
@startuml
!theme plain
skinparam backgroundColor #FEFEFE
skinparam componentStyle rectangle

package "Client Layer" as Client #E1F5FF {
  component "Next.js App\n(Static Export)" as NextJS
  component "API Client\n(lib/api.ts)" as API
  component "React Components" as UI
}

package "Backend Layer" as Backend #FFF4E1 {
  component "Express Server" as Express
  component "Auth Middleware" as Auth
  component "Product Handlers" as ProductAPI
  component "Business Logic" as Business
}

package "Firebase Services" as Firebase #FFE1E1 {
  database "Firestore" as DB
  database "Storage" as Storage
  component "Firebase Auth" as FBAuth
}

NextJS --> API
API --> Express : HTTPS
Express --> Auth
Auth --> ProductAPI
ProductAPI --> Business
Business --> DB
Business --> Storage
NextJS ..> DB : Direct Read
NextJS --> FBAuth

note right of Business
  - Inventory Management
  - Payment Processing
  - Order Creation
end note

@enduml
```

---

### Data Flow: Product Purchase

<img width="835" height="726" alt="image" src="https://github.com/user-attachments/assets/9be51fb7-204b-4d09-a400-bb3cdc8af5b4" />

```plantuml
@startuml
skinparam backgroundColor #FEFEFE
skinparam sequenceMessageAlign center

actor User
participant "Client" as Client
participant "Cloud\nFunctions" as CF
database "Firestore" as DB
participant "Payment\nGateway" as Payment

User -> Client: Click "Buy Now"
activate Client

Client -> CF: POST /reserve
activate CF
CF -> DB: Create inventory lock\n(TTL: 5 min)
activate DB
DB --> CF: Lock created
deactivate DB
CF --> Client: Payment intent
deactivate CF

Client -> Payment: Process payment
activate Payment
Payment --> Client: Payment success
deactivate Payment

Client -> CF: POST /webhooks/payment
activate CF
CF -> DB: Confirm order
activate DB
CF -> DB: Deduct inventory
DB --> CF: Success
deactivate DB
CF --> Client: Order confirmed
deactivate CF

Client --> User: Show confirmation
deactivate Client

@enduml
```

---

### Database Schema (ER Diagram)

<img width="1267" height="530" alt="image" src="https://github.com/user-attachments/assets/867199c2-079d-48b2-a7fd-e0eef0e77d3f" />

```plantuml
@startuml
!theme plain
skinparam linetype ortho

entity "users" {
  * uid : string <<PK>>
  --
  name : string
  email : string
  createdAt : timestamp
}

entity "products" {
  * id : string <<PK>>
  --
  title : string
  price : number
  stock : number
  mediaUrls : array
  category : string
  sellerId : string
  isLivePinned : boolean
  createdAt : timestamp
}

entity "reels" {
  * id : string <<PK>>
  --
  productId : string <<FK>>
  videoUrl : string
  thumbnailUrl : string
  createdAt : timestamp
}

entity "streams" {
  * id : string <<PK>>
  --
  title : string
  playbackUrl : string
  pinnedProductIds : array
  isLive : boolean
  startedAt : timestamp
}

entity "orders" {
  * id : string <<PK>>
  --
  userId : string <<FK>>
  items : array
  total : number
  status : enum
  createdAt : timestamp
}

entity "inventory_locks" {
  * id : string <<PK>>
  --
  productId : string <<FK>>
  qty : number
  expiresAt : timestamp
  status : enum
}

entity "carts" {
  * userId : string <<PK>>
  --
  items : array
}

reels }o--|| products
orders }o--|| users
inventory_locks }o--|| products
carts }o--|| users

@enduml
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Firebase CLI: `npm install -g firebase-tools`
- Firebase project created

### Installation

```bash
# Install dependencies
npm install

# Install Cloud Functions dependencies
cd functions
npm install
cd ..

# Setup environment variables
cp .env.local.example .env
# Edit .env with your Firebase credentials
```

### Development

```bash
# Run Next.js dev server
npm run dev

# Run Cloud Functions emulator (in separate terminal)
cd functions
npm run serve
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Deployment

```bash
# Deploy Cloud Functions
firebase deploy --only functions

# Build and deploy Next.js
npm run build
# Deploy to Vercel/Firebase Hosting
```

---

## 📁 Project Structure

```
live-shop/
├── app/                    # Next.js app directory
│   ├── products/          # Product listing page
│   ├── signin/            # Authentication pages
│   ├── providers/         # React context providers
│   └── ...
├── components/            # Reusable React components
│   ├── ProductCard.tsx
│   └── ProductGrid.tsx
├── functions/             # Firebase Cloud Functions
│   ├── src/
│   │   ├── index.ts      # Express server
│   │   ├── products/     # Product API handlers
│   │   ├── middleware/   # Auth middleware
│   │   └── utils/        # Helper functions
│   └── package.json
├── lib/                   # Shared utilities
│   ├── api.ts            # API client
│   ├── firestore.ts      # Firestore helpers
│   └── types.ts          # TypeScript types
└── public/               # Static assets
```

---

## 🔑 Key Features

### Week 1 (Completed ✅)
- ✅ Firebase Cloud Functions setup
- ✅ Product CRUD APIs
- ✅ Authentication system
- ✅ Product listing UI
- ✅ API client infrastructure

### Week 2 (Planned)
- [ ] Reels data model
- [ ] Video playback with HLS.js
- [ ] Product detail pages

### Week 3 (Planned)
- [ ] Cart functionality
- [ ] Inventory reservation
- [ ] Checkout flow

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

**Backend:**
- Firebase Cloud Functions
- Express.js
- Firebase Admin SDK

**Database:**
- Firestore (NoSQL)
- Firebase Storage

**Authentication:**
- Firebase Auth (Email/Password + Google OAuth)

**Payment:**
- Razorpay (India)

---

## 📚 Documentation

- [ROADMAP.md](./ROADMAP.md) - Complete MVP roadmap
- [Architecture Decisions](./docs/decisions.md) - ADRs
- [API Documentation](./docs/api.md) - API endpoints

---

## 🔒 Security

- API keys stored in environment variables
- Admin operations protected by middleware
- Firestore security rules enforced
- Payment processing server-side only

---

## 📄 License

MIT

---

## 👥 Contributors

- Mohammed Rayan A ([@Rayan9064](https://github.com/Rayan9064))
