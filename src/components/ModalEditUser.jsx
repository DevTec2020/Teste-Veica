"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { FaUser, FaLock, FaSave, FaTimes, FaUserPlus, FaEdit } from "react-icons/fa";


const userSchema = z.object({
  login: z.string().min(3, "O login deve ter pelo menos 3 caracteres"),
  senha: z.string().optional(),
  confirmarSenha: z.string().optional()
}).refine((data) => {
   if (data.senha) {
    return data.senha === data.confirmarSenha;
  }
  return true;
}, {
  message: "As senhas não conferem",
  path: ["confirmarSenha"],
});


export default function ModalEditUser({ onClose, onSuccess, userToEdit }) {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  // Se o userToEdit te um valor o modal abre o modo de Edição. Se recebe null é o modo de criar usuário.
  const isEditing = !!userToEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { login: "", senha: "", confirmarSenha: "" }
  });

  // É aqui que eu preencho os dados no form se recebeu valores no userToEdit
  useEffect(() => {
    if (userToEdit) {
      reset({ 
        login: userToEdit.login, 
        senha: "", 
        confirmarSenha: "" 
      });
    } else {
      reset({ login: "", senha: "", confirmarSenha: "" });
    }
  }, [userToEdit, reset]);

  async function onSubmit(data) {
    // Modo de EDIÇÂO
    try {
      setServerError("");
      setSuccess(false);

      if (isEditing) {
        const Usuario = { login: data.login };
        // Só envio a senha se foi digitada a nova
        if (data.senha) {
          Usuario.senha = data.senha;
        }
        
        await axios.put(`/api/users/${userToEdit.id}`, Usuario);

      } else {
        // Modo de Cadastro
        if (!data.senha || data.senha.length < 3) {
          setServerError("A senha é obrigatória para novos usuários.");
          return;
        }

        await axios.post("/api/users", {
          login: data.login,
          senha: data.senha
        });
      }

      setSuccess(true);

      setTimeout(() => {
        if (onSuccess) onSuccess();
        if (onClose) onClose(); 
      }, 1500);

    } catch (erro) {
      const msg = erro.response?.data?.message || "Ocorreu um erro ao processar.";
      setServerError(msg);
    }
  };


  return (
    <div className="relative bg-white p-8 rounded-xl shadow-xl w-full border border-gray-200">
      <button 
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <FaTimes size={18} />
      </button>

      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">
        {isEditing ? 
            <div className="flex flex-col items-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4 shadow-sm">
                    <FaEdit size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Editar Usuário</h1>
                <p className="text-gray-500 text-sm">Preencha os dados para editar</p>
            </div> 
        
        : 

            <div className="flex flex-col items-center mb-8">
                <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4 shadow-sm">
                    <FaUserPlus size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Criar Novo Usuário</h1>
                <p className="text-gray-500 text-sm">Preencha os dados para registrar</p>
            </div>

        }

      </h2>

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
              className={`w-full text-gray-500 pl-10 p-3 border rounded-lg outline-none focus:ring-2 transition ${errors.login ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
              placeholder="Digite o login"
            />
          </div>
          {errors.login && <span className="text-xs text-red-500 mt-1">{errors.login.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {isEditing ? "Nova Senha (Opcional)" : "Senha"}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400"/>
            </div>
            <input 
              {...register("senha")}
              type="password"
              placeholder={isEditing ? "Deixe vazio para manter a atual" : "********"}
              className="w-full  text-gray-400 pl-10 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar Senha</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400"/>
                </div>
                <input 
                    {...register("confirmarSenha")}
                    type="password"
                    placeholder="********"
                    className={`w-full text-gray-400 pl-10 p-3 border rounded-lg outline-none focus:ring-2 transition ${errors.confirmarSenha ? 'border-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
                />
            </div>
            {errors.confirmarSenha && <span className="text-xs text-red-500 mt-1">{errors.confirmarSenha.message}</span>}
        </div>

        {/* Mensagens */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
            <strong className="font-bold">Sucesso!</strong> Operação realizada.
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isSubmitting ? "Salvando..." : (
            <> <FaSave /> Salvar </>
          )}
        </button>
      </form>
    </div>
  );
}