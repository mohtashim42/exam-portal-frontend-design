import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation({ userRole }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Digital Exam Portal
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {userRole === "teacher" && (
            <li>
              <Link href="/dashboard/teacher">Dashboard</Link>
            </li>
          )}
          {userRole === "hod" && (
            <li>
              <Link href="/dashboard/hod">Dashboard</Link>
            </li>
          )}
          {userRole === "exam-controller" && (
            <li>
              <Link href="/dashboard/exam-controller">Dashboard</Link>
            </li>
          )}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
