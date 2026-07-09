import React, { useContext, useState } from 'react'
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignIn from '../components/Fragments/FormSignIn';
import { loginService } from '../services/authService';
import { AuthContext } from '../context/authContext';
import AppSnackbar from '../components/Fragments/Snackbar';

function SignIn() {
    const { login } = React.useContext(AuthContext);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleLogin = async (email, password) => {
        try {
            const response = await loginService(email, password);
            console.log("SignIn: Full login response:", response);

            const token = response.token || response.accessToken || response.refreshToken;
            console.log("SignIn: Extracted token field names:", {
                hasToken: !!response.token,
                hasAccessToken: !!response.accessToken,
                hasRefreshToken: !!response.refreshToken,
                tokenSelected: token ? "Found" : "None"
            });

            if (token) {
                console.log("SignIn: Logging in with token");
                login(token);
            } else {
                throw { msg: "Login successful but no token received" };
            }
        } catch (err) {
            console.error("SignIn: Login error:", err);
            setSnackbar({ open: true, message: err.msg || "Login failed", severity: "error" });
        }

    };

    return (
        <AuthLayout>
            <FormSignIn onSubmit={handleLogin} />
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />

        </AuthLayout>
    );
}
export default SignIn;