import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import './Custom.scss';
import store from './Api/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
