"use client";


export default function Usuarios({ title }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-400 px-4">
      <div className="max-w-md text-center bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h1>

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
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer">
            
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
