import React, { useContext, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/transactions/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});
const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    console.log(localStorage.getItem("token"));
    
    const addIncome = async (income) => {
        try {
            const response = await axiosInstance.post(`income`, income);
            if (response && response.data) {
                getIncomes(); 
            } else {
                setError("Failed to add income. No response data.");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error occurred while adding income');
        }
    };
    
    const getIncomes = async () => {
        try {
            const response = await axiosInstance.get(`incomes`);
            if (response && response.data) {
                setIncomes(response.data);
            } else {
                setError("Failed to fetch incomes. No response data.");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error occurred while fetching incomes');
        }
    };

    const deleteIncome = async (id) => {
        const res  = await axiosInstance.delete(`income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const addExpense = async (income) => {
        const response = await axiosInstance.post(`expense`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axiosInstance.get(`expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axiosInstance.delete(`expense/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }
    
    const transactionHistoryAll = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, history.length)
    }

    

    return (
        <GlobalContext.Provider value={
            { addIncome,
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
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}