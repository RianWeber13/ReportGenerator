export interface ReportItem {
  label: string;
  value: string;
}

export interface ReportData {
  name: string;
  title: string;
  items: ReportItem[];
}

// Interface do Produto — define o contrato que todos os relatórios devem seguir
export interface Report {
  generate(data: ReportData): string;
  getFormat(): string;
}
