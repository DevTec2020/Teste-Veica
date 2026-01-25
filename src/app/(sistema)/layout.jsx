'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";

import Sidebar from "@/components/Sidebar"
import Icone from "@/assets/ico.png"

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, loading } = useUser();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-center mb-4 animate-pulse">
            <h1 className="text-6xl text-gray-400 font-bold">
                <span className="text-blue-500">Sys</span>User
            </h1>
            <p className="text-gray-400 text-lg">Sistema Desafio Veica</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-100 flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <main className="flex-1 md:pt-0 overflow-y-auto h-screen bg-gray-100 w-full relative">
          {children}
        </main>

      </div>
    </div>
  );
}