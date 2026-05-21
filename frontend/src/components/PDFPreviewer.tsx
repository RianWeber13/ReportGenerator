import React from 'react';
import { ReportData } from '../types';

interface Props {
  data: ReportData;
  content: string;
}

const PDFPreviewer: React.FC<Props> = ({ data, content }) => (
  <div className="previewer previewer--pdf">
    <div className="previewer__badge">Formato PDF</div>
    <h3>{data.title}</h3>
    <p className="previewer__meta">Destinatário: <strong>{data.name}</strong></p>
    <ul className="previewer__list">
      {data.items.map((item, i) => (
        <li key={i}><span className="field-label">{item.label}:</span> {item.value}</li>
      ))}
    </ul>
    <details className="previewer__raw">
      <summary>Saída bruta do backend</summary>
      <pre>{content}</pre>
    </details>
  </div>
);

export default PDFPreviewer;
