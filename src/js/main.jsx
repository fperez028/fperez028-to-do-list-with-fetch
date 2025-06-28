import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

// index.css'
import '../styles/index.css'

// components
import {TodoList} from './components/TodoList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoList/>
  </React.StrictMode>,
)
