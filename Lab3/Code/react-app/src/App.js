import React from 'react';
import Header from "./components/Header.js";
import FileInput from './components/FileInput';
import TextArea from './components/Textarea.js';
import OutputArea from './components/OutputArea.js';
import PrimeP from './components/PrimeP';
import PrimeQ from './components/PrimeQ.js';
import PrimeN from './components/MultN.js';
import NumberB from './components/NumberB';
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
                    <FileInput id = "out" label="Output Folder" />
                </div>
            </div>
           
            <div className="control-panel">
                <div className="key-section">
                    <PrimeP />
                </div>
                    
                <div className="key-section">
                    <PrimeQ />
                </div>

                <div className="key-section">
                    <NumberB />
                </div>

                <div className="key-section">
                    <PrimeN />
                </div>
            </div>
            <Buttons />
        </div>
        </TextProvider>
    );

}

export default App;