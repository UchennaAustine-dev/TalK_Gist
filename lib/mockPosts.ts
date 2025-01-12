import { PostType } from "./post";

export const mockPosts: PostType[] = [
  {
    _id: "1",
    title: "The Future of Artificial Intelligence",
    slug: "future-of-ai",
    content:
      "Artificial Intelligence is rapidly evolving, transforming industries and our daily lives. From self-driving cars to advanced medical diagnostics, AI is pushing the boundaries of what's possible...",
    tags: ["AI", "Technology", "Future"],
    category: "Technology",
    author: {
      _id: "author1",
      name: "Jane Doe",
      avatar: "/avatars/jane-doe.jpg",
    },
    createdAt: new Date("2023-05-15").toISOString(),
    image: "/images/ai-future.jpg",
  },
  {
    _id: "2",
    title: "Sustainable Living: Small Changes, Big Impact",
    slug: "sustainable-living-tips",
    content:
      "Living sustainably doesn't have to mean drastic lifestyle changes. Small, everyday choices can add up to make a significant positive impact on our environment...",
    tags: ["Sustainability", "Environment", "Lifestyle"],
    category: "Environment",
    author: {
      _id: "author2",
      name: "John Smith",
      avatar: "/avatars/john-smith.jpg",
    },
    createdAt: new Date("2023-05-20").toISOString(),
    image: "/images/sustainable-living.jpg",
  },
  {
    _id: "3",
    title: "The Rise of Remote Work: Challenges and Opportunities",
    slug: "remote-work-challenges-opportunities",
    content:
      "The COVID-19 pandemic has accelerated the shift towards remote work, bringing both challenges and opportunities for employees and employers alike...",
    tags: ["Remote Work", "Career", "Technology"],
    category: "Work",
    author: {
      _id: "author3",
      name: "Emily Johnson",
      avatar: "/avatars/emily-johnson.jpg",
    },
    createdAt: new Date("2023-05-25").toISOString(),
    image: "/images/remote-work.jpg",
  },
];
