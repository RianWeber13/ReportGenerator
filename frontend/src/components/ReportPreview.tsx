import React from 'react';
import { ReportData, ReportFormat } from '../types';
import PDFPreviewer from './PDFPreviewer';
import HTMLPreviewer from './HTMLPreviewer';
import JSONPreviewer from './JSONPreviewer';

interface Props {
  type: ReportFormat;
  data: ReportData;
  content: string;
}

// Simple Factory no front-end: decide qual componente de preview renderizar
const ReportPreview: React.FC<Props> = ({ type, data, content }) => {
  if (!content) {
    return (
      <div className="preview-placeholder">
        Preencha os dados e clique em <strong>Gerar Relatório</strong>
      </div>
    );
  }

  const previewers: Record<ReportFormat, React.ReactNode> = {
    pdf: <PDFPreviewer data={data} content={content} />,
    html: <HTMLPreviewer content={content} />,
    json: <JSONPreviewer content={content} />,
  };

  return <div className="preview-container">{previewers[type]}</div>;
};

export default ReportPreview;
