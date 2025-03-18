import './globals.css';  // Import global styles

export const metadata = {
  title: "Rollin in Dough - Cookie Ordering",
  description: "Order your favorite cookies with ease!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-pink-100 text-blue-800">
        {children}
      </body>
    </html>
  );
}