import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LocalServiceWorkerRegister from './sw-register';

ReactDOM.render(<App />, document.getElementById('root'));

LocalServiceWorkerRegister();