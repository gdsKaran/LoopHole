"use server";

import { redirect } from "next/navigation";
import { hashUserPassword, verifyPassword } from "@/components/lib/hash";
import { AddProfileDetails, createUser, getUserByEmail } from "./users";
import { createAuthSession, destroySession } from "@/components/lib/auth";
import {
  deleteComment,
  deletePost,
  storeComment,
  storePost,
  updatePostLikeStatus,
} from "@/components/lib/blogs-DB";
import { verifyAuth } from "@/components/lib/auth";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/components/lib/cloudinary";

export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const userFirstName = formData.get("userFirstName");
  const userLastName = formData.get("userLastName");
  console.log(userFirstName, userLastName);
  let errors = {};

  if (!email.includes("@")) {
    errors.email = "Please enter a valid email!";
  }

  if (password.trim().length < 8) {
    errors.password = "Password must have atleast 8 characters!";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(userFirstName, userLastName, email, hashedPassword);
    await createAuthSession(id);
    redirect("/homePage");
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email: "This email already exists!",
        },
      };
    }
    throw err;
  }
}

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Email or password entered is wrong!",
      },
    };
  }

  const isValidPass = verifyPassword(existingUser.password, password);

  if (!isValidPass) {
    return {
      errors: {
        password: "Email or password entered is wrong!",
      },
    };
  }
  await createAuthSession(existingUser.id);
  redirect("/homePage");
}

export async function storeBlogs(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const result = await verifyAuth();

  storePost({
    title,
    content,
    userId: result.user.id,
  });

  redirect("/homePage");
}

export async function storeComments(formData) {
  const content = formData.get("text");
  const postId = parseInt(formData.get("id"));
  const parentCommentId = parseInt(formData.get("parentCommentId")) || null;
  const result = await verifyAuth();

  await storeComment({
    content,
    userId: result.user.id,
    postId,
    parentCommentId,
  });

  revalidatePath("/homePage/[id]", { page: "/homePage/[id]" });
}

export async function CommentDeleteFunc(userId, postId, commentId) {
  await deleteComment(userId, postId, commentId);

  revalidatePath("/homePage/[id]", { page: "/homePage/[id]" });
}

export async function deletePostFunc(postId) {
  await deletePost(postId);
  redirect("/homePage");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}

export async function toggleLikeButtonStatus(postId) {
  let result = await verifyAuth();
  const userId = result.user.id;
  await updatePostLikeStatus(postId, userId);

  revalidatePath("/homePage/[id]", { page: "/homePage/[id]" });
}

export default async function AddProfileInfo(formData) {
  const name = formData.get("username");
  const bio = formData.get("bio");
  const email = formData.get("email");
  const profileImg = formData.get("profilePic");
  const lastImg = formData.get("lastProfilePic");

  let imageUrl = lastImg;
  if (profileImg && profileImg.size !== 0) {
    imageUrl = await uploadImage(profileImg);
  }

  AddProfileDetails(name, bio, imageUrl, email);
  revalidatePath("/profilePage");
}
