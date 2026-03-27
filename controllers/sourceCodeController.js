const sourceCodeService = require('../services/sourceCodeService');

exports.handleSubmission = async (req, res, next) => {
  try {
    const { OriginalCode } = req.body;
    const file = req.file; // Receives file from multer

    // Valida a entrada de código-fonte
    sourceCodeService.validateSubmission(OriginalCode, file);

    // Aqui pode ser chamada a lógica para salvar o código no BD
    // Por simplicidade, retornamos uma resposta de sucesso
    res.status(200).json({ message: 'Código-fonte submetido com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
