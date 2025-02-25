"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/lib/auth";
import {
  BookOpen,
  Mail,
  Lock,
  AlertCircle,
  GraduationCap,
  Eye,
  EyeOff,
  ArrowRight,
  Users,
  FileCheck,
  UserCog,
  Bell,
} from "lucide-react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { token, role } = await loginUser(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("role", JSON.stringify(role));

      switch (role) {
        case "teacher":
          router.push("/dashboard/teacher");
          break;
        case "hod":
          router.push("/dashboard/hod");
          break;
        case "admin":
          router.push("/dashboard/exam-controller");
          break;
        case "exam-controller":
          router.push("/dashboard/student");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 animate-gradient-slow">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
          {/* Left Section - Portal Info */}
          <div className="text-center lg:text-left lg:w-1/2 space-y-6">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="p-3 bg-primary/10 rounded-xl backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                <GraduationCap className="text-primary w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Digital Exam Portal
                </h1>
                <p className="text-base-content/70 mt-2">
                  Empowering Education Through Technology
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              {/* Main feature card */}
              <div className="card bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 mb-6">
                <div className="card-body p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <BookOpen className="text-primary w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">
                        Streamlined Exam Management
                      </h3>
                      <p className="text-base-content/70">
                        Experience seamless exam creation, management, and
                        assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2x2 Grid Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Admin Card */}
                <div className="card bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-secondary/10 rounded-xl">
                        <UserCog className="text-secondary w-5 h-5 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">
                          Admin Control
                        </h3>
                        <p className="text-base-content/70 text-sm">
                          Comprehensive system and user management.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HOD Card */}
                <div className="card bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-accent/10 rounded-xl">
                        <FileCheck className="text-accent w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Department</h3>
                        <p className="text-base-content/70 text-sm">
                          Efficient exam paper review process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teacher Card */}
                <div className="card bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-xl">
                        <Users className="text-primary w-5 h-5 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Teachers</h3>
                        <p className="text-base-content/70 text-sm">
                          Submit papers and manage grades.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Updates Card */}
                <div className="card bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <div className="card-body p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-secondary/10 rounded-xl">
                        <Bell className="text-secondary w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">Updates</h3>
                        <p className="text-base-content/70 text-sm">
                          Real-time exam notifications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Form */}
          <div className="card w-full lg:w-[450px] bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm">
            <div className="card-body p-8">
              <h2 className="text-3xl font-bold text-center mb-2">
                Welcome Back
              </h2>
              <p className="text-base-content/70 text-center text-lg mb-8">
                Sign in to your account
              </p>

              {error && (
                <div className="alert alert-error py-3 mb-6">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="text-base font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Email Address
                    </span>
                  </label>
                  <div className="relative group flex items-center gap-3">
                    <Mail className="w-5 h-5 text-base-content/50 group-hover:text-primary transition-colors duration-200" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered flex-1 h-12 text-base bg-base-100/50 focus:bg-base-100 border-2 transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label pb-2">
                    <span className="text-base font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Password
                    </span>
                  </label>
                  <div className="relative group flex items-center gap-3">
                    <Lock className="w-5 h-5 text-base-content/50 group-hover:text-primary transition-colors duration-200" />
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="input input-bordered w-full h-12 text-base bg-base-100/50 focus:bg-base-100 border-2 transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors duration-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <span className="label-text">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-primary hover:text-primary-focus hover:underline text-sm"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary w-full h-12 min-h-0 text-base ${
                    loading ? "loading" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <div className="divider my-6">New to Digital Exam Portal?</div>

              <Link
                href="/auth/register"
                className="btn btn-ghost w-full h-12 min-h-0 gap-2 hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                Create an Account <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }

        .bg-grid-black {
          background-image: linear-gradient(#000 1px, transparent 1px),
            linear-gradient(90deg, #000 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}
