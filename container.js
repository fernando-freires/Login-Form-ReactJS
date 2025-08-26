const sourceCodeService = require('./services/sourceCodeService');
const sourceCodeController = require('./controllers/sourceCodeController');

// Simulação simples de injeção de dependências
module.exports = {
  sourceCodeService,
  sourceCodeController
};
