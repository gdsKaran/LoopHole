import Navbar from "@/components/header/navbar";

export const metadata = {
  title: "Search Page",
  description: "The loop hole of infinite blogs!",
};

export default function SearchLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
