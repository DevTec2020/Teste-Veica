'use client';
import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({ children }) {
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