import SearchPageContent from "@/components/header/searchPageContent";
import { getPosts } from "@/components/lib/blogs-DB";

export default async function SearchPage() {
  const Posts = await getPosts();
  return (
    <>
      <SearchPageContent posts={Posts} />;
    </>
  );
}
