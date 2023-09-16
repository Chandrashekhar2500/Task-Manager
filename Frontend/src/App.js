import React from 'react';
import './App.css';
import AppRouter from './router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Provider store={store}>
      <Toaster
					position="top-right"
					reverseOrder={false}
				/>
        <AppRouter />
			</Provider>
    </>
  );
}

export default App;
