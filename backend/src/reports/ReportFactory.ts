import { Report } from './Report';
import { PDFReport } from './PDFReport';
import { HTMLReport } from './HTMLReport';
import { JSONReport } from './JSONReport';

// Creator (Factory): centraliza a lógica de instanciação
// Para adicionar um novo formato, basta criar a classe e incluir um case aqui
export class ReportFactory {
  static createReport(type: string): Report {
    switch (type.toLowerCase()) {
      case 'pdf':
        return new PDFReport();
      case 'html':
        return new HTMLReport();
      case 'json':
        return new JSONReport();
      default:
        throw new Error(`Formato não suportado: "${type}". Use: pdf, html ou json.`);
    }
  }

  static getSupportedFormats(): string[] {
    return ['pdf', 'html', 'json'];
  }
}
