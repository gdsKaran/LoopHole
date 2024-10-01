import { ExtraLayerOFblogDetails } from "@/components/extraLayerofBlogDetai";
import { verifyAuth } from "@/components/lib/auth";
import { getCommentsOfPost, getPostById } from "@/components/lib/blogs-DB";

export default async function BlogDetailPage({ params }) {
  const postId = params.id;
  const result = await verifyAuth();
  const userId = result.user.id;
  const postData = await getPostById(userId, postId);
  const comments = await getCommentsOfPost(postId);

  return (
    <ExtraLayerOFblogDetails
      postData={postData}
      comments={comments}
      currentUser={userId}
    />
  );
}
