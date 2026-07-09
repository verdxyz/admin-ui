import React from 'react'
import LabeledInput from '../Elements/LabeledInput';
import CheckBox from '../Elements/CheckBox';
import Button from '../Elements/Button';
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Nama minimal 3 karakter")
        .max(50, "Nama maksimal 50 karakter")
        .required("Nama wajib diisi"),
    email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
    password: Yup.string()
        .min(6, "Password minimal 6 karakter")
        .matches(/[a-zA-Z]/, "Password harus mengandung huruf")
        .required("Password wajib diisi"),
});

function FormSignUp({ onSubmit }) {
    return (
        <>
            {/* form start */}
            <div className="flex justify-center mt-5" >
                <p className="text-lg font-semibold mt-3">Create an account</p>
            </div>
            <div className="mt-10">
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            await onSubmit(values);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-6">
                                <Field name="name">
                                    {({ field }) => (
                                        <LabeledInput
                                            {...field}
                                            label="Name"
                                            id="name"
                                            type="text"
                                            placeholder="Full Name"
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="mb-6">
                                <Field name="email">
                                    {({ field }) => (
                                        <LabeledInput
                                            {...field}
                                            label="Email Address"
                                            id="email"
                                            type="email"
                                            placeholder="hello@example.com"
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <div className="mb-6">
                                <Field name="password">
                                    {({ field }) => (
                                        <LabeledInput
                                            {...field}
                                            label="Password"
                                            id="password"
                                            type="password"
                                            placeholder="••••••••••"
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>
                            <p className="text-xs text-gray-500 mb-3">
                                By continuing, you agree to our{" "}
                                <a href="#" className="text-teal-600">
                                    terms of service.
                                </a>
                            </p>

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Loading..." : "Sign Up"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            {/* form end */}
            {/* teks start */}
            <div className=" my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03">
                <div className="border border-gray-05 w-full"></div>
                <div className=" px-2 bg-special-mainBg absolute"> or sign up with</div>
            </div>
            {/* teks end */}
            {/* sign in with google start */}
            <div className="mb-8">
                <Button type="button" variant="secondary">
                    <span className="flex items-center justify-center">
                        <svg
                            className="h-6 w-6 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            width="800"
                            height="800"
                            viewBox="-0.5 0 48 48"
                        >
                            <path
                                d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                fill="#FBBC05"
                            />
                            <path
                                d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                fill="#EB4335"
                            />
                            <path
                                d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                fill="#34A853"
                            />
                            <path
                                d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                fill="#4285F4"
                            />
                        </svg>
                        Continue with Google
                    </span>
                </Button>
            </div>
            {/* sign in with google end */}
            {/* link start */}
            <p className="text-center text-sm mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-teal-600 font-medium">
                    Sign in here
                </Link>
            </p>
            {/* link end */}
        </>
    )
}

export default FormSignUp