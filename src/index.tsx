import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import rootReducer from './store/reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);
