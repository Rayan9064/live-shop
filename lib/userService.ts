import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string;
    photoURL?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    preferences?: {
        interests?: string[];
        notifications?: boolean;
    };
    onboardingCompleted: boolean;
    createdAt: any;
    updatedAt?: any;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return null;
        }

        return userDoc.data() as UserProfile;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
    try {
        const userDocRef = doc(db, 'users', uid);
        await updateDoc(userDocRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
}

export function isProfileComplete(user: UserProfile | null): boolean {
    if (!user) return false;

    // Check if required fields are filled
    const hasBasicInfo = !!(user.email && user.displayName);
    const hasOnboardingInfo = !!(user.phone && user.dateOfBirth && user.gender);

    return hasBasicInfo && hasOnboardingInfo && user.onboardingCompleted;
}
