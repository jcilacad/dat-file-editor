import { useState, useRef, useEffect } from 'react';

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [addAfterRow, setAddAfterRow] = useState(''); // State for specifying where to add a record
  const [newRowIndex, setNewRowIndex] = useState(null); // Track the newly added row
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const tableRef = useRef(null); // Reference to the table for scrolling

  const theme = isDarkMode ? darkTheme : lightTheme;

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

  // Add a new record
  const handleAddRecord = () => {
    const position = parseInt(addAfterRow, 10);
    const newRow = headers.map(() => ''); // Create a new row with empty strings
    let updatedRows = [...dataRows];
    let insertIndex;

    if (isNaN(position) || position < 0) {
      // Add at the end if input is invalid or empty
      updatedRows.push(newRow);
      insertIndex = updatedRows.length - 1;
    } else if (position === 0) {
      // Add at the top
      updatedRows.unshift(newRow);
      insertIndex = 0;
    } else {
      // Add after the specified row, capping at the end if position exceeds row count
      insertIndex = Math.min(position, updatedRows.length);
      updatedRows.splice(insertIndex, 0, newRow);
    }

    setDataRows(updatedRows);
    setNewRowIndex(insertIndex); // Set the new row index for focusing
    setAddAfterRow(''); // Clear the input
  };

  // Delete a record with confirmation if it has data
  const handleDelete = (rowIndex) => {
    const row = dataRows[rowIndex];
    const hasData = row.some(cell => cell.trim() !== '');

    if (hasData) {
      const confirmDelete = confirm('Are you sure you want to delete this record? It contains data.');
      if (!confirmDelete) {
        return;
      }
    }

    const updatedRows = dataRows.filter((_, index) => index !== rowIndex);
    setDataRows(updatedRows);
  };

  // Scroll to and focus on the new row when newRowIndex changes
  useEffect(() => {
    if (newRowIndex !== null && tableRef.current) {
      // Select the new row (adjust for header row)
      const rowElement = tableRef.current.querySelector(`tbody tr:nth-child(${newRowIndex + 1})`);
      if (rowElement) {
        // Scroll the row into view smoothly
        rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Focus on the first input field in the new row
        const firstInput = rowElement.querySelector('input');
        if (firstInput) {
          firstInput.focus();
        }
      }
      setNewRowIndex(null); // Reset the index after focusing
    }
  }, [newRowIndex]);

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
              {/* Add Record Controls */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="After row (0 for top)"
                  value={addAfterRow}
                  onChange={(e) => setAddAfterRow(e.target.value)}
                  style={{
                    padding: '12px',
                    border: `1px solid ${theme.inputBorder}`,
                    borderRadius: '6px',
                    fontSize: '16px',
                    width: '100px',
                    backgroundColor: theme.inputBg,
                    color: theme.text,
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleAddRecord}
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
                  Add Record
                </button>
              </div>
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
            {/* Scrollable Table with Sticky Header */}
            <div style={{
              overflowX: 'auto',           // Preserve horizontal scrolling
              overflowY: 'auto',           // Enable vertical scrolling
              maxHeight: '500px',          // Set a maximum height for scrolling
              marginTop: '30px'            // Optional spacing
            }}>
              <table ref={tableRef} style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{
                      width: '50px',
                      border: `1px solid ${theme.tableBorder}`,
                      padding: '12px',
                      backgroundColor: theme.tableHeaderBg,
                      color: theme.text,
                      fontWeight: '600',
                      textAlign: 'center',
                      position: 'sticky',       // Make header sticky
                      top: 0,                  // Stick to the top
                      zIndex: 1                // Keep above table body
                    }}>
                      #
                    </th>
                    <th style={{
                      width: '100px',
                      border: `1px solid ${theme.tableBorder}`,
                      padding: '12px',
                      backgroundColor: theme.tableHeaderBg,
                      color: theme.text,
                      fontWeight: '600',
                      textAlign: 'center',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1
                    }}>
                      Actions
                    </th>
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
                          whiteSpace: 'nowrap',
                          position: 'sticky',
                          top: 0,
                          zIndex: 1
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
                      <td style={{
                        border: `1px solid ${theme.tableBorder}`,
                        padding: '12px',
                        textAlign: 'center'
                      }}>
                        {rowIndex + 1}
                      </td>
                      <td style={{
                        border: `1px solid ${theme.tableBorder}`,
                        padding: '12px',
                        textAlign: 'center'
                      }}>
                        <button
                          onClick={() => handleDelete(rowIndex)}
                          style={{
                            backgroundColor: theme.buttonBg,
                            color: theme.buttonText,
                            border: 'none',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            fontSize: '14px',
                            transition: 'background-color 0.3s'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      {row.map((cell, colIndex) => {
                        const isHighlighted = searchQuery && cell.toLowerCase().includes(searchQuery.toLowerCase());
                        return (
                          <td
                            key={colIndex}
                            className={isHighlighted ? 'highlighted' : ''}
                            style={{
                              border: `1px solid ${theme.tableBorder}`,
                              padding: '12px',
                              backgroundColor: isHighlighted ? theme.highlight : 'transparent',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <input
                              type="text"
                              value={cell}
                              onChange={(e) => handleCellEdit(rowIndex, colIndex, e.target.value)}
                              style={{
                                border: 'none',
                                borderBottom: `1px solid ${theme.inputBorder}`,
                                width: 'auto',
                                minWidth: `${Math.max(cell.length, 5)}ch`,
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