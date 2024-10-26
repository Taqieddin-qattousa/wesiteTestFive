import { useState, useEffect } from 'react';
import InsertForm from './InsertForm';
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
        .then((response) => response.text())
        .then((data) => setMessage(data));
  }, []);

  return (
      <div className="App">
        <h1>{message}</h1>
        <div>
      <h1>Insert Data into MySQL</h1>
      <InsertForm />
    </div>
      </div>
      
  );
}

export default App;
