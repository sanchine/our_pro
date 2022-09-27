import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostsPage.css";

export function PostsPage () {

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        try {
            const response = await fetch('http://localhost:3001/api/posts', {
                method: 'get',
                headers: {
                    "Access-Control-Allow-Origin": '*',
                    "Content-Type": "application/json"
                 },
            });

            if (response.ok) {
                const feed = document.getElementById('feed');
                const data = await response.json();
    
                const number = localStorage.getItem('number');
    
                Object.keys(data).reverse()
                .forEach(function(i) {
                    const post = document.createElement('div');
                    const name = document.createElement('label');
                    const txt = document.createElement('p');
                    
    
                    
                    post.style.backgroundColor = "#fff";
                    post.style.padding = "10px";
                    post.style.marginTop = "10px";
                    post.style.borderRadius = "8px";
                    // post.style.
    
                    if (data[i].number == number) {
                        const delIcon = document.createElement('img');
                        delIcon.src = "https://cdn-icons.flaticon.com/png/512/657/premium/657059.png?token=exp=1658516355~hmac=38abe2620ec7af50e8f3a4586464fb8f";
                        delIcon.style.width = "16px";
                        delIcon.style.height = "16px";
                        delIcon.style.position = "relative";
                        delIcon.style.top = "-44px";
                            // delIcon.setAttribute("onClick", function() {
                            //     delPost();
                            // });
                        delIcon.style.right = "10px";
                        delIcon.style.float = "right";
                        post.appendChild(delIcon);
                    } 

                    name.textContent = data[i].nickname;
                    name.style.fontWeight = 500;
                    txt.textContent = data[i].text;
                    txt.style.fontWeight = 400;
                    feed.appendChild(post);
                    post.appendChild(name);
                    post.appendChild(txt);

                });    
            }  
            return;
        } catch (e) {
            console.error(e);
        }
    }

    const num = localStorage.getItem('number');
    
    async function sendData() {
        const data = {
            number: num,
            text: document.getElementById('input').value,
        };

        try {
            const response = await fetch('http://localhost:3001/api/add', {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                window.location = '/posts';
            }

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container" id='container'>
            <h2 >Посты</h2>
            <Link to="/" className="login-button">Выход</Link>
            <div className="submitter">
                <input id="input" className="input-text" placeholder="Введите Ваше сообщение..."></input>
                <button className="add-button" onClick={sendData}>
                    <img className="send-img" width="32px" height="26px" src="https://cdn.icon-icons.com/icons2/1678/PNG/512/wondicon-ui-free-send_111204.png" />
                </button>
            </div>
            <div className="feed" id="feed"></div>
        </div>
    );
}