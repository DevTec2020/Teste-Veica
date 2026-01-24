"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaLayerGroup, FaKey, FaMoneyBillWave, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

import { useUser} from "@/contexts/UserContext";

const menuItems = [
    { label: "Usuários", href: "/usuarios", icon: FaUsers },
    { label: "Permutações", href: "/desafios/permutacao", icon: FaLayerGroup },
    { label: "Decifra", href: "/desafios/decifra", icon: FaKey },
    { label: "Imposto", href: "/desafios/imposto", icon: FaMoneyBillWave },
];

export default function Sidebar() {
    const { logout } = useUser();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

  function isActive(path) {
    if (pathname === path) {
      return true; 
    } else {
      return false; 
    }
  }


  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all active:scale-95"
        aria-label="Menu"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeMenu}
        />
      )}

      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out shadow-2xl
          md:translate-x-0 md:static md:inset-auto md:shadow-none md:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col h-screen
        `}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-800">
            <div className="text-center">
                <h1 className="text-4xl text-white font-bold">
                    <span className="text-blue-500">Sys</span>User
                </h1>
                <p className="text-gray-400 text-sm">Sistema Desafio Veica</p>
            </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase">Módulos</p>

          {menuItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800"
                }`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 bg-gray-900 shrink-0">
            <button 
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                onClick={logout}>
                <FaSignOutAlt /> <span className="font-medium">Sair</span>
            </button>
        </div>
      </aside>
    </>
  );
}