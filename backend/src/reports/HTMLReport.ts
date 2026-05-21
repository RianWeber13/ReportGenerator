import { Report, ReportData } from './Report';

// Produto Concreto: relatório em formato HTML
export class HTMLReport implements Report {
  getFormat(): string {
    return 'html';
  }

  generate(data: ReportData): string {
    const rows = data.items
      .map(
        (i) =>
          `        <tr><td><strong>${i.label}</strong></td><td>${i.value}</td></tr>`
      )
      .join('\n');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>${data.title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 700px; margin: 2rem auto; color: #333; }
    h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 0.5rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th { background: #3498db; color: white; padding: 0.5rem 1rem; text-align: left; }
    td { padding: 0.5rem 1rem; border-bottom: 1px solid #eee; }
    tr:nth-child(even) { background: #f9f9f9; }
    .meta { color: #7f8c8d; font-size: 0.9rem; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>${data.title}</h1>
  <p class="meta">Destinatário: <strong>${data.name}</strong> &nbsp;|&nbsp; Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
  <table>
    <thead><tr><th>Campo</th><th>Valor</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>
</body>
</html>`;
  }
}
