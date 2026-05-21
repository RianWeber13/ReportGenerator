import React from 'react';

interface Props {
  content: string;
}

const JSONPreviewer: React.FC<Props> = ({ content }) => (
  <div className="previewer previewer--json">
    <div className="previewer__badge">Formato JSON</div>
    <pre className="previewer__json-code">{content}</pre>
  </div>
);

export default JSONPreviewer;
