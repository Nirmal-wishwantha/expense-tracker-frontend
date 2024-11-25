import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';


=======

import { BrowserRouter } from 'react-router-dom';

>>>>>>> dd9c2f9d18b6be36bb76cdb5f3f3ccafa0536fb2
createRoot(document.getElementById('root')).render(


  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,


)
