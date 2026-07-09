import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                return jwtDecode(token);
            } catch (err) {
                console.error("Invalid token", err);
                localStorage.removeItem("token");
                return null;
            }
        }

        return null;
    });

    const login = (token) => {
        console.log("AuthContext: login called with token", token);
        const decoded = jwtDecode(token);
        console.log("AuthContext: decoded user", decoded);
        setUser(decoded);
        localStorage.setItem("token", token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
