import { Report, ReportData } from './Report';

// Produto Concreto: relatório em formato PDF (simulado como texto estruturado)
export class PDFReport implements Report {
  getFormat(): string {
    return 'pdf';
  }

  generate(data: ReportData): string {
    const separator = '='.repeat(40);
    const items = data.items
      .map((i) => `  • ${i.label}: ${i.value}`)
      .join('\n');

    return [
      separator,
      `  RELATÓRIO PDF`,
      separator,
      `  Título:      ${data.title}`,
      `  Destinatário: ${data.name}`,
      `  Gerado em:   ${new Date().toLocaleString('pt-BR')}`,
      separator,
      items,
      separator,
    ].join('\n');
  }
}
