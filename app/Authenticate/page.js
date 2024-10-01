import AuthForm from "@/components/auth-form";
import "./auth.css";
export default async function LoginPage({ searchParams }) {
  const formMode = searchParams.mode || "login";

  return <AuthForm mode={formMode} />;
}
