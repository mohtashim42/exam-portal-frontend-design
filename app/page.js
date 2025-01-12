import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to the Digital Exam Portal
        </h1>
        <p className="mt-3 text-2xl">
          Manage your exams efficiently and securely
        </p>
        <div className="flex mt-6">
          <Link href="/auth/login" passHref>
            <button className="mr-4 btn ">Login</button>
          </Link>
          <Link href="/auth/register" passHref>
            <button className="btn btn-neutral">Register</button>
          </Link>
        </div>
      </main>
    </div>
  );
}
