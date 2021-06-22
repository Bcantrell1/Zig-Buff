import React, { useEffect, useState } from "react";
import "./App.css";
import jwt from "jwt-decode";

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

    const handleLogout = () => {
        console.log("Logging Out");
        localStorage.clear();
        setCurrentUser(null);
    };

    const checkExpiredToken = () => {
        let token = localStorage.getItem("jwtToken");
        if (token) {
            let decoded = jwt(token);
            if (decoded.exp * 1000 < Date.now()) {
                console.log("Token Expired");
                localStorage.clear();
                setCurrentUser(null);
            } else {
                if (!currentUser) {
                    setCurrentUser(decoded.user);
                }
            }
        }
    };

    useEffect(() => {
        checkExpiredToken();

        window.addEventListener("message", (event) => {
            if (event.origin !== "http://localhost:5460") return;
            const { token, ok } = event.data;
            const user = event.data.user;
            if (ok) {
                localStorage.setItem("jwtToken", token);
                setCurrentUser(JSON.parse(user));
            }
        });
    }, [currentUser]);

    return !currentUser ? (
        <button onClick={handleLogin}>Login</button>
    ) : (
        <>
            <div>{currentUser.id}</div>
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
}
