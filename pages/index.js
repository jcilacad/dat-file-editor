import { useState, useRef } from 'react';

// Light and dark theme definitions
const lightTheme = {
  background: '#ffffff',
  text: '#333333',
  buttonBg: '#e6f2ff',
  buttonText: '#0066cc',
  tableBorder: '#e0e0e0',
  tableHeaderBg: '#f9f9f9',
  inputBorder: '#cccccc',
  highlight: '#fff9c4',
  inputBg: '#f0f0f0'
};

const darkTheme = {
  background: '#1a1a1a',
  text: '#e0e0e0',
  buttonBg: '#004080',
  buttonText: '#e6f2ff',
  tableBorder: '#333333',
  tableHeaderBg: '#2a2a2a',
  inputBorder: '#555555',
  highlight: '#b8860b',
  inputBg: '#2a2a2a'
};

export default function Home() {
  const [headers, setHeaders] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Toggle for dark mode
  const fileInputRef = useRef(null); // Ref for file input
  const searchInputRef = useRef(null); // Ref for search input

  const theme = isDarkMode ? darkTheme : lightTheme; // Active theme

  // Fetch initial data
  const fetchData = async () => {
    const res = await fetch('/api/data');
    const data = await res.json();
    setHeaders(data.headers);
    setDataRows(data.dataRows);
    setFileName(data.fileName);
  };

  // Handle file upload
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/upload', { method: 'POST', body: formData });
    fetchData();
  };

  // Edit table cell
  const handleCellEdit = (rowIndex, colIndex, value) => {
    const updatedRows = [...dataRows];
    updatedRows[rowIndex][colIndex] = value;
    setDataRows(updatedRows);
  };

  // Save changes
  const handleSave = async () => {
    await fetch('/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataRows })
    });
    alert('Changes saved!');
  };

  // Download file
  const handleDownload = () => {
    window.location.href = '/api/download';
  };

  // Scroll to first search match
  const scrollToFirstMatch = () => {
    if (searchQuery) {
      const firstHighlighted = document.querySelector('.highlighted');
      if (firstHighlighted) {
        firstHighlighted.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
  };

  // Handle search actions
  const handleSearch = () => scrollToFirstMatch();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') scrollToFirstMatch();
  };

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '30px' }}>DAT File Editor</h1>

        {/* Top Controls */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', alignItems: 'center' }}>
          <button
            onClick={() => fileInputRef.current.click()}
            style={{
              backgroundColor: theme.buttonBg,
              color: theme.buttonText,
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '16px',
              transition: 'background-color 0.3s'
            }}
          >
            Upload File
          </button>
          {headers.length > 0 && (
            <>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: theme.buttonBg,
                  color: theme.buttonText,
                  border: 'none',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontSize: '16px',
                  transition: 'background-color 0.3s'
                }}
              >
                Save
              </button>
              <button
                onClick={handleDownload}
                style={{
                  backgroundColor: theme.buttonBg,
                  color: theme.buttonText,
                  border: 'none',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontSize: '16px',
                  transition: 'background-color 0.3s'
                }}
              >
                Download
              </button>
            </>
          )}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              backgroundColor: theme.buttonBg,
              color: theme.buttonText,
              border: 'none',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '16px',
              transition: 'background-color 0.3s'
            }}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {headers.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', flexGrow: 1 }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                ref={searchInputRef}
                style={{
                  padding: '12px',
                  border: `1px solid ${theme.inputBorder}`,
                  borderRadius: '6px',
                  fontSize: '16px',
                  flexGrow: 1,
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  backgroundColor: theme.buttonBg,
                  color: theme.buttonText,
                  border: 'none',
                  padding: '12px 24px',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontSize: '16px',
                  transition: 'background-color 0.3s'
                }}
              >
                Search
              </button>
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".dat"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleUpload}
        />

        {headers.length > 0 && (
          <>
            {/* Scrollable Table */}
            <div style={{ overflowX: 'auto', marginTop: '30px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        style={{
                          border: `1px solid ${theme.tableBorder}`,
                          padding: '12px',
                          backgroundColor: theme.tableHeaderBg,
                          color: theme.text,
                          fontWeight: '600',
                          textAlign: 'left',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, colIndex) => {
                        const isHighlighted =
                          searchQuery &&
                          cell.toLowerCase().includes(searchQuery.toLowerCase());
                        return (
                          <td
                            key={colIndex}
                            className={isHighlighted ? 'highlighted' : ''}
                            style={{
                              border: `1px solid ${theme.tableBorder}`,
                              padding: '12px',
                              backgroundColor: isHighlighted ? theme.highlight : 'transparent',
                              whiteSpace: 'nowrap' // Prevent text wrapping
                            }}
                          >
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => handleCellEdit(rowIndex, colIndex, e.target.value)}
                              style={{
                                border: 'none',
                                borderBottom: `1px solid ${theme.inputBorder}`,
                                width: 'auto',                     // Let the input size itself based on content
                                minWidth: `${Math.max(cell.length, 5)}ch`, // Ensure it’s at least wide enough for the content
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: theme.text,
                                fontSize: '16px'
                              }}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '30px', fontSize: '14px', color: theme.text }}>
              Editing: {fileName}
            </p>
          </>
        )}
      </div>
    </div>
  );
}