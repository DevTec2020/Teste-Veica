"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLock, FaUser, FaSignInAlt, FaArrowRight } from "react-icons/fa";

const loginSchema = z.object({
  usuario: z.string().min(1, "O usuário é obrigatório"),
  senha: z.string().min(1, "A senha é obrigatória"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoginError("");

      // Chama a API 
      const response = await axios.post("/api/auth", {
        login: data.usuario,
        senha: data.senha
      });

      // Salva a sessão no LocalStorage
      localStorage.setItem("user_session", JSON.stringify(response.data.user));

      router.push("/usuarios");

    } catch (err) {
      setLoginError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-full text-white mb-4 shadow-lg shadow-blue-600/30">
            <FaSignInAlt size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Bem-vindo</h1>
          <p className="text-gray-500 text-sm mt-1">Faça login para acessar o sistema</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Usuário</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input 
                {...register("usuario")}
                type="text"
                placeholder="Ex: Veica"
                className={`w-full pl-10 p-3 border rounded-lg outline-none text-gray-500 focus:ring-2 transition ${errors.usuario ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              />
            </div>
            {errors.usuario && <span className="text-xs text-red-500 mt-1">{errors.usuario.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input 
                {...register("senha")}
                type="password"
                placeholder="Ex: 123"
                className={`w-full pl-10 p-3 border rounded-lg outline-none text-gray-500 focus:ring-2 transition ${errors.senha ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              />
            </div>
            {errors.senha && <span className="text-xs text-red-500 mt-1">{errors.senha.message}</span>}
            
            <p className="text-xs text-gray-400 mt-2 text-right">
              Dica: Use <strong>Veica</strong> / <strong>123</strong>
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded text-center animate-pulse">
              {loginError}
            </div>
          )}

          <button 
            disabled={isSubmitting}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Entrando..." : "Entrar no Sistema"}
          </button>

        </form>
      </div>
      
      <div className="fixed bottom-4 text-gray-400 text-xs">
        Desafio Técnico &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}