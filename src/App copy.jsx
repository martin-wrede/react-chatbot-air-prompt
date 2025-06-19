import React, { useState } from 'react';
import Form from './components/Form';
import { Upload, X, File } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
   const [gesamtPrompt, setGesamtPrompt] = useState("");
   const [display, setDisplay] = useState("none");

   
const sendMessage = async () => {
  if (!inputMessage.trim() && uploadedFiles.length === 0) return;

  let messageContent = inputMessage;

  // Combine file content if available
  if (uploadedFiles.length > 0) {
    const fileContext = uploadedFiles.map(file =>
      `[Datei: ${file.name}]\n${file.content}`
    ).join('\n\n---\n\n');

    messageContent = `${messageContent}\n\n[Hochgeladene Dateien:]\n${fileContext}`;
  }

  const userMessage = { role: 'user', content: messageContent };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsLoading(true);

  try {
    const conversationHistory = [
      { role: "system", content: gesamtPrompt },
      ...messages,
      userMessage
    ];

    const response = await fetch('/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messageContent,
        messages: conversationHistory,
        files: uploadedFiles
      }),
    });

    const data = await response.json();
{/*
      const assistantMessage = {
      role: 'assistant',
      content: data.choices?.[0]?.message?.content || 'Keine Antwort generiert.'
    };
  */}


  const rawContent = data.choices?.[0]?.message?.content || '';
const icsMatch = rawContent.match(/```ics([\s\S]*?)```/i);

if (icsMatch) {
  const icsContent = icsMatch[1].trim();
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const icsDownloadUrl = URL.createObjectURL(blob);

  setMessages(prev => [
    ...prev,
    {
      role: 'assistant',
      content: (
        <>
          <p>Hier ist dein Kalender-Download:</p>
          <a href={icsDownloadUrl} download="projektplan.ics">
            📅 Kalender herunterladen (.ics)
          </a>
        </>
      )
    }
  ]);
} else {
  setMessages(prev => [
    ...prev,
    {
      role: 'assistant',
      content: rawContent
    }
  ]);
}


    setMessages(prev => [...prev, assistantMessage]);

  } catch (error) {
    console.error("Error sending message:", error);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: 'Fehler bei der Verarbeitung.'
    }]);
  } finally {
    setIsLoading(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    for (const file of files) {
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        try {
          const content = await file.text();
          const fileData = {
            id: Date.now() + Math.random(),
            name: file.name,
            content: content,
            size: file.size,
            uploadedAt: new Date().toLocaleString('de-DE')
          };
          
          setUploadedFiles(prev => [...prev, fileData]);
        } catch (error) {
          console.error('Error reading file:', error);
          alert(`Fehler beim Lesen der Datei ${file.name}`);
        }
      } else {
        alert(`${file.name} ist keine Textdatei. Nur .txt Dateien sind erlaubt.`);
      }
    }
    
    event.target.value = '';
  };

  const deleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="app-container">
      {/*
       
       */}
       <div  >
       <button  onClick={()=> setDisplay("none")}>zurück</button>
       <button onClick={()=> setDisplay("block")}>weiter</button>    
</div>
     <div  id="form-all-id"  style={{display:"block"}} >
  <Form onPromptChange={setGesamtPrompt} />
     </div>
    
      <br/>
        {gesamtPrompt}


      <br/>
     
       
       {/* Chat  Container All */}
      <div id="chatbot-all-id" style={{display:display}} >
      <h2>AI Chatbot </h2>
      {/* Chat Messages Container */}
      <div className="chat-container"   >
        {messages.length === 0 ? (
          <div className="empty-chat">
            Beginne eine Unterhaltung...
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === 'user' ? 'message-user' : 'message-assistant'}`}
            >
              <strong>{message.role === 'user' ? 'Du:' : 'AI:'}</strong>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="message message-loading">
            AI tippt...
          </div>
        )}
      </div>

      {/* File Upload Section */}
      <div className="file-section">
        <div className="file-upload-header">
          <label className="upload-button">
            <Upload size={16} />
            Textdateien hochladen
            <input
              type="file"
              multiple
              accept=".txt,text/plain"
              onChange={handleFileUpload}
              className="file-input"
            />
          </label>
          <span className="file-hint">
            Nur .txt Dateien erlaubt
          </span>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="uploaded-files">
            <h4 className="files-title">
              Hochgeladene Dateien ({uploadedFiles.length}):
            </h4>
            <div className="files-list">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="file-item">
                  <div className="file-info">
                    <File size={14} color="#666" />
                    <div className="file-details">
                      <div className="file-name">
                        {file.name}
                      </div>
                      <div className="file-meta">
                        {formatFileSize(file.size)} • {file.uploadedAt}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteFile(file.id)}
                    className="delete-button"
                    title="Datei löschen"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="input-area">
        {uploadedFiles.length > 0 && (
          <div className="attached-files-indicator">
            <File size={14} />
            <span>{uploadedFiles.length} Datei(en) angehängt</span>
          </div>
        )}
        <div className="input-controls">
          <textarea
            placeholder="Schreibe deine Nachricht..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="message-input"
            rows={2}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={`send-button ${(isLoading || !inputMessage.trim()) ? 'disabled' : ''}`}
          >
            {isLoading ? 'Senden...' : 'Senden'}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;