import React from 'react';
import Header from "./components/Header.js";
import FileInput from './components/FileInput';
import TextArea from './components/Textarea.js';
import OutputArea from './components/OutputArea.js';
import KeyInput from './components/KeyInput';
import KeyGen from './components/KeyGen.js';
import Buttons from './components/Buttons';
import { TextProvider } from './components/TextContext';
import './css/App.css';
import Polynom from './components/Polynom.js';

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
                    <FileInput id = "out" label="Output Folder" />
                </div>
            </div>
            <Polynom />
            <div className="control-panel">
                <div className="key-section">
                    <KeyInput />
                </div>
                
                <div className="key-section">
                    <KeyGen />
                </div>
            </div>
            <Buttons />
        </div>
        </TextProvider>
    );

}

export default App;