import React, { createContext, useState } from 'react';

export const TextContext = createContext();

export const TextProvider = ({ children }) => {
    const [text, setText] = useState("");
    const [c, setC] = useState("");
    const [key, setKey] = useState("");
    const [outRoad, setOutRoad] = useState("");
    const [genKey, setgenKey] = useState("");

    return (
        <TextContext.Provider value={{ text, setText, key, setKey, outRoad, setOutRoad, c, setC, genKey, setgenKey }}>
            {children}
        </TextContext.Provider>
    );
};