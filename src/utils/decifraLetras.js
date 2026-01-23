export function decifraLetras(valorInput) {
  if (!valorInput.trim()) return "Insira um valor";

  // Separei o input em linhas para pegar a quantidade e ter um controle caso seja pedido mais de uma tradução ao mesmo tempo.
  const linhas = valorInput.trim().split('\n').map(l => l.trim()).filter(l => l !== "");

  const alfabeto = "abcdefghijklmnopqrstuvwxyz";
  let fraseDecifrada = "";

  // O controle que fiz la em cima eu uso aqui. A ideia é pular de duas em duas linhas e traduzir mais de uma quando solicitado.
  for (let i = 0; i < linhas.length; i += 2) {
    const chave = linhas[i];
    const fraseCriptografada = linhas[i + 1];

    // Validação para não quebrar se um dos pares faltar a segunda linha
    if (!chave || !fraseCriptografada) continue;

    let decifrandoFrase = "";

    // Executa para cada uma das letras da frase criptografada
    for (let letra of fraseCriptografada) {
      // buscando a posição da letra na chave
      const index = chave.indexOf(letra);

      // Se achou, pega a letra correspondente ao indice na variavel alfabeto
      if (index !== -1) {
        decifrandoFrase += alfabeto[index];
      } else {
        // Se for um caractere estranho (espaço, ponto), mantém ele
        decifrandoFrase += letra;
      }
    }

    fraseDecifrada += decifrandoFrase + "\n";
  }

  return fraseDecifrada.trim();
}