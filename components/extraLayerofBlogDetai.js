"use client";

import { toggleLikeButtonStatus } from "@/actions/auth";
import { useOptimistic } from "react";
import DetailedPage from "./blog-details";

export function ExtraLayerOFblogDetails({ postData, comments, currentUser }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    postData,
    (prevPost, updatedPostId) => {
      if (prevPost.id !== updatedPostId) {
        return prevPost;
      }

      return {
        ...prevPost,
        likes: prevPost.likes + (prevPost.isLiked ? -1 : 1),
        isLiked: !prevPost.isLiked,
      };
    }
  );

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await toggleLikeButtonStatus(postId);
  }

  return (
    <DetailedPage
      postData={optimisticPosts}
      action={updatePost}
      comments={comments}
      currentUser={currentUser}
    />
  );
}
