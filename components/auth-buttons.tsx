"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ChromeIcon as Google } from "lucide-react";
import { motion } from "framer-motion";

export function AuthButtons() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google");
    setIsLoading(false);
  };

  if (session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button onClick={() => signOut()} variant="ghost">
          Sign Out
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button variant="ghost" asChild>
        <Link href="/login">Log In</Link>
      </Button>
      <Button asChild>
        <Link href="/register">Sign Up</Link>
      </Button>
      <Button
        onClick={handleGoogleSignIn}
        variant="outline"
        disabled={isLoading}
      >
        <Google className="w-4 h-4 mr-2" />
        {isLoading ? "Signing in..." : "Sign in with Google"}
      </Button>
    </motion.div>
  );
}
