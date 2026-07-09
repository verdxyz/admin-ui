import React, { useContext, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { logoutService } from "../../services/authService";

import { Backdrop, CircularProgress } from "@mui/material";

function MainLayout(props) {
    const { children } = props;
    const [isLoading, setIsLoading] = useState(false);

    const themes = [
        { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
        { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
        { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
        { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
        { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
    ];

    const { theme, setTheme } = useContext(ThemeContext);

    const menu = [
        { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
        { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
        { id: 3, name: "Transaction", icon: <Icon.Transaction />, link: "/transaction", },
        { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
        { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
        { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
        { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
    ];

    const { user, logout } = useContext(AuthContext);
    const handleLogout = async () => {
        setIsLoading(true);
        // Simulate a delay for the logout process to show the backdrop
        // This is purely visual since the simplified logoutService is synchronous
        setTimeout(async () => {
            try {
                await logoutService();
                logout();
            } catch (err) {
                console.error(err);
                if (err.status === 401) {
                    logout();
                }
            } finally {
                setIsLoading(false);
            }
        }, 1500);
    };

    return (
        <div className={`flex min-h-screen ${theme.name}`}>
            {/* Sidebar */}
            <aside className="bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-7 py-12">
                <div>
                    <div className="mb-10">
                        <Logo variant="secondary" />
                    </div>

                    <nav>
                        {menu.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.link}
                                className={({ isActive }) =>
                                    `flex px-4 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 ${isActive
                                        ? "bg-primary text-white font-bold"
                                        : "hover:bg-special-bg3"
                                    }`
                                }
                            >
                                <div className="mx-auto sm:mx-0">{item.icon}</div>
                                <div className="ms-3 hidden sm:block">{item.name}</div>
                            </NavLink>
                        ))}
                    </nav>
                </div>
                <div>
                    Themes
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        {themes.map((t) => (
                            <div
                                key={t.name}
                                className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer mb-2`}
                                onClick={() => setTheme(t)}
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Bottom sidebar */}
                <div>
                    <div onClick={handleLogout} className="cursor-pointer">
                        <div className="flex bg-special-bg3 text-white px-4 py-3 rounded-md">
                            <div className="mx-auto sm:mx-0 text-primary">
                                <Icon.Logout />
                            </div>
                            <div className="ms-3 hidden sm:block">Logout</div>
                        </div>
                    </div>

                    <div className="border my-10 border-b-special-bg"></div>

                    <div className="flex justify-between items-center">
                        <div>Avatar</div>
                        <div className="hidden sm:block">
                            {user.name}
                            <br />
                            <span className="text-sm text-gray-03">View Profile</span>
                        </div>
                        <div className="hidden sm:block">
                            <Icon.Detail size={15} />
                        </div>
                    </div>
                </div>
            </aside >

            {/* Content */}
            < div className="bg-special-mainBg flex-1 flex flex-col" >
                <div className="border-b border-gray-05 px-6 py-7 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="font-bold text-2xl me-6">{user.name}</div>
                        <div className="text-gray-03 flex items-center">
                            <Icon.ChevronRight size={20} />
                            <span className="ms-1">May 19, 2023</span>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="me-10">
                            <NotificationsIcon className="text-primary scale-110" />
                        </div>
                        <Input
                            backgroundColor="bg-white"
                            border="border-white"
                        />
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 px-6 py-4">
                    {children}
                </main>
            </div >
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={isLoading}
            >
                <div className="flex flex-col items-center justify-center">
                    <CircularProgress color="inherit" />
                    <span className="mt-2 text-white">Logging Out</span>
                </div>
            </Backdrop>
        </div >
    );
}

export default MainLayout;
