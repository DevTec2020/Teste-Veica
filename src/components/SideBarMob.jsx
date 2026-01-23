"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUsers, FaLayerGroup, FaKey, FaMoneyBillWave, FaSignOutAlt, FaBars } from "react-icons/fa";

export default function SideBarMob({ isOpen, onClose }) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Cadastrar", href: "/cadastro", icon: FaUsers },
    { label: "Usuários", href: "/usuarios", icon: FaUsers },
    { label: "Permutações", href: "/desafios/permutacao", icon: FaLayerGroup },
    { label: "Decifra", href: "/desafios/decifra", icon: FaKey },
    { label: "Imposto", href: "/desafios/imposto", icon: FaMoneyBillWave },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/50 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed flex flex-col top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-center p-4 border-b border-gray-800">
          <span className="text-xl text-blue-500 font-bold">
            Desafio Veica
          </span>
        </div>

        <nav className="flex-1 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 p-3 rounded transition ${
                  isActive ? "bg-blue-500/40" : "hover:bg-gray-800"
                }`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}

          <Link href="/" onClick={onClose} className="flex items-center gap-3 p-3 text-red-400">
            <FaSignOutAlt /> Sair
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <p className="text-gray-600 text-sm">Desenvolvido por Leonardo Batista</p>
        </div>

      </aside>
    </>
  );
}
