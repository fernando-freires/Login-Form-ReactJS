exports.validateSubmission = (originalCode, file) => {
  // Verifica se não foi fornecido nenhum código
  if ((!originalCode || originalCode.trim() === '') && !file) {
    throw new Error('Deve ser fornecido ao menos uma forma de código-fonte.');
  }

  // Verifica se ambos os campos foram preenchidos simultaneamente
  if (originalCode && originalCode.trim() !== '' && file) {
    throw new Error('Não podem coexistir código em texto e arquivo.');
  }

  // Se um arquivo for fornecido, verifica se ele não está vazio
  if (file) {
    // O objeto do arquivo usando memoryStorage possui a propriedade buffer
    if (!file.buffer || file.buffer.length === 0) {
      throw new Error('O arquivo não pode estar vazio.');
    }
  }

  return true;
};
