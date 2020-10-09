import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './Components/App';
import 'antd/dist/antd.css';
import './Assets/styles/main.scss';
import 'font-awesome/css/font-awesome.min.css';
import Store from './Store/store';
import { Provider } from 'react-redux';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));

