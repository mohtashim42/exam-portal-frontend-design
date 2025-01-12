import "./globals.css";

export const metadata = {
  title: "Digital Exam Portal",
  description: "Manage university exams efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <div className="min-h-screen bg-base-100">{children}</div>
      </body>
    </html>
  );
}
