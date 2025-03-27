import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

// const BASE_URL = "http://localhost:5000/api/transactions/";
const BASE_URL = "https://full-stack-mern-project-p5ay.vercel.app/api/transactions/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    
    // Create axios instance with current token
    const getAxiosInstance = () => {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    };

    const addIncome = async (income) => {
        try {
            const response = await getAxiosInstance().post(`income`, income);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income');
        }
    };
    
    const getIncomes = async () => {
        try {
            const response = await getAxiosInstance().get(`incomes`);
            setIncomes(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes');
        }
    };

    const deleteIncome = async (id) => {
        try {
            await getAxiosInstance().delete(`income/${id}`);
            getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income');
        }
    }

    const totalIncome = () => {
        return incomes.reduce((total, income) => total + income.amount, 0);
    }

    const addExpense = async (expense) => {
        try {
            await getAxiosInstance().post(`expense`, expense);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense');
        }
    }

    const getExpenses = async () => {
        try {
            const response = await getAxiosInstance().get(`expenses`);
            setExpenses(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses');
        }
    }

    const deleteExpense = async (id) => {
        try {
            await getAxiosInstance().delete(`expense/${id}`);
            getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting expense');
        }
    }

    const totalExpenses = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    }
    
    const transactionHistoryAll = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history;
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            transactionHistoryAll,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};