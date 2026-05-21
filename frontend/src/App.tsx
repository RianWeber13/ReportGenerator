import React, { useState } from 'react';
import { ReportData, ReportFormat, ReportItem } from './types';
import ReportPreview from './components/ReportPreview';
import './App.css';

const INITIAL_DATA: ReportData = {
  name: 'João Silva',
  title: 'Relatório Mensal',
  items: [
    { label: 'Departamento', value: 'Engenharia de Software' },
    { label: 'Período', value: 'Maio 2026' },
    { label: 'Status', value: 'Concluído' },
  ],
};

function App() {
  const [format, setFormat] = useState<ReportFormat>('html');
  const [data, setData] = useState<ReportData>(INITIAL_DATA);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setContent('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: format, data }),
      });
      const text = await res.text();
      if (!text) throw new Error('O servidor não retornou resposta. Verifique se o backend está rodando.');
      let json: any;
      try {
        json = JSON.parse(text);
      } catch {
        throw new Error('Resposta inválida do servidor.');
      }
      if (!res.ok) throw new Error(json.error ?? `Erro ${res.status}`);
      setContent(json.content);
    } catch (err: any) {
      setError(err.message ?? 'Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const updateItem = (index: number, field: keyof ReportItem, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () =>
    setData({ ...data, items: [...data.items, { label: '', value: '' }] });

  const removeItem = (index: number) =>
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });

  return (
    <div className="app">
      <header className="app__header">
        <h1>Gerador de Relatórios</h1>
        <p>
          Padrão de Projeto: <strong>Factory Method</strong>
        </p>
      </header>

      <div className="app__layout">
        {/* Painel de configuração */}
        <section className="card">
          <h2 className="card__title">Configuração</h2>

          <div className="field">
            <label>Formato do Relatório</label>
            <select
              value={format}
              onChange={(e) => {
                setFormat(e.target.value as ReportFormat);
                setContent('');
              }}
            >
              <option value="pdf">PDF</option>
              <option value="html">HTML</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div className="field">
            <label>Título</label>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Destinatário</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div className="field">
            <label>Campos do Relatório</label>
            {data.items.map((item, i) => (
              <div key={i} className="item-row">
                <input
                  placeholder="Campo"
                  value={item.label}
                  onChange={(e) => updateItem(i, 'label', e.target.value)}
                />
                <input
                  placeholder="Valor"
                  value={item.value}
                  onChange={(e) => updateItem(i, 'value', e.target.value)}
                />
                <button
                  className="btn-remove"
                  onClick={() => removeItem(i)}
                  title="Remover campo"
                >
                  &times;
                </button>
              </div>
            ))}
            <button className="btn-add" onClick={addItem}>
              + Adicionar Campo
            </button>
          </div>

          <button
            className="btn-generate"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Gerando...' : 'Gerar Relatório'}
          </button>

          {error && <div className="error-msg">{error}</div>}
        </section>

        {/* Painel de preview */}
        <section className="card">
          <h2 className="card__title">Pré-visualização</h2>
          <ReportPreview type={format} data={data} content={content} />
        </section>
      </div>
    </div>
  );
}

export default App;
