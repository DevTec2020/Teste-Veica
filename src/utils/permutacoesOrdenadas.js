function permutarValor(linha) {
  const letras = linha.split('').sort();
  const resultados = [];
  const letrasUsadas = new Array(letras.length).fill(false);

  function geraPermutacao(permutacaoAtual) {
    if (permutacaoAtual.length === letras.length) {
      resultados.push(permutacaoAtual);
      return;
    }

    for (let i = 0; i < letras.length; i++) {
      // Se já usou essa letra na permutacaoAtua, pula
      if (letrasUsadas[i]) continue;

      // Testa se a letra atual é igual a anterior e se já NÃO foi usada,
      if (i > 0 && letras[i] === letras[i - 1] && !letrasUsadas[i - 1]) continue;

      letrasUsadas[i] = true;
      geraPermutacao(permutacaoAtual + letras[i]);
      letrasUsadas[i] = false; // Desmarcando para usar em outra combinação
    }
  }

  geraPermutacao("");
  return resultados;
}

export function permutacoesOrdenadas(valorInput) {
  if (!valorInput.trim()) return "";

  // Separei o input em linhas para pegar a quantidade e ter um controle maior como no outro desafio.
  const linhas = valorInput.trim().split('\n').map(l => l.trim()).filter(l => l !== "");
  
  // Pegando a primeira linha que tem a quantidade de strings
  const qtdEntrada = parseInt(linhas[0]);
  
  if (isNaN(qtdEntrada)) return "A primeira linha deve ser um número.";

  let outputFinal = "";

  for (let i = 1; i <= qtdEntrada; i++) {
    if (linhas[i]) {
      const permutacoes = permutarValor(linhas[i]);
      
      outputFinal += permutacoes.join('\n');
      
      outputFinal += "\n\n"; 
    }
  }

  return outputFinal.trim();
}