import "./auth.css";
export const metadata = {
  title: "Authentication!",
  description: "The loop hole of infinite blogs!",
};

export default function authLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
