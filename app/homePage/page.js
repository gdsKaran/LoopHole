import BlogForm from "@/components/blogs";

import { getPosts } from "@/components/lib/blogs-DB";
export default async function HomePage() {
  const Posts = await getPosts();

  return <BlogForm posts={Posts} />;
}
