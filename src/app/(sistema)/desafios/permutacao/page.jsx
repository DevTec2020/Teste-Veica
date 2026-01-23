'use client';
import { useState } from "react";
import { permutacoesOrdenadas } from "../../../../utils/permutacoesOrdenadas";
import { FaLayerGroup, FaPlay } from "react-icons/fa";

export default function PermutacaoPage() {
  const [entrada, setEntrada] = useState("");
  const [resultado, setResultado] = useState(null);

  function handleProcessar(e) {
    e.preventDefault();
    if (!entrada) return;

    const retorno = permutacoesOrdenadas(entrada);
    setResultado(retorno);
  }

  function preencherExemplo() {
    const exemplo = `3\nab\nabc\nbca`;
    setEntrada(exemplo);
    setResultado(null);
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full  py-4 flex flex-col items-center justify-center gap-2">
        <div className="bg-purple-100 p-3 rounded-full text-purple-600">
          <FaLayerGroup size={24} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Permutações Ordenadas</h1>
          <p className="text-gray-500 text-sm">Desafio 01 - Geração Rápida de Permutações</p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl border border-gray-200 flex flex-col md:flex-row gap-8">
          
          {/* Lado Esquerdo Entrada de Permutações  */}
          <div className="flex-1">
            <form onSubmit={handleProcessar} className="space-y-4">
              <div>
                <label className="block text-md font-semibold text-gray-700 mb-2">
                  Entrada
                </label>
                <textarea
                  rows={8}
                  placeholder={`3\nab\nabc\nbca`}
                  value={entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg text-gray-900 font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Linha 1: Quantidade de strings. Linhas seguintes: As strings.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <FaPlay size={14} /> Gerar
                </button>
                <button
                  type="button"
                  onClick={preencherExemplo}
                  className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold border border-gray-300 transition cursor-pointer"
                >
                  Exemplo
                </button>
              </div>
            </form>
          </div>

          <div className="hidden md:block w-px bg-gray-200"></div>

          {/* Lado Direito Saída de Permutações */}
          <div className="flex-1 flex flex-col">
            <label className="block text-md font-semibold text-gray-700 mb-2">
              Saída de Permutações
            </label>
            <div className="flex-1 bg-gray-900 rounded-lg p-4 overflow-auto max-h-[400px] border border-gray-700 shadow-inner">
              {resultado ? (
                <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                  {resultado}
                </pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                  <FaLayerGroup size={32} className="mb-2 opacity-20" />
                   Aguardando processamento...
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}