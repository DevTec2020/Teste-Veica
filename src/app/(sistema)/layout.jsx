'use client';
import { useState } from 'react';
import SideBarDesk from '../../components/SideBarDesk';

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      <SideBarDesk 
        isOpen={isMobileMenuOpen} 
        closeMobile={() => setIsMobileMenuOpen(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Scroll Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}