import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router'; // Använd "from" och ta bort parenteserna runt filvägen

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
