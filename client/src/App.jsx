import React, { useEffect, useState } from "react";
import "./App.css";
import httpClient from "./httpClient";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = () => {
        const popupWindow = window.open(
            import.meta.env.VITE_LOGIN_URL,
            "_blank",
            "width=600, height=630"
        );
        if (window.focus) popupWindow.focus();
    };

    const handleLogout = () => {
        setCurrentUser(() => null);
        httpClient.logOut();
    };

    const checkLoginStatus = () => {
        const user = httpClient.getUser();
        if (!user) {
            console.log("No user Found");
            return handleLogout;
        }
        setCurrentUser(user.user);
    };

    useEffect(() => {
        checkLoginStatus();
        window.addEventListener("message", (event) => {
            if (event.origin !== import.meta.env.VITE_API_URL) return;
            const { token, ok } = event.data;
            const user = event.data.user;
            if (ok) {
                httpClient.setToken(token);
                setCurrentUser(JSON.parse(user));
            }
        });
    }, []);

    return !currentUser ? (
        <button onClick={handleLogin}>Login</button>
    ) : (
        <>
            <Dashboard logOut={handleLogout} steamId={currentUser.id} />
            <button onClick={handleLogout}>Log Out</button>
        </>
    );
}
