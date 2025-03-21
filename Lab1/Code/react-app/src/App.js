import React from 'react';
import Header from "./components/Header.js";
import FileInput from './components/FileInput';
import TextArea from './components/Textarea.js';
import OutputArea from './components/OutputArea.js';
import KeyInput from './components/KeyInput';
import MethodSelector from './components/MethodSelector';
import Buttons from './components/Buttons';
import { TextProvider } from './components/TextContext';
import './css/App.css';

const App = () => {
    
        return(
        <TextProvider>
        <div className="app">
            <Header />
            <div className="main-content">
                <TextArea />
                <OutputArea />
                <div className="file-buttons">
                    <FileInput id = "in" label="Input File" />
                    <div></div>
                    <FileInput id = "out" label="Output File" />
                </div>
            </div>
            <div className="control-panel">
                <div className="method-section">
                    <MethodSelector />
                </div>
                
                <div className="key-section">
                    <KeyInput />
                </div>
            </div>
            <Buttons />
        </div>
        </TextProvider>
    );

}

export default App;