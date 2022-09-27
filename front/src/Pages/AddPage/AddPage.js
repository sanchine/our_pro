import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AddPage() {
    let dt;

    return (
        <div className="container">
            <Link to="/posts" className="back">К постам</Link>
            <input type="text" className="textarea" id="input"/>
            <button className="send-button">Отправить</button>
        </div>
    )
}