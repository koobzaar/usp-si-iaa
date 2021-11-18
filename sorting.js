const {performance} = require('perf_hooks');
AlgoritmoPartiton: function particionamento(vetor, posicaoInicial, posicaoFinal){
    const valorPivo = vetor[posicaoFinal];
    let indexadorPivo = posicaoInicial; 
    for (let i = posicaoInicial; i < posicaoFinal; i++) {
        if (vetor[i] < valorPivo) {
        // Trocando elementos
        [vetor[i], vetor[indexadorPivo]] = [vetor[indexadorPivo], vetor[i]];
        indexadorPivo++;
        }
    }
    
    // Colocando o valor do pivô na posição correta
    [vetor[indexadorPivo], vetor[posicaoFinal]] = [vetor[posicaoFinal], vetor[indexadorPivo]] 
    return indexadorPivo;
};
AlgoritmoQuicksort:function quickSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const pivot = arr[Math.floor(Math.random() * arr.length)];
  
    let left = [];
    let right = [];
    let equal = [];
  
    for (let val of arr) {
      if (val < pivot) {
        left.push(val);
      } else if (val > pivot) {
        right.push(val);
      } else {
        equal.push(val);
      }
    }
    return [
      ...quickSort(left),
      ...equal,
      ...quickSort(right)
    ];
  }

// Algoritmos de seleção

AlgoritmoSelecaoPrimario: function Selecao1(vetor, posicao){
    let sortedArray = quickSort(vetor);
    
    // Retornando a enésima posição real baseado no artigo: https://www.ime.usp.br/~pf/algoritmos_para_grafos/aulas/footnotes/i-esimo.html
    return sortedArray[posicao-1];
}

AlgoritmoSelecaoSecundario: function Selecao2(vetor, posicao){
    const allEqual = arr => arr.every( v => v === arr[0] )
    if(allEqual(vetor)){
        return vetor[0];
    }
    var vetorparticionamento =  particionamento(vetor,0,vetor.length-1);
    if(vetor.length===1)
        return vetor[0];
    if(posicao<=vetorparticionamento)
        return Selecao2(vetor.slice(0,vetorparticionamento),posicao);
    else
        return Selecao2(vetor.slice(vetorparticionamento,vetor.length),posicao-vetorparticionamento);
        
}
const fs = require('fs');

processamentoNumeros: function processdata (data) {
    var converterListaParaArray = data.split("\n");
    const pattern = /\d*/;

    var resultadoConvertido = [];

    for (let i = 0; i < converterListaParaArray.length; i++) {
        var result = converterListaParaArray[i].match(pattern);
        if (result) {
            resultadoConvertido.push(parseInt(result[0]));
        }
    }
    return resultadoConvertido;
}
var currentValue = '10mi'
fs.readFile(`./seq${currentValue}.txt`,'utf8', function (err, data) {
    if (err) throw err;
    let listaNum = processdata(data);
    var start = performance.now();
    const teste1 = Selecao1(listaNum,554);
    var end = performance.now();
    var time = end - start;
    console.log(time)
    // "arraylist":sortedArray,
    //     "positionrequested":posicao,
    //     "positionreturned":sortedArray[posicao-1]
    
    let minidump = {
        "arraylist": listaNum,
      "selectedNumber":teste1,
      "timeToProcess":`${time}ms`
    }
    fs.writeFile(`./dump${currentValue}.json`, JSON.stringify(minidump), function (err) {
        if (err) throw err;
        console.log('Dump gerado');
    });

  });
// Teste do algoritmo de ordenação


