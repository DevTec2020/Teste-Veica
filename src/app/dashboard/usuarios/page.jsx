export default function Usuarios({ title }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-400 px-4">
      <div className="max-w-md text-center bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h1>

        <p className="text-gray-600 mb-6">
          <p>Pagina <span className="text-red-500 font-bold">Usuarios</span> está sendo desenvolvida.</p>
          <p>Em breve estará disponível.</p>
          
        </p>

        <span className="inline-block text-sm text-gray-400">
          Desafio Veica · Desenvolvimento
        </span>
      </div>
    </main>
  );
}
