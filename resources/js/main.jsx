import "./bootstrap";
// Render your React component instead
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Application/App';
import {
    BrowserRouter
} from "react-router-dom";


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    ,document.querySelector('#app'));
