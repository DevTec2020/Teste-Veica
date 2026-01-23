"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaUser, FaLock, FaArrowLeft } from "react-icons/fa";

const cadastroSchema = z.object({
  login: z.string().min(3, "O login deve ter pelo menos 3 caracteres"),
  senha: z.string().min(3, "A senha deve ter pelo menos 3 caracteres"),
  confirmarSenha: z.string()
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não conferem",
  path: ["confirmarSenha"],
});

export default function CadastroPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(cadastroSchema),
  });

  const onSubmit = async (data) => {
    try {
      setServerError("");
      
      await axios.post("/api/users", {
        login: data.login,
        senha: data.senha
      });

      setSuccess(true);

    } catch (err) {
      setServerError(`Erro ao cadastrar: ${err}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200 relative">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4 shadow-sm">
            <FaUserPlus size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Criar Novo Usuário</h1>
          <p className="text-gray-500 text-sm">Preencha os dados para registrar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Login</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input 
                {...register("login")}
                type="text"
                placeholder="Seu nome de usuário"
                className={`w-full pl-10 p-3 border text-gray-600 rounded-lg outline-none focus:ring-2 transition ${errors.login ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              />
            </div>
            {errors.login && <span className="text-xs text-red-500 mt-1">{errors.login.message}</span>}
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
                placeholder="********"
                className={`w-full pl-10 p-3 border text-gray-600 rounded-lg outline-none focus:ring-2 transition ${errors.senha ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              />
            </div>
            {errors.senha && <span className="text-xs text-red-500 mt-1">{errors.senha.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input 
                {...register("confirmarSenha")}
                type="password"
                placeholder="********"
                className={`w-full pl-10 p-3 border text-gray-600 rounded-lg outline-none focus:ring-2 transition ${errors.confirmarSenha ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500 focus:border-transparent'}`}
              />
            </div>
            {errors.confirmarSenha && <span className="text-xs text-red-500 mt-1">{errors.confirmarSenha.message}</span>}
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center mb-4">
              <strong className="font-bold">Sucesso!</strong>
              <span className="block sm:inline"> Usuário criado. Redirecionando...</span>
            </div>
          )}

          {!success && serverError && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200 text-center">
              {serverError}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? "Cadastrando..." : (
              <>
                <FaUserPlus /> Cadastrar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}