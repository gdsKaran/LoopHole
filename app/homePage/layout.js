import Navbar from "@/components/header/navbar";
import "./home.css";
export const metadata = {
  title: "Home Page",
  description: "The loop hole of infinite blogs!",
};

export default function HomeLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
