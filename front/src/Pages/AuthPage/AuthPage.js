import React from "react";
import "./AuthPage.css";

export function AuthPage () {

    localStorage.setItem("number", '');

    async function identifyData () {
        const number = document.getElementById('inputer').value;
        localStorage.setItem("number", number);
        try {
            const response = await fetch(`http://localhost:3001/api/auth/${number}`, {
                method: 'get',
                headers: {
                    "Access-Control-Allow-Origin": '*'
                }
            });

            if (response.ok) {
                if (number == "1") {
                    window.location = '/228';
                    console.log("All right!");
                } else {
                    window.location = '/posts';
                    console.log("Admeeeeen!");
                }
            }
            return;

        } catch (e) {
            console.error(e);
        }
    }

    
    return (
        <div className="container">
            <div className="auth-form">
                <input type="num" id="inputer" className="inputer"/>
                <input type="text" id="inputer2" className="inputer" placeholder="Ваше имя"/>
                <button onClick={identifyData} className="submit-button" type="submit">Вход</button>
            </div>
        </div>
    );

}