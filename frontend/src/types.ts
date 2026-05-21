export interface ReportItem {
  label: string;
  value: string;
}

export interface ReportData {
  name: string;
  title: string;
  items: ReportItem[];
}

export type ReportFormat = 'pdf' | 'html' | 'json';
