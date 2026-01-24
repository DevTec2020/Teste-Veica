"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaLayerGroup, FaKey, FaMoneyBillWave, FaSignOutAlt, FaBars } from "react-icons/fa";
import SideBarMob from "./SideBarMob";


export default function SideBarDesk() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Usuários", href: "/usuarios", icon: FaUsers },
    { label: "Permutações", href: "/desafios/permutacao", icon: FaLayerGroup },
    { label: "Decifra", href: "/desafios/decifra", icon: FaKey },
    { label: "Imposto", href: "/desafios/imposto", icon: FaMoneyBillWave },
  ];

  return (
    <>
      {/* Sidebar visto apenas em  Desktop */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 flex-col">
        <div className="flex justify-center p-6 text-2xl font-bold text-blue-500 border-b border-gray-800">
          Desafio Veica
        </div>

        <nav className="flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded transition ${
                  isActive ? "bg-blue-500/40" : "hover:bg-gray-800"
                }`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}

          <Link href="/" className="flex items-center gap-3 p-3 text-red-400">
            <FaSignOutAlt /> Sair
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <p className="text-gray-600 text-sm">Desenvolvido por Leonardo Batista</p>
        </div>
      </aside>

      {/* Botão Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 text-white rounded-lg bg-blue-500 " 
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <FaBars className="w-6 h-6 text-3xl" />
      </button>

      {/* Sidebar Mobile */}
      <SideBarMob isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
