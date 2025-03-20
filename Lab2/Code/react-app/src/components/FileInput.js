import React,{useState, useEffect, useContext} from 'react';
import '../css/FileInput.css';
import { TextContext } from './TextContext';

const FileInput = ({ label,id }) => {
    const [isFile, SetIsFile] = useState("❌❌❌❌❌"); 
    const [fileContent, setFileContent] = useState("");
    const {text, setText, setOutRoad } = useContext(TextContext);

    useEffect(() => {
        if (id === "in" && text !== fileContent) {
            SetIsFile("❌❌❌❌❌");
        }
    }, [text, id, fileContent]);

    const mouseClick = async (id) => {
        if(id === "in"){
            let t = await window.electronAPI.openKeyFile();
            setText(t);
            setFileContent(t);
            SetIsFile("✅✅✅✅✅");
            
        }else{     
            let temp = await window.electronAPI.getFileName();
            setOutRoad(temp)
            if(temp){
                SetIsFile("✅✅✅✅✅");
            }
        }
        
    }
    
   
    return (
        <div className="file-input">
            <label className="file-label">{label}</label>
            <div className="file-container">
                <button className="file-button" onClick = {() => mouseClick(id)}>
                    Choose file
                </button>
                <span className="file-name">{isFile}</span>
            </div>
        </div>
    );
};

export default FileInput;