import { Report, ReportData } from './Report';

// Produto Concreto: relatório em formato JSON estruturado
export class JSONReport implements Report {
  getFormat(): string {
    return 'json';
  }

  generate(data: ReportData): string {
    const output = {
      format: 'json',
      title: data.title,
      recipient: data.name,
      generatedAt: new Date().toISOString(),
      fields: data.items,
    };
    return JSON.stringify(output, null, 2);
  }
}
