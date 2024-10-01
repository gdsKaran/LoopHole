import Navbar from "@/components/header/navbar";

export const metadata = {
  title: "Profile Page",
  description: "The loop hole of infinite blogs!",
};

export default function ProfileLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main style={{ marginTop: "84px" }}> {children}</main>
      </body>
    </html>
  );
}
