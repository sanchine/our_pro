import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PostsPage.css";

export function AdminPage () {
    const [posts, setPosts] = useState(0);

    useEffect(() => {
        getPosts();
    }, []);

    async function addTo() {
        const name = document.getElementById("nn");
        const num = document.getElementById("nm");

        const dataTo = {
            nickname: name.value,
            number: num.value
        }

        try {
            const response = await fetch(`http://localhost:3001/228/add`, {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify(dataTo)
            });

        } catch(e) {
            console.error(e);
        }
    }

    async function delFrom() {
        const name = document.getElementById("nn");

        const dataTo = {
            nickname: name.value
        }

        try {
            const response = await fetch(`http://localhost:3001/228/del`, {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify(dataTo)
            });

        } catch(e) {
            console.error(e);
        }
    }

    async function delPost(_id) {
        const dataTo = {
            id: _id,
        };

        try {
            const response = await fetch(`http://localhost:3001/api/del`, {
                method: 'post',
                headers: {
                    "Content-Type": "Application/json",
                    "Access-Control-Allow-Origin": '*'
                },
                body: JSON.stringify(dataTo)
            });
            if (response.ok) window.location.reload();

        } catch(e) {
            console.error(e);
        }
    }

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
                const delIcon = document.createElement('img');
                const del = document.createElement('button');

                delIcon.src = "https://cdn-icons.flaticon.com/png/512/657/premium/657059.png?token=exp=1658516355~hmac=38abe2620ec7af50e8f3a4586464fb8f";
                delIcon.style.width = "16px";
                delIcon.style.height = "16px";
                del.style.width = "16px";
                del.style.height = "16px";
                delIcon.style.position = "relative";
                //delIcon.style.top = "-44px";

                // delIcon.style.right = "10px";
                delIcon.style.float = "right";
                del.style.position = "relative";
                del.style.top = "-44px";

                del.style.right = "10px";
                del.style.float = "right";

                const attr_value = `{delPost(data[i].id)}`;

                post.style.backgroundColor = "#fff";
                post.style.padding = "10px";
                post.style.marginTop = "10px";
                post.style.borderRadius = "8px";
                post.id = data[i].id;
                del.setAttribute('onClick', `(() => { 
                    useEffect(() => {
                        delPost(post.id);
                    }, []);
                 }`);

                name.textContent = data[i].nickname;
                name.style.fontWeight = 500;
                txt.textContent = data[i].text;
                txt.style.fontWeight = 400;
                feed.appendChild(post);
                post.appendChild(name);
                post.appendChild(txt);
                post.appendChild(del);
                del.appendChild(delIcon);
            });
        }  
        return;

        } catch (e) {
            console.error(e);
        }
    }

    const num = localStorage.getItem('number');
    
    async function sendData() {
        setPosts(posts + 1);

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

             if (response.ok) window.location.reload();

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="container" id='container'>
            <div className="admin-panel">
                Add/Del Users<br></br>
                <input id="nn" className="admin-input" placeholder="nick"></input>
                <input id="nm" className="admin-input" placeholder="num"></input>
                <button onClick={addTo}>+</button>
                <button onClick={delFrom}>-</button>
            </div>
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