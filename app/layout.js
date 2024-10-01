import "./globals.css";

export const metadata = {
  title: "Loop Hole",
  description: "The loop hole of infinite blogs!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
