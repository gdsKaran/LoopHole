import { verifyAuth } from "@/components/lib/auth";
import "./profile.css";
import ProfileDisplay from "@/components/profile/profileDisplay";
import { getUserById } from "@/components/lib/blogs-DB";

export default async function ProfilePage() {
  const result = await verifyAuth();
  const userId = result.user.id;
  const result2 = await getUserById(userId);
  const email = result2.email;

  return (
    <>
      <ProfileDisplay email={email} userInfo={result2} />
    </>
  );
}
