# Converting Mock Components to a Real E-commerce Site with Firebase & Android

## 1. Replace Mock Data with Firebase Integration

- **Install Firebase SDK**  
  Add Firebase to your Next.js project:
  ```sh
  npm install firebase
  ```

- **Configure Firebase**  
  Create a `firebaseConfig.ts` in your project:
  ```ts
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getAuth } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "..."
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);
  ```

- **Fetch Data from Firestore**  
  Replace mock data in components like [`app/shop/page.tsx`](app/shop/page.tsx) with Firestore queries:
  ```tsx
  import { useEffect, useState } from "react";
  import { db } from "../../firebaseConfig";
  import { collection, getDocs } from "firebase/firestore";

  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchProducts();
  }, []);
  ```

## 2. Implement Authentication

- Use Firebase Auth for user sign-up, login, and session management.
- Update your signup and login components to use `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, etc.

## 3. CRUD Operations

- **Products:** Admins can add/edit/delete products using Firestore.
- **Cart:** Store cart items in Firestore or local state, sync with user account.
- **Orders:** On checkout, create an order document in Firestore.

## 4. Android App

- Use [Firebase Android SDK](https://firebase.google.com/docs/android/setup) in your Android app.
- Mirror the Firestore structure used in your web app.
- Implement authentication, product listing, cart, and order placement in the Android app.

## 5. Deployment

- **Web App:** Deploy to Vercel, Netlify, or Firebase Hosting.
- **Android App:** Build and publish via Google Play Store.

## 6. Security

- Set up Firestore security rules to protect user data.
- Use Firebase Authentication for access control.

## 7. References

- [Firebase Web Docs](https://firebase.google.com/docs/web/setup)
- [Firebase Android Docs](https://firebase.google.com/docs/android/setup)
- [Next.js + Firebase Example](https://github.com/vercel/next.js/tree/canary/examples/with-firebase)

---

**Summary:**  
Replace all mock data with Firestore queries, implement authentication and CRUD operations, and build an Android app using Firebase SDK. Ensure security rules are set up for Firestore.
