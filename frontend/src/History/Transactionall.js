import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { dollar } from '../utils/Icons';

function TransactionHistoryAll() {
    const { transactionHistoryAll, incomes, expenses } = useGlobalContext();

    const [...history] = transactionHistoryAll();

    // Calculate min and max incomes & expenses
    const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
    const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
    const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
    const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            <div className="history-list">
                {history.map((item) => {
                    const { _id, title, amount, type } = item;
                    return (
                        <div key={_id} className="history-item">
                            <p className="title">{title}</p>
                            <p className={`amount ${type === 'expense' ? 'expense' : 'income'}`}>
                                {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
                            </p>
                        </div>
                    )
                })}
            </div>

            {/* Income and Expense Statistics */}
            <div className="history-con">
                <h2 className="salary-title">
                    Min <span>Income</span> Max
                </h2>
                <div className="salary-item">
                    <p>{dollar}{minIncome}</p>
                    <p>{dollar}{maxIncome}</p>
                </div>
                <h2 className="salary-title">
                    Min <span>Expense</span> Max
                </h2>
                <div className="salary-item">
                    <p>{dollar}{minExpense}</p>
                    <p>{dollar}{maxExpense}</p>
                </div>
            </div>
        </HistoryStyled>
    );
}

// Styled Components
const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Poppins', sans-serif; /* Matching Dashboard Font */

    h2 {
        font-size: 1.6rem; /* Slightly increased for emphasis */
        color: #222260; /* Matching Dashboard Heading Color */
        font-weight: 700; /* Matching font weight */
        text-align: center;
    }

    .history-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .history-item {
        background: #ffffff;
        border: 2px solid #eee;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
        padding: 1rem;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem; /* Matching font size */
        font-weight: 600;
        transition: all 0.3s ease-in-out;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
        }

        .title {
            font-weight: 500;
            color: #555;
            font-size: 1.2rem; /* Uniform font size */
        }

        .amount {
            font-weight: bold;
            font-size: 1.5rem; /* Matching dashboard text */
        }

        .expense {
            color: red;
        }

        .income {
            color: green;
        }
    }

    .history-con {
        background: #ffffff;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
        text-align: center;

        h2 {
            font-size: 1.4rem; /* Matching Dashboard Font Size */
            color: #222260;
            font-weight: 700;
            margin-bottom: 1rem;
            span {
                font-size: 1.6rem;
                color: #007bff;
            }
        }

        .salary-item {
            display: flex;
            justify-content: space-between;
            background: #f4f4f4;
            padding: 1rem;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.5rem; /* Uniform font size */

            p {
                flex: 1;
                text-align: center;
            }
        }
    }
`;


export default TransactionHistoryAll;