class Config {
    constructor() {
        this.numberGeneratorConfig = {

            // Define o modo de gerar os números. Os valores possíveis são:
            // - random: gera números aleatórios
            // - sequential: gera números sequenciais e os coloca em posições aleatórias
            UsarModo: 'sequential',


            // Apenas para quando o modo selecionado for 'random'. Define o máximo de unidades para os números gerados.
            // Definido por:
            // MaximoUnidadesGeradas (n): 10^n
            MaximoUnidadesGeradas: 3,


            // Define a quantidade de números e quantos arquivos a serem gerados.
            // [50000, 10000, n...]
            // Caso seja definido [50000, 100000], gerará 50 mil números e nomeia o arquivo como [modo]50000.txt
            // depois gerará mais 100000 números com o nome [modo]100000.txt/

            UsarQuantidade: [50000, 100000, 500000, 1000000, 5000000, 10000000],


            // Define onde os arquivos serão salvos.
            UsarDiretorio: './num',

            /*
            Gerar um dump após a geração dos arquivos com o tempo demorado para gera-los (em milissegundos), modo, quantidade e diretório.
            Usado principalmente para benchmarking.
            */
            UsarDump: true,
            UsarDiretorioDump: './dump_generator',

            // Define a codificação dos arquivos gerados.
            UsarCodificacao: 'utf8'
        }
        this.sortingAlgorithmConfig = {
            // Define o método de seleção. Os valores possíveis são:
            // - selecaoUm: método de seleção do quickselect
            // - selecaoDois: método de seleção previamente solicitado, definido por:
            // i<q = (A[1:q-1],i)
            // i>q = (A[q+1:n],i-(q+1))
            UsarMetodoSelecao: 'selecaoDois',

            /*
            Gerar um dump após a geração dos arquivos com o tempo demorado para gera-los (em milissegundos), método e diretório.
            Usado principalmente para benchmarking.
            */
            UsarDump: true,
            UsarDiretorioDump: './dump_sortener',

            // Após organizar o vetor, define qual posição deve ser retornada.
            UsarPosicao: 443
        }
        
    }
    getConfig() {
        return this.numberGeneratorConfig;
    }
    getSortingConfig(){
        return {
            numberGeneratorConfig:this.numberGeneratorConfig,
            sortingAlgorithmConfig: this.sortingAlgorithmConfig
        }
    }
}
module.exports = Config;