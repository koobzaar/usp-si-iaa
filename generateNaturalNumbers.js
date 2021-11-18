const filesystem = require('fs');
const {
    performance
} = require('perf_hooks');

class NumberGenerator {
    constructor(config) {
        this.modo = config.UsarModo;
        this.quantidade = config.UsarQuantidade;
        this.unidades = config.MaximoUnidadesGeradas;
        this.diretorio = config.UsarDiretorio;
        this.usarDump = config.UsarDump;
        this.diretorioDump = config.UsarDiretorioDump;
        this.tempoProcessamento = null;
        this.tempoPorQuantidade = [];
        this._checarConfig();
    }

    gerarNumeros() {
        switch (this.modo) {
            case 'sequential':
                this._gerarNumerosSequenciaisOrdemAleatoria();
                break;
            case 'random':
                this._gerarNumeroAleatorio();
                break;

        }
    }

    _gerarNumeroAleatorio() {
        let contadorPerformanceStart = performance.now();
        for (let quantidadeNumerosGerar = 0; quantidadeNumerosGerar < this.quantidade.length; quantidadeNumerosGerar++) {
            let vetorNumeros = [], performanceStart = performance.now();
            for (let currentNumber = 0; currentNumber < this.quantidade[quantidadeNumerosGerar]; currentNumber++) {
                let randomNaturalNumber = Math.floor(Math.random() * (Math.pow(10, this.unidades)));
                vetorNumeros.push(randomNaturalNumber);
            }
            let performanceEnd = performance.now();
            this.tempoPorQuantidade.push(`${this.quantidade[quantidadeNumerosGerar]}: ${performanceEnd - performanceStart}ms`);
            this._embaralharVetor(vetorNumeros);
            this._salvarNumeros(this._stringifyVetor(vetorNumeros), this.quantidade[quantidadeNumerosGerar]);
        }
        let contadorPerformanceEnd = performance.now();
        this.tempoProcessamento = contadorPerformanceEnd - contadorPerformanceStart;
        this._gerarDump();

    }

    _gerarNumerosSequenciaisOrdemAleatoria() {
        let contadorPerformanceStart = performance.now();
        for (let quantidadeNumerosGerar = 0; quantidadeNumerosGerar < this.quantidade.length; quantidadeNumerosGerar++) {
            let vetorNumeros = [], performanceStart = performance.now();
            for (let currentNumber = 0; currentNumber < this.quantidade[quantidadeNumerosGerar]; currentNumber++) {
                vetorNumeros.push(currentNumber);
            }
            let performanceEnd = performance.now();
            this.tempoPorQuantidade.push(`${this.quantidade[quantidadeNumerosGerar]}: ${performanceEnd - performanceStart}ms`);
            this._embaralharVetor(vetorNumeros);
            this._salvarNumeros(this._stringifyVetor(vetorNumeros), this.quantidade[quantidadeNumerosGerar]);
        }
        let contadorPerformanceEnd = performance.now();
        this.tempoProcessamento = contadorPerformanceEnd - contadorPerformanceStart;
        this._gerarDump();
    }

    _salvarNumeros(vetor, quantidadeGerada) {
        let caminho = `${this.diretorio}/${this.modo}${quantidadeGerada}.txt`;
        filesystem.writeFile(caminho, vetor, (erro) => {
            if (erro) throw new Error(erro);
            else console.log(`[GERADOR] Arquivo ${caminho} gerado com sucesso.`);
        });
    }

    _embaralharVetor(vetor) {
        for (let i = vetor.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [vetor[i], vetor[j]] = [vetor[j], vetor[i]];
        }
        return vetor;
    }

    _stringifyVetor(data) {
        console.log(data)
        var datastring = "";
        for (var i = 0; i < data.length; i++) {
            datastring += data[i] + "\n";
        };
        return datastring;
    }
    _checarConfig() {
        if (this.modo !== 'sequential' && this.modo !== 'random')
            throw new Error('[CONFIG] Parâmetro config deve ser valor válido.');
        if (Array.isArray(this.quantidade) === false)
            throw new Error('[CONFIG] Parâmetro quantidade deve ser um vetor.');
        if (this.quantidade.some(isNaN) === true)
            throw new Error('[CONFIG] Parâmetro quantidade deve ser um vetor de números.');
        if (this.modo === 'random') {
            if (typeof this.unidades !== 'number' || this.unidades instanceof Number)
                throw new Error('[CONFIG] Parâmetro unidade deve ser um vetor de números.');
            else if (this.unidades < 0)
                throw new Error("[CONFIG] Parâmetro unidade é um número negativo. Unidades menores que zero não são permitidas.");
            else if (this.unidades % 1 !== 0)
                throw new Error("[CONFIG] Parâmetro unidade é um número decimal. Números decimais não são permitidos.");
        }
    }

    _gerarDump() {
        if (this.usarDump === true) {
            const modeloDump = {
                modo: this.modo,
                quantidade: this.quantidade,
                diretorio: this.diretorio,
                modoProcessamento: this.modoProcessamento,
                tempoProcessamento: `${this.tempoProcessamento}ms`,
                tempoParaGerarCadaQuantidade: this.tempoPorQuantidade
            }
            filesystem.writeFileSync(`${this.diretorioDump}/dump_${this.modo}.json`, JSON.stringify(modeloDump), (erro) => {
                if (erro) throw new Error(erro);
                else console.log(`[GERADOR] Arquivo de Dump gerado com sucesso.`);
            });
        }
    }

}
module.exports = NumberGenerator;