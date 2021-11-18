const configFile = require('./config.js');
const config = new configFile();

const numGenerator = require('./generateNaturalNumbers.js');
const gerarNumerosNaturais = new numGenerator(config.getConfig())

const sortAlgorithm = require('./sortingAlgorithm.js')
const selecionarNumerosNaturais = new sortAlgorithm(config.getSortingConfig())



gerarNumerosNaturais.gerarNumeros();
selecionarNumerosNaturais.sortAndSelectNumbers();
