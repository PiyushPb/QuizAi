"use client"; // This tells Next.js that this is a client component
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const StoreUserId = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      // Store MongoDB `uid` in localStorage
      localStorage.setItem("userId", session.user.id);
    }
  }, [session]);

  return null;
};

export default StoreUserId;
