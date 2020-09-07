import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ToastProvider } from "react-toast-notifications";
import  store from './redux/store'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
