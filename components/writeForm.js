import { verifyAuth } from "@/components/lib/auth";
import { redirect } from "next/navigation";
import "./writeform.css";

import { storeBlogs } from "@/actions/auth";
export default async function WriteForm() {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/Authenticate");
  }
  return (
    <>
      <form action={storeBlogs}>
        <div className="container">
          <textarea name="title" className="textarea-1" placeholder="Title" />
          <textarea
            name="content"
            className="textarea-2"
            placeholder="Tell your story..."
          />
          <button type="submit" className="button">
            Publish
          </button>
        </div>
      </form>
    </>
  );
}
