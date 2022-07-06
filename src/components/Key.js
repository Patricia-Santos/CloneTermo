import React, { useContext } from "react";
import { AppContext } from '../App';

function Key({ keyValue, bigKey }) {
    const { onSelectLetter, onDelete, onEnter } = useContext(AppContext);

    const selectLetter = () => {
        if (keyValue === "ENTER"){
            onEnter();
        }
        else if (keyValue === "APAGAR"){
            onDelete();
        }
        else {
            onSelectLetter(keyValue);
            }
        }
    return(
        <div className="key" id={bigKey && "big"} onClick={selectLetter}>
            {keyValue}
        </div>
    )
}

export default Key