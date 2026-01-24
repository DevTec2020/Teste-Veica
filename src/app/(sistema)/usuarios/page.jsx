"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaSave } from "react-icons/fa";

import { useUser} from "@/contexts/UserContext";
import CadastroPage from "../cadastro/page";


export default function UsuariosPage() {
  const { saveSession } = useUser();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 
  const [formData, setFormData] = useState({ login: "", senha: "" });

  // Carregar Usuários
  async function fetchUsers(params) {
    try {
      setLoading(true);
      const response = await axios.get("/api/users");
      
      //Verificadno se response é um Array
      if (Array.isArray(response.data)){
        setUsers(response.data);
      } else {
        setUsers([]);
      }
      
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchUsers();
  }, []);

  //Manipulação do Modal
  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({ login: user.login, senha: user.senha || "" }); 
    } else {
      setEditingUser(null);
      setFormData({ login: "", senha: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // Salvar (Criar ou Editar)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Editar (PUT)
        await axios.put(`/api/users/${editingUser.id}`, formData);
      } else {
        // Criar (POST)
        await axios.post("/api/users", formData);
      }
      fetchUsers(); 
      closeModal();
    } catch (error) {
      alert("Erro ao salvar usuário.");
    }
  };

  //Excluir
  const handleDelete = async (id) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  };

  // Filtro de busca local
  const filteredUsers = users.filter(u => 
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

      <main className="flex-1 px-4 max-w-6xl mx-auto mt-10 w-full pb-8">
        <div className="bg-white p-4 rounded-t-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
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
            onClick={() => openModal()}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow"
          >
            <FaPlus /> Novo Usuário
          </button>
        </div>

        {/* Tabela de usuários */}
        <div className="bg-white shadow-lg rounded-b-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
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
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-3">
                            {user.login.charAt(0).toUpperCase()}
                          </div>
                          <div className="text-md font-medium text-gray-900">{user.login}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.dataCadastro).toLocaleDateString('pt-BR')} <span className="text-xs ml-1">{new Date(user.dataCadastro).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button 
                          onClick={() => openModal(user)}
                          className="text-gray-400 hover:text-indigo-900 mx-2 p-2 transition cursor-pointer" title="Editar">
                          <FaEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="text-gray-400 hover:text-red-900 mx-2 p-2 transition cursor-pointer" title="Excluir">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <CadastroPage/>
        </div>
      )}
    </div>
  );
}