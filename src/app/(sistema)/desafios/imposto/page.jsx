'use client';
import { useState } from "react";
import CalcularImposto from "@/utils/CalcularImposto";
import { FaMoneyBillWave, FaCalculator } from "react-icons/fa";

export default function ImpostoPage() {
  const [renda, setRenda] = useState("");
  const [resultado, setResultado] = useState(null);

  // chamando a função para o valor recebido do form
  function handleCalcular(e){
    e.preventDefault();
    if(!renda) return setResultado("Insira um valor")

    const valorFormatado = renda.replace(",", ".")
    const retorno = CalcularImposto(valorFormatado)
    setResultado(retorno)

  }

  function preencherExemplo (valor){
    setRenda(valor)
    setResultado(null)
  }


  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full  py-4 flex flex-col items-center justify-center gap-2">
        <div className="bg-green-100 p-3 rounded-full text-green-600">
          <FaMoneyBillWave size={24} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Cálculo de Imposto de Renda</h1>
          <p className="text-gray-500 text-sm">Desafio 03 - Imposto de Renda</p>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl border border-gray-200">
          <form onSubmit={handleCalcular} className="space-y-4">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-2">
                Renda (R$)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Ex: 3002.00"
                value={renda}
                onChange={(e) => setRenda(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaCalculator /> Calcular Imposto
            </button>
          </form>

          {/* Valores de exemplo que tem na questão */}
          <div className="my-8">
            <p className="text-md text-gray-500 mb-2">Exemplos do desafio:</p>
            <div className="flex text-gray-500 gap-2">
              <button onClick={() => preencherExemplo("3002.00")} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">R$: 3002,00</button>
              <button onClick={() => preencherExemplo("1701.12")} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">R$: 1701,12</button>
              <button onClick={() => preencherExemplo("4520.00")} className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer">R$: 4520,00</button>
            </div>
          </div>

          <div className="mt-20">
            {resultado ? (
              <div className="text-center">
                <p className="text-gray-500 mb-2">Valor a pagar:</p>
                <span className={`text-4xl font-bold ${resultado === "Isento de imposto" ? "text-green-600" : "text-red-600"}`}>
                  {resultado}
                </span>
                {resultado !== "Isento de imposto" && (
                  <p className="text-xs text-gray-400 mt-4">Cálculo baseado nas faixas do desafio.</p>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <FaCalculator size={48} className="mx-auto mb-3 opacity-20" />
                <p>Insira um valor e clique em calcular para ver o resultado.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
