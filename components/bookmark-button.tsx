"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

interface BookmarkButtonProps {
  postId: string;
}

export function BookmarkButton({ postId }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (session) {
      // Check if the post is bookmarked
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      setIsBookmarked(bookmarks.includes(postId));
    }
  }, [session, postId]);

  const handleBookmark = async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be logged in to bookmark posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      if (isBookmarked) {
        const updatedBookmarks = bookmarks.filter(
          (id: string) => id !== postId
        );
        localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
        setIsBookmarked(false);
        toast({
          title: "Bookmark removed",
          description: "The post has been removed from your bookmarks.",
        });
      } else {
        bookmarks.push(postId);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        setIsBookmarked(true);
        toast({
          title: "Bookmark added",
          description: "The post has been added to your bookmarks.",
        });
      }
    } catch (error) {
      console.error("Error updating bookmark:", error);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleBookmark}
      className={isBookmarked ? "bg-blue-100" : ""}
    >
      <Bookmark
        className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
      />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </Button>
  );
}
