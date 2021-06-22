import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = () => {
        const popupWindow = window.open(
            "http://localhost:5460/auth/steam",
            "_blank",
            "width=800, height=600"
        );
        if (window.focus) popupWindow.focus();
    };

    useEffect(() => {
        window.addEventListener("message", (event) => {
            if (event.origin !== "http://localhost:5460") return;
            const { token, ok } = event.data;
            const user = event.data.user;
            if (ok) {
                localStorage.setItem("jwtToken", token);
                console.log(JSON.parse(user));
                setCurrentUser(JSON.parse(user));
            }
        });
    }, [currentUser]);

    return !currentUser ? (
        <button onClick={handleLogin}>Login</button>
    ) : (
        <div>{currentUser.id}</div>
    );
}
