const fileSystem = require('fs');
const {
    performance
} = require('perf_hooks');
class sortingAlgorithm {
    constructor(config) {
        console.log(config)
        this.selecao = config.sortingAlgorithmConfig.UsarMetodoSelecao;
        this.usarDump = config.sortingAlgorithmConfig.UsarDump;
        this.diretorioDump = config.sortingAlgorithmConfig.UsarDiretorioDump;
        this.modoUsadoNaGeracao = config.numberGeneratorConfig.UsarModo;
        this.quantidadeUsadaNaGeracao = config.numberGeneratorConfig.UsarQuantidade;
        this.diretorioUsadoNaGeracao = config.numberGeneratorConfig.UsarDiretorio;
        this.codificacaoUsadaNaGeracao = config.numberGeneratorConfig.UsarCodificacao;
        this.numeroRetornadoDaSelecao = [];
        this.tempoAlgoritmo = [];
        this.REGEXPatternConversao = /\d*/;
        this.posicaoParaSelecionarPosSorting = config.sortingAlgorithmConfig.UsarPosicao;
        
    }
    sortAndSelectNumbers() {
        for (let quantidadeAtual = 0; quantidadeAtual < this.quantidadeUsadaNaGeracao.length; quantidadeAtual++) {
            fileSystem.readFile(`${this.diretorioUsadoNaGeracao}/${this.modoUsadoNaGeracao}${this.quantidadeUsadaNaGeracao[quantidadeAtual]}.txt`, this.codificacaoUsadaNaGeracao, (erro, dados) => {
                console.log(`Atualmente lendo ${this.diretorioUsadoNaGeracao}/${this.modoUsadoNaGeracao}${this.quantidadeUsadaNaGeracao[quantidadeAtual]}.txt`)
                if (erro) throw erro;
                let listaNumeros = this._processarDadosDeArquivo(dados);
                var performanceStart, performanceEnd;
                if (this.selecao === 'selecaoUm') {
                    performanceStart = performance.now();
                    this.numeroRetornadoDaSelecao.push(this._selecaoUm(listaNumeros, this.posicaoParaSelecionarPosSorting));
                    performanceEnd = performance.now();
                    this.tempoAlgoritmo.push(`${this.quantidadeUsadaNaGeracao[quantidadeAtual]}: ${performanceEnd - performanceStart}`);
                } else if (this.selecao === 'selecaoDois') {
                    performanceStart = performance.now();
                    this.numeroRetornadoDaSelecao.push(this._selecaoDois(listaNumeros, this.posicaoParaSelecionarPosSorting));
                    performanceEnd = performance.now();
                    this.tempoAlgoritmo.push(`${this.quantidadeUsadaNaGeracao[quantidadeAtual]}: ${performanceEnd - performanceStart}`);
                }
                const dumpFile = {
                    selecao: this.selecao,
                    modoUsadoNaGeracao: this.modoUsadoNaGeracao,
                    codificacaoUsadaNaGeracao: this.codificacaoUsadaNaGeracao,
                    diretorioUsadoNaGeracao: this.diretorioUsadoNaGeracao,
                    posicaoParaSelecao: this.posicaoParaSelecao,
                    numeroRetornadoDaSelecao: this.numeroRetornadoDaSelecao,
                    tempoAlgoritmo: this.tempoAlgoritmo,
                }
                this._salvarDump(dumpFile);
            });
            
        }
      
    }
    quickSort(vetor) {
        if (vetor.length < 2) {
            return vetor;
        }
        const pivo = vetor[Math.floor(Math.random() * vetor.length)];

        let left = [];
        let right = [];
        let equal = [];

        for (let val of vetor) {
            if (val < pivo) {
                left.push(val);
            } else if (val > pivo) {
                right.push(val);
            } else {
                equal.push(val);
            }
        }
        return [
            ...this.quickSort(left),
            ...equal,
            ...this.quickSort(right)
        ];
    }
    _processarDadosDeArquivo(arquivo) {
        let converterListaParaArray = arquivo.split("\n"),
            resultadoConvertido = [];
        for (let i = 0; i < converterListaParaArray.length; i++) {
            var result = converterListaParaArray[i].match(this.REGEXPatternConversao);
            if (result) {
                try {
                    resultadoConvertido.push(parseInt(result[0]));
                } catch (error) {
                    console.log(error);
                }

            }
        }
        return resultadoConvertido;

    }


    algoritmoParticionar(vetor, posicaoInicial, posicaoFinal) {
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

    _selecaoUm(vetor, posicao) {
        let sortedArray = this.quickSort(vetor);

        // Retornando a enésima posição a rigor baseado no artigo: https://www.ime.usp.br/~pf/algoritmos_para_grafos/aulas/footnotes/i-esimo.html
        return sortedArray[posicao - 1];
    }

    _selecaoDois(vetor, posicao) {
        const allEqual = arr => arr.every(v => v === arr[0])
        if (allEqual(vetor)) {
            return vetor[0];
        }
        var vetorparticionamento = this.algoritmoParticionar(vetor, 0, vetor.length - 1);
        if (vetor.length === 1)
            return vetor[0];
        if (posicao <= vetorparticionamento)
            return this._selecaoDois(vetor.slice(0, vetorparticionamento), posicao);
        else
            return this._selecaoDois(vetor.slice(vetorparticionamento, vetor.length), posicao - vetorparticionamento);

    }
    _salvarDump(dados) {
        if (this.usarDump === true) {
            fileSystem.writeFile(`${this.diretorioDump}/dump_${this.selecao}_${this.modoUsadoNaGeracao}.json`, JSON.stringify(dados), (erro) => {
                if (erro) throw new Error(erro);
                console.log(`[ORGANIZADOR] Arquivo de Dump gerado com sucesso.`);
            });
        }
    }
}
module.exports = sortingAlgorithm;