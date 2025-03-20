import React, { createContext, useState } from 'react';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
    const [text, setText] = useState("");
    const [c, setC] = useState("");
    const [key, setKey] = useState("");
    const [outRoad, setOutRoad] = useState("");
    const [method, setMethod] = useState("pillar");

    return (
        <TextContext.Provider value={{ text, setText, method, setMethod, key, setKey, outRoad,setOutRoad,c,setC }}>
            {children}
        </TextContext.Provider>
    );
};