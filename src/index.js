import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Context Imports
import { ApiConnect } from './Context/ApiConnect'
import { Coretime } from './Context/Coretime'
import { Relay } from './Context/Relay'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiConnect>
      <Relay>
        <Coretime>
          <App />
        </Coretime>
      </Relay>
    </ApiConnect>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
