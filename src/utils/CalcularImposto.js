const TABELA_IR = [
    {limite: 4500.00, aliquota: 0.28},
    {limite: 3000.00, aliquota: 0.18},
    {limite: 2000.00, aliquota: 0.08},
]

export default function CalcularImposto(ValorInput){
    let renda = parseFloat(ValorInput);
    let imposTotal = 0;


    if (renda <= 2000.00) return "Isento de imposto"


    for(const faixa of TABELA_IR){
        if (renda > faixa.limite) {
            const diferenca = renda - faixa.limite
            const impostoFaixa = diferenca * faixa.aliquota
            
            imposTotal += impostoFaixa

            // Reduzindo a renda para o teto da próxima faixa
            renda = faixa.limite
        }
    }

    // Retornando o valor a ser pago
    return `R$:${imposTotal.toFixed(2)}`
}

