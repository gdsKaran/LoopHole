import { redirect } from "next/navigation";
import db from "./db";

export async function storePost(post) {
  const stmt = db.prepare(`
    INSERT INTO posts (title, content, user_id)
    VALUES (?, ?, ?)`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return stmt.run(post.title, post.content, post.userId);
}

export async function storeComment(comment) {
  const stmt = db.prepare(`
    INSERT INTO comments (content, user_id, post_id, parent_comment_id)
    VALUES (?, ?, ?, ?)`);

  return stmt.run(
    comment.content,
    comment.userId,
    comment.postId,
    comment.parentCommentId || null
  );
}

export async function getCommentsOfPost(postId) {
  const stmt = db.prepare(`
    SELECT 
      c.id, 
      c.content, 
      c.created_at, 
      c.user_id,
      u.first_name AS user_name
    FROM 
      comments c
    JOIN 
      users u ON c.user_id = u.id
    WHERE 
      c.post_id = ? AND c.parent_comment_id IS NULL
    ORDER BY 
      c.created_at ASC
  `);

  const topLevelComments = stmt.all(postId);

  function getReplies(commentId) {
    const replyStmt = db.prepare(`
      SELECT 
        c.id, 
        c.content, 
        c.created_at, 
        c.user_id,
        u.first_name AS user_name
      FROM 
        comments c
      JOIN 
        users u ON c.user_id = u.id
      WHERE 
        c.parent_comment_id = ?
      ORDER BY 
        c.created_at ASC
    `);

    const replies = replyStmt.all(commentId);

    // Recursively get replies for each reply
    replies.forEach((reply) => {
      reply.replies = getReplies(reply.id);
    });

    return replies;
  }

  topLevelComments.forEach((comment) => {
    comment.replies = getReplies(comment.id);
  });

  return topLevelComments;
}

export async function getPosts(maxNumber) {
  let limitClause = "";

  if (maxNumber) {
    limitClause = "LIMIT ?";
  }

  const stmt = db.prepare(`
    SELECT posts.id, title, content, created_at AS createdAt, first_name AS userFirstName, last_name AS userLastName, users.image_url AS userImageUrl, posts.user_id AS userId, COUNT(likes.post_id) AS likes, EXISTS(SELECT * FROM likes WHERE likes.post_id = posts.id and likes.user_id = 2) AS isLiked,
    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS commentsCount
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON posts.id = likes.post_id
    GROUP BY posts.id
    ORDER BY createdAt DESC
    ${limitClause}`);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

export async function getPostById(userId, postId) {
  const stmt = db.prepare(`
    SELECT 
      posts.id, 
      posts.title, 
      posts.content, 
      posts.created_at AS createdAt, 
      users.first_name AS userFirstName, 
      users.last_name AS userLastName,
      users.id AS userId, 
      -- Correctly count likes using a subquery
      (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS likes,
      EXISTS(SELECT 1 FROM likes WHERE likes.post_id = posts.id AND likes.user_id = ?) AS isLiked,
      json_group_array(
        json_object(
          'commentId', comments.id,
          'commentContent', comments.content,
          'commentCreatedAt', comments.created_at,
          'commentUserFirstName', commentUsers.first_name,
          'commentUserLastName', commentUsers.last_name
        )
      ) AS comments
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    LEFT JOIN users AS commentUsers ON comments.user_id = commentUsers.id
    WHERE posts.id = ?
    GROUP BY posts.id
  `);

  const post = stmt.get(userId, postId);

  if (post && post.comments) {
    post.comments = JSON.parse(post.comments);
  }
  return post;
}

export function getUserById(userId) {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(userId);
}

export async function updatePostLikeStatus(postId, userId) {
  const stmt = db.prepare(`
    SELECT COUNT(*) AS count
    FROM likes
    WHERE user_id = ? AND post_id = ?`);

  const isLiked = stmt.get(userId, postId).count === 0;

  if (isLiked) {
    const stmt = db.prepare(`
      INSERT INTO likes (user_id, post_id)
      VALUES (?, ?)`);
    await new Promise((resolve) => setTimeout(resolve, 0));
    return stmt.run(userId, postId);
  } else {
    const stmt = db.prepare(`
      DELETE FROM likes
      WHERE user_id = ? AND post_id = ?`);
    await new Promise((resolve) => setTimeout(resolve, 0));
    return stmt.run(userId, postId);
  }
}

export async function deleteComment(userId, postId, commentId) {
  const stmt = db.prepare(`
    DELETE FROM comments
     WHERE id = ? AND user_id = ? AND post_id = ?
    `);
  return stmt.run(commentId, userId, postId);
}

export async function deletePost(postId) {
  const stmt = db.prepare(`
     DELETE FROM posts
      WHERE id = ? 
    `);

  return stmt.run(postId);
}
