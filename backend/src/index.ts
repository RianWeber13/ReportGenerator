import express from 'express';
import cors from 'cors';
import { ReportFactory } from './reports/ReportFactory';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Retorna os formatos suportados pela factory
app.get('/formats', (_req, res) => {
  res.json({ formats: ReportFactory.getSupportedFormats() });
});

// Endpoint principal: delega a criação do relatório à ReportFactory
app.post('/generate', (req, res) => {
  const { type, data } = req.body;

  if (!type || !data) {
    return res.status(400).json({ error: 'Os campos "type" e "data" são obrigatórios.' });
  }

  try {
    const report = ReportFactory.createReport(type);
    const content = report.generate(data);
    res.json({ format: type, content });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Formatos suportados: ${ReportFactory.getSupportedFormats().join(', ')}`);
});
