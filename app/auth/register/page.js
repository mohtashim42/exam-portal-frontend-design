"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Building2,
  GraduationCap,
  UserCircle,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, department }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/login");
      } else {
        setError(data.msg || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 animate-gradient-slow">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 max-w-5xl mx-auto">
          {/* Left Section - Portal Info */}
          <div className="text-center lg:text-left lg:w-2/5 space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-xl backdrop-blur-sm">
                <GraduationCap className="text-primary w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Digital Exam Portal
                </h1>
                <p className="text-base-content/70 mt-1">
                  Join Our Academic Community
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="card bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm">
                <div className="card-body p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <UserCircle className="text-primary w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        Welcome to Our Platform
                      </h3>
                      <p className="text-base-content/70 text-sm">
                        Create your account to access our comprehensive digital
                        exam management system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="card w-full lg:w-3/5 bg-base-100/50 shadow-xl border border-base-200 backdrop-blur-sm">
            <div className="card-body p-6">
              <h2 className="text-2xl font-bold text-center mb-1">
                Create Account
              </h2>
              <p className="text-base-content/70 text-center text-sm mb-6">
                Sign up to get started
              </p>

              {error && (
                <div className="alert alert-error py-2 mb-4 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Full Name
                      </span>
                    </label>
                    <div className="relative group flex items-center gap-2">
                      <User className="w-4 h-4 text-base-content/50 group-hover:text-primary transition-colors duration-200" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="input input-bordered flex-1 h-10 text-sm bg-base-100/50 focus:bg-base-100 border-2 transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Email Address
                      </span>
                    </label>
                    <div className="relative group flex items-center gap-2">
                      <Mail className="w-4 h-4 text-base-content/50 group-hover:text-primary transition-colors duration-200" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered flex-1 h-10 text-sm bg-base-100/50 focus:bg-base-100 border-2 transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Password
                      </span>
                    </label>
                    <div className="relative group flex items-center gap-2">
                      <Lock className="w-4 h-4 text-base-content/50 group-hover:text-primary transition-colors duration-200" />
                      <input
                        type="password"
                        placeholder="Create a password"
                        className="input input-bordered flex-1 h-10 text-sm bg-base-100/50 focus:bg-base-100 border-2 transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Role
                      </span>
                    </label>
                    <div className="relative group flex items-center gap-2">
                      <UserCircle className="w-4 h-4 text-base-content/50 group-hover:text-primary transition-colors duration-200" />
                      <select
                        className="select select-bordered flex-1 h-10 text-sm bg-base-100/50 focus:bg-base-100 border-2 transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="hod">HOD</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-control md:col-span-2">
                    <label className="label pb-1">
                      <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Department
                      </span>
                    </label>
                    <div className="relative group flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-base-content/50 group-hover:text-primary transition-colors duration-200" />
                      <input
                        type="text"
                        placeholder="Enter your department"
                        className="input input-bordered flex-1 h-10 text-sm bg-base-100/50 focus:bg-base-100 border-2 transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className={`btn btn-primary w-full h-10 min-h-0 text-sm ${
                      loading ? "loading" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>

              <div className="divider my-4 text-sm">
                Already have an account?
              </div>

              <Link
                href="/auth/login"
                className="btn btn-ghost w-full h-10 min-h-0 gap-2 text-sm hover:bg-primary hover:text-primary-content transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
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
      `}</style>
    </div>
  );
}
