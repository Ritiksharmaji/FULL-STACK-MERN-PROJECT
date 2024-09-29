import React, { useContext, useState } from "react"
import axios from 'axios'


const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            if (response && response.data) {
                getIncomes(); // Fetch the updated list of incomes
            } else {
                setError("Failed to add income. No response data.");
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error occurred while adding income');
        }
    };
    
    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`);
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
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    

    return (
        <GlobalContext.Provider value={
            {addIncome, getIncomes, incomes,deleteIncome,totalIncome }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}