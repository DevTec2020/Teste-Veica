"use client";

import { useState } from "react";
import Link from "next/link";

import Wallpaper from "../../../assets/Wallpaper.png"

export default function Login() {
  
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
        style={{ backgroundImage: `url(${Wallpaper})` }} 
        >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">SysUser</h2>
        <form  className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuário</label>
            <input 
              name="user"
              type="text" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="Digite seu usuário"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
            <input 
              name="password"
              type="password" 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="min-h-[24px]">
             {/* {errorMessage && (
                <p className="text-sm text-red-600 text-center font-medium">
                  
                </p>
             )} */}
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
            
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}