"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import ModalEditUser from "@/components/ModalEditUser";

export default function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 

  // Carregar Usuários da API
  async function fetchUsers() {
    try {
      setLoading(true);
      const response = await axios.get("/api/users");

      // Eu preciso de um array no retorno para da certo mesmo se der erro na busca 
      if (Array.isArray(response.data)){
        setUsers(response.data);
      } else {
        setUsers([]);
      }

    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      setUsers([]);
      
    } finally {
      setLoading(false);
    }
  }

  // chamando a função de busca ao carregar a tela
  useEffect(() => {
    fetchUsers();
  }, []);


  // Trabalhando com o modal e enviando os dados 
  const openModal = (user = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSuccessFromModal = () => {
    fetchUsers(); 
  };

  async function handleDelete(id){
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        alert("Usuário excluído.");
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir usuário.");
      }
    }
  };

  const filteredUsers = users.filter((u) => 
    u.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full  py-4 flex flex-col items-center justify-center gap-2">
        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
          <FaUsers size={24} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Usuários</h1>
          <p className="text-gray-500 text-sm">Listagem, cadastro e manutenção</p>
        </div>
      </header>

      <main className="flex-1 px-4 max-w-7xl mx-auto mt-8 w-full pb-8">
        <div className="bg-white p-4 rounded-t-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar usuário..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-700"
            />
          </div>
          
          <button 
            onClick={() => openModal(null)}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow cursor-pointer"
          >
            <FaPlus /> Novo Usuário
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-b-xl overflow-hidden border-x border-b border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-1 whitespace-nowrap">Id</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Login</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Data Cadastro</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">Carregando usuários...</td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-gray-500">Nenhum usuário encontrado.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-md font-medium text-gray-500">{user.id}</div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* Login do usuário na tabela */}
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-3">
                            {user.login?.charAt(0).toUpperCase()}
                          </div>
                          <div className="text-md font-medium text-gray-500">{user.login}</div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.dataCadastro ? new Date(user.dataCadastro).toLocaleDateString('pt-BR') : '-'}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button 
                          onClick={() => openModal(user)}
                          className="text-gray-500 hover:text-gray-700 mx-2 p-2 cursor-pointer" 
                          title="Editar"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="text-gray-500 hover:text-gray-700 mx-2 p-2 cursor-pointer" 
                          title="Excluir"
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
             className="w-full max-w-md"
             onClick={(e) => e.stopPropagation()}
          >
            <ModalEditUser 
                userToEdit={editingUser} 
                onClose={closeModal} 
                onSuccess={handleSuccessFromModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}