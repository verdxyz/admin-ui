import React, { useContext, useEffect, useState } from 'react'
import MainLayout from '../components/Layouts/MainLayout';
import Card from '../components/Elements/Card';
import CardBalance from '../components/Fragments/CardBalance';
import CardGoal from "../components/Fragments/CardGoal";
import CardUpcomingBill from "../components/Fragments/CardUpcomingBill";
import CardRecentTransaction from "../components/Fragments/CardRecentTransaction";
import CardStatistic from "../components/Fragments/CardStatistic";
import CardExpenseBreakdown from "../components/Fragments/CardExpenseBreakdown";
import { transactions, bills, expensesBreakdowns, balances, goals as goalsData, expensesStatistics } from '../data';
import { goalService, expensesService } from '../services/dataServices';
import { AuthContext } from '../context/authContext';
import AppSnackbar from '../components/Fragments/Snackbar';
import Icon from '../components/Elements/Icon';

function Dashboard() {
    const [goals, setGoals] = useState({});
    const [breakdown, setBreakdown] = useState([]);
    const { logout } = useContext(AuthContext);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const fetchGoals = async () => {
        try {
            const response = await goalService();
            console.log("1. Full API response:", response);
            console.log("2. response.data:", response.data);
            console.log("3. response.data[0]:", response.data?.[0]);

            // Extract goal from response.data array
            const rawGoalData = response.data && response.data[0] ? response.data[0] : {};
            console.log("4. Extracted rawGoalData:", rawGoalData);

            // Map API fields (snake_case) to component fields (camelCase)
            const goalData = {
                targetAmount: rawGoalData.target_amount ?? rawGoalData.targetAmount ?? 0,
                presentAmount: rawGoalData.present_amount ?? rawGoalData.presentAmount ?? 0,
            };
            console.log("5. Mapped goalData:", goalData);

            setGoals(goalData);
        } catch (err) {
            console.error("Gagal mengambil data goals:", err);
            if (err.status === 401) {
                logout();
            }
        }
    };

    useEffect(() => {
        fetchGoals();
        fetchExpensesBreakdown();
    }, []);

    console.log("Current goals state:", goals);

    const fetchExpensesBreakdown = async () => {
        try {
            const response = await expensesService();
            const expenses = response.expenses || (Array.isArray(response) ? response : []);

            // Calculate breakdown
            const categoryStats = expenses.reduce((acc, expense) => {
                const category = expense.category || "Others";
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category] += Number(expense.amount) || 0;
                return acc;
            }, {});

            const totalExpenses = Object.values(categoryStats).reduce((sum, amount) => sum + amount, 0);

            const breakdownData = Object.keys(categoryStats).map((category, index) => {
                const amount = categoryStats[category];
                const percentage = totalExpenses ? Math.round((amount / totalExpenses) * 100) : 0;

                // Helper to get icon
                const getIcon = (cat) => {
                    switch (cat.toLowerCase()) {
                        case "housing": return <Icon.House />;
                        case "food": return <Icon.Food />;
                        case "transportation": return <Icon.Transport />;
                        case "entertainment": return <Icon.Gamepad />;
                        case "shopping": return <Icon.Shopping />;
                        case "others": return <Icon.Other />;
                        default: return <Icon.Expense />;
                    }
                };

                // Deterministic arrow direction based on category
                // This ensures consistency regardless of sort order
                const upCategories = ['housing', 'shopping', 'others'];
                const isUp = upCategories.includes(category.toLowerCase());

                return {
                    id: index + 1,
                    category: category,
                    amount: amount,
                    percentage: percentage,
                    icon: getIcon(category),
                    arrow: (
                        <div className={isUp ? "text-red-500" : "text-emerald-500"}>
                            {isUp ? <Icon.ArrowUp size={16} /> : <Icon.ArrowDown size={16} />}
                        </div>
                    )
                };
            });

            // Sort by amount descending
            setBreakdown(breakdownData.sort((a, b) => b.amount - a.amount));

        } catch (error) {
            console.error("Dashboard: Failed to fetch expenses for breakdown:", error);

            // Check for 401 error (unauthorized) - same pattern as expenses.jsx
            if (error.response?.status === 401 || error.status === 401) {
                console.error("Dashboard: Unauthorized access in expenses breakdown, logging out");
                setSnackbar({
                    open: true,
                    message: "Session expired. Please login again.",
                    severity: "warning"
                });
                setTimeout(() => logout(), 1500);
            } else {
                // Set empty breakdown to prevent rendering errors
                setBreakdown([]);
            }
        }
    };

    useEffect(() => {
        fetchGoals();
        fetchExpensesBreakdown();
    }, []);

    console.log(goals);

    return (
        <MainLayout>
            <div className='grid sm:grid-cols-12 gap-6 '>
                <div className='sm:col-span-4'>
                    <CardBalance data={balances} />
                </div>
                <div className='sm:col-span-4'>
                    <CardGoal data={goals} />
                </div>
                <div className='sm:col-span-4'>
                    <CardUpcomingBill data={bills} />
                </div>
                <div className="sm:col-span-4 sm:row-span-2">
                    <CardRecentTransaction data={transactions} />
                </div>
                <div className="sm:col-span-8">
                    <CardStatistic data={expensesStatistics} />
                </div>
                <div className="sm:col-span-8">
                    <CardExpenseBreakdown data={breakdown} />
                </div>
            </div>
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />

        </MainLayout >
    );
}

export default Dashboard;