import React, { useState, useEffect } from 'react';
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

  const parseMarkdown = (text) => {
    let parsedText = text;

    // Replace headers
    parsedText = parsedText.replace(/(^|\n)###### (.*?)(\n|$)/g, '<h6>$2</h6>');
    parsedText = parsedText.replace(/(^|\n)##### (.*?)(\n|$)/g, '<h5>$2</h5>');
    parsedText = parsedText.replace(/(^|\n)#### (.*?)(\n|$)/g, '<h4>$2</h4>');
    parsedText = parsedText.replace(/(^|\n)### (.*?)(\n|$)/g, '<h3>$2</h3>');
    parsedText = parsedText.replace(/(^|\n)## (.*?)(\n|$)/g, '<h2>$2</h2>');
    parsedText = parsedText.replace(/(^|\n)# (.*?)(\n|$)/g, '<h1>$2</h1>');

    // Replace bold and italic text
    parsedText = parsedText.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    parsedText = parsedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    parsedText = parsedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace links
    parsedText = parsedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Replace line breaks
    parsedText = parsedText.replace(/\n/g, '<br/>');

    return parsedText;
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
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </>
      )}
    </div>
  );
}

export default App;
