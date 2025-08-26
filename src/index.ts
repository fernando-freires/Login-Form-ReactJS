import express from 'express';
import bodyParser from 'body-parser';
import { CodeHostUploadController } from './controllers/CodeHostUploadController';

// Inicialização simples do Express com injeção manual de dependências
const app = express();
const port = 3000;

app.use(bodyParser.json());

const uploadController = new CodeHostUploadController();

// Rota para upload que irá utilizar a funcionalidade de conversão
app.post('/upload', (req, res) => uploadController.upload(req, res));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
