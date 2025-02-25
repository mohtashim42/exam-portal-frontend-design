"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-gradient">
        {/* Refined Grid Overlay */}
        <div className="absolute inset-0 bg-grid-black/[0.015] bg-[size:30px_30px]" />
      </div>

      {/* Improved Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-secondary/5 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-float-slowest transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <main className="flex flex-col items-center justify-center w-full max-w-4xl text-center">
          {/* Logo Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="p-4 rounded-full bg-primary/10 backdrop-blur-sm">
              <GraduationCap className="w-16 h-16 text-primary animate-float-slow" />
            </div>
          </div>

          {/* Heading with enhanced gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold animate-fade-in">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome to the Digital Exam Portal
            </span>
          </h1>

          {/* Subheading with better contrast */}
          <p className="mt-6 text-xl sm:text-2xl text-base-content/80 animate-fade-in-delayed max-w-2xl">
            Transform your examination process with our secure and efficient
            digital solution
          </p>

          {/* Improved Button Group */}
          <div className="flex flex-col sm:flex-row gap-6 mt-12 animate-fade-in-up">
            <Link href="/auth/login">
              <button className="btn btn-primary btn-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 min-w-[180px] gap-2 group bg-gradient-to-r from-primary to-primary/90">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="btn btn-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[180px] gap-2 group bg-base-100 hover:bg-base-200 text-primary border-none">
                Register
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
