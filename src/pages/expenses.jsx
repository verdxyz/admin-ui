import React, { useEffect, useState, useContext } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import CardExpense from "../components/Fragments/CardExpense";
import { expensesService } from "../services/dataServices";
import { AuthContext } from "../context/authContext";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchExpenses = async () => {
            setLoading(true);
            try {
                // Check if token exists
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found, logging out");
                    logout();
                    return;
                }

                const data = await expensesService();

                // Add detailed transactions to each expense category
                const expensesWithDetails = (data.expenses || (Array.isArray(data) ? data : [])).map(expense => {
                    // Add sample details based on category
                    let details = [];

                    switch (expense.category?.toLowerCase()) {
                        case "housing":
                            details = [
                                { id: 1, transactionName: "House Rent", amount: 150, date: "17 May 2023" },
                                { id: 2, transactionName: "Parking", amount: 50, date: "18 May 2023" }
                            ];
                            break;
                        case "food":
                            details = [
                                { id: 1, transactionName: "Grocery Shopping", amount: 150, date: "18 May 2023" },
                                { id: 2, transactionName: "Restaurant Dinner", amount: 85, date: "19 May 2023" }
                            ];
                            break;
                        case "transportation":
                            details = [
                                { id: 1, transactionName: "Gas Station", amount: 25, date: "18 May 2023" },
                                { id: 2, transactionName: "Uber Ride", amount: 15, date: "20 May 2023" }
                            ];
                            break;
                        case "entertainment":
                            details = [
                                { id: 1, transactionName: "Movie Ticket", amount: 15, date: "17 May 2023" },
                                { id: 2, transactionName: "Concert", amount: 45, date: "19 May 2023" }
                            ];
                            break;
                        case "shopping":
                            details = [
                                { id: 1, transactionName: "GTR 5", amount: 160, date: "17 May 2023" },
                                { id: 2, transactionName: "Polo Shirt", amount: 20, date: "17 May 2023" }
                            ];
                            break;
                        case "others":
                            details = [
                                { id: 1, transactionName: "Healthcare", amount: 120, date: "17 May 2023" },
                                { id: 2, transactionName: "Insurance", amount: 200, date: "18 May 2023" }
                            ];
                            break;
                        default:
                            details = [];
                    }

                    return {
                        ...expense,
                        details: details
                    };
                });

                setExpenses(expensesWithDetails);
            } catch (error) {
                console.error("Failed to fetch expenses:", error);

                // Check for 401 error (unauthorized)
                if (error.response?.status === 401 || error.status === 401) {
                    console.error("Unauthorized access, logging out");
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [logout]);

    return (
        <MainLayout>
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-800">Expenses Comparison</h1>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {expenses.map((expense, index) => (
                        <CardExpense key={expense.id || index} data={expense} />
                    ))}
                </div>
            )}
        </MainLayout>
    );
};

export default Expenses;
