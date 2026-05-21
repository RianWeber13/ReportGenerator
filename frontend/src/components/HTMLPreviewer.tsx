import React from 'react';

interface Props {
  content: string;
}

const HTMLPreviewer: React.FC<Props> = ({ content }) => (
  <div className="previewer previewer--html">
    <div className="previewer__badge">Formato HTML</div>
    <iframe
      srcDoc={content}
      className="previewer__iframe"
      title="HTML Preview"
      sandbox="allow-same-origin"
    />
  </div>
);

export default HTMLPreviewer;
