import React,{useState, useEffect, useContext} from 'react';
import '../css/FileInput.css';
import { TextContext } from './TextContext';

const FileInput = ({ label,id }) => {
    const [isFile, SetIsFile] = useState("❌❌❌❌❌"); 
    const [fileContent, setFileContent] = useState("");
    const [fileText, setFileText] = useState("");
    const {text, setText, setOutRoad, setOutDir} = useContext(TextContext);

    useEffect(() => {
        if (id === "in" && text !== fileContent) {
            SetIsFile("❌❌❌❌❌");
        }
        //костыль, но я не хочу отдельный файл для кнопки делать
        if (id === "in") {
            setFileText("CHOOSE FILE");
        }
        else{
            setFileText("CHOOSE FOLDER");
        }
    }, [text, id, fileContent]);

    const mouseClick = async (id) => {
        if(id === "in"){
            let t = await window.electronAPI.openKeyFile();
            setText(t[0]);
            setFileContent(t[0]);
            setOutRoad(t[1]);
            SetIsFile("✅✅✅✅✅");
            
        }else{     
            let temp = await window.electronAPI.getFileName();
            setOutDir(temp);
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
                    {fileText}
                </button>
                <span className="file-name">{isFile}</span>
            </div>
        </div>
    );
};

export default FileInput;