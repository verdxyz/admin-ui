import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/Layouts/AuthLayout';
import FormSignUp from '../components/Fragments/FormSignUp';
import { registerService } from '../services/authService';
import AppSnackbar from '../components/Fragments/Snackbar';

function SignUp() {
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleSignUp = async (values) => {
        try {
            const response = await registerService(values.name, values.email, values.password);

            // Registration successful, show success message and redirect
            if (response) {
                setSnackbar({
                    open: true,
                    message: "Registration successful! Redirecting to login...",
                    severity: "success",
                });

                // Redirect after a short delay to show the success message
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            setSnackbar({
                open: true,
                message: err.msg || "Email sudah pernah digunakan sebelumnya",
                severity: "error",
            });
            throw err; // Re-throw to let Formik handle the error state
        }
    };

    return (
        <AuthLayout>
            <FormSignUp onSubmit={handleSignUp} />
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </AuthLayout>
    );
}
export default SignUp;