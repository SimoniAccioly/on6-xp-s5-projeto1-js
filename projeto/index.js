console.log("--------------------------------------");
console.log("     Projeto Carrinho de Compras     ");
console.log("--------------------------------------");

const db = require("./database");

const readline = require("readline-sync");
const { produtos } = require("./database");

console.table(produtos);

//- Listar no console uma tabela contendo os produtos em ordem crescente de preço (do menor ao maior). Utilize a lista contida no arquivo `database.js`

function ordenaPrecos(a, b) {
  return a.preco - b.preco;
}
produtos.sort(ordenaPrecos);

console.table(produtos);

function buscarProduto(idProduto) {
  const produto = produtos.find(function (item) {
    return item.id === idProduto;
  });

  return produto;
}

//   console.log(buscarProduto(idProduto));

// Calcular o valor do subtotal (sem considerar o desconto)

function subtotal(precoProduto, quantidade) {

  const valorSubTotal = quantidade * precoProduto;

  return valorSubTotal;
}


function aplicarDesconto(valorSubTotal) {
    let desconto = 0;

  if (cupomDesconto >= 1 && cupomDesconto <= 15) {
    desconto = valorSubTotal / cupomDesconto;
  }
  
  return desconto;
}

// console.log(desconto());

//- Calcular o valor total (considerando o desconto do cupom)

function valorTotal() {

  valorSubTotal = subtotal(idProduto, quantidade);

  const valorDesconto = valorSubTotal - valorSubTotal / cupomDesconto;
  if (cupomDesconto >= 1 && cupomDesconto <= 15) {
    return `O total do seu carrinho é R$${valorDesconto.toFixed(2)}`;
  } else {
    return `O total do seu carrinho é R$${valorSubTotal.toFixed(2)}`;
  }
}

// console.log(valorTotal());




let idProduto = 0, quantidade = 0, adicionarMaisProdutos = true, notaFiscal = [];

do
{
    //- Receber via terminal as entradas de `id` e `quantidade` dos produtos a serem adquiridos.
    
    idProduto = parseInt(readline.question("Digite o Id do produto desejado: "))
    quantidade = parseInt(readline.question("Digite a quantidade de produtos desejado: "))

    const produto = buscarProduto(idProduto);

    if(produto !== undefined && produto !== null)
    {
        notaFiscal.push({"produto":produto.nome, "valorUnitario": produto.preco, "quantidade": quantidade,"valorTotal":subtotal(produto.preco, quantidade)});
    }
    else{
        console.log(`O id do produto não é válido.`)
    }
    
    const continuar = readline.question("Deseja adicionar mais produtos (S/N)?");
    adicionarMaisProdutos = continuar.toLocaleLowerCase() === "n" ? false : true;
}
while(adicionarMaisProdutos)

//- Perguntar se a cliente possue cupom de desconto. Caso a cliente digite 10, significa que terá 10% de desconto.

let cupomDesconto = parseInt(readline.question("Possui copom de desconto? Digite aqui "));
cupomDesconto = isNaN(cupomDesconto) ? 0 : cupomDesconto;

const valorSubTotal = notaFiscal.reduce(function(total, item){
    return total + item.valorTotal;
}, 0);


const valorDoDesconto = parseInt(aplicarDesconto(valorSubTotal));

valorTotal = valorSubTotal - valorDoDesconto;
  
const dataCompra = new Date();

console.table(notaFiscal);


console.log(`Valor sem desconto: R$${valorSubTotal.toFixed(2)}`)
console.log(`Total de desconto: R$${valorDoDesconto.toFixed(2)} (${cupomDesconto}%)`)
console.log(`Valor total: R$${valorTotal.toFixed(2)}`)
console.log(`Compra realizada em R$${dataCompra.toLocaleString("pt-br")}`)