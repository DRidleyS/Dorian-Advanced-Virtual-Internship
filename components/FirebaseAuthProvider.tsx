// components/FirebaseAuthProvider.tsx
"use client";
import { useEffect } from "react";
import { onAuthStateChanged, FirebaseUser } from "@/lib/firebase";
import { useAppDispatch } from "@/store/hooks";
import { setUser, clearUser } from "@/store/authSlice";
import { auth } from "@/lib/firebase";

export default function FirebaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        dispatch(
          setUser({
            uid: fbUser.uid,
            email: fbUser.email ?? null,
            displayName: fbUser.displayName ?? null,
            photoURL: fbUser.photoURL ?? null,
            isAnonymous: fbUser.isAnonymous ?? false,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsub();
  }, [dispatch]);

  return <>{children}</>;
}
