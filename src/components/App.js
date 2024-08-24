import React, { useState, useEffect } from 'react';
import marked from 'marked';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading effect, if needed, you can remove this if not required.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="app">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <textarea
            className="textarea"
            value={markdown}
            onChange={handleInputChange}
            placeholder="Write your markdown here..."
          />
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          />
        </>
      )}
    </div>
  );
}

export default App;
