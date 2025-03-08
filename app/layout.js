import "./globals.css";

export const metadata = {
  title: "Digital Exam Portal",
  description: "Manage university exams efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body>
        <div className="min-h-screen bg-base-100 overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
