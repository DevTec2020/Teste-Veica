'use client';
import { useState } from "react";
import { decifraLetras } from "../../../../utils/decifraLetras";
import { FaKey, FaUnlockAlt } from "react-icons/fa";

export default function DecifraPage() {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState(null);

  function handleDecifrar(e) {
    e.preventDefault();
    if (!input) return;
    const res = decifraLetras(input);
    setResultado(res);
  }

  function preencherExemplo() {
    // Exemplo colocado no email do desafio
    const exemplo = `zcbedfghljkinmypqrutsvwxoa\nbzedzeymziluz\n\niohmunlcawygdfbqpvxzerjskt\nhaufhaimihbdqezihib`;
    setInput(exemplo);
    setResultado(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full  py-4 flex flex-col items-center justify-center gap-2">
        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
          <FaKey size={24} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Decifra a Criptografia</h1>
          <p className="text-gray-500 text-sm">Desafio 02 - Decifra</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl border border-gray-200 flex flex-col md:flex-row gap-8">
          
          {/* Lado Esquerdo Criptografia de Entrada */}
          <div className="flex-1">
            <form onSubmit={handleDecifrar} className="space-y-4">
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Entrada (Chave e Frase Criptografada)
                </label>
                <textarea
                  rows={8}
                  placeholder={`zcbedfghljkinmypqrutsvwxoa\nbzedzeymziluz`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Insira os pares: Linha 1 (Chave) e Linha 2 (Criptografia).
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md"
                >
                  <FaUnlockAlt /> Decifrar
                </button>
                <button
                  type="button"
                  onClick={preencherExemplo}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold border border-gray-300 transition"
                >
                  Exemplo
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:block w-px bg-gray-200"></div>

          {/* Lado Direito Frase Decifrada */}
          <div className="flex-1 flex flex-col">
            <label className="block text-md font-semibold text-gray-700 mb-2">
              Mensagem Descriptografada
            </label>
            <div className="flex-1 bg-gray-900 rounded-lg p-4 overflow-auto max-h-[400px] border border-gray-700 shadow-inner">
              {resultado ? (
                <pre className="text-yellow-400 font-mono text-lg whitespace-pre-wrap leading-relaxed">
                  {resultado}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                  <FaKey size={32} className="mb-2 opacity-20" />
                   Aguardando chave e frase...
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}