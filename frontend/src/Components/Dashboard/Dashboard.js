import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const {
        totalExpenses,
        incomes, 
        expenses, 
        totalIncome, 
        totalBalance, 
        getIncomes, 
        getExpenses,
        error,
        setError
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    useEffect(() => {
        if (error) {
            alert(error);
            setError(null);
        }
    }, [error]);

    // const minIncome = incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : 0;
    // const maxIncome = incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : 0;
    // const minExpense = expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : 0;
    // const maxExpense = expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : 0;

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;

        .chart-con {
            height: 400px;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1rem;
                margin-top: 2rem;

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    text-align: center;

                    p {
                        font-size: 2.5rem;
                        font-weight: 700;
                    }
                }

                .balance {
                    p {
                        font-size: 3rem;
                    }
                }
            }
        }

        .history-con {
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title {
                font-size: 1rem;
                span {
                    font-size: 1.5rem;
                }
            }
            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 600;
                    font-size: 1.2rem;
                }
            }
        }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .stats-con {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        .chart-con {
            .amount-con {
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            }
        }
    }

    @media (max-width: 768px) {
        .stats-con {
            gap: 1rem;
        }
        .chart-con {
            height: auto;
            .amount-con {
                /* Show amounts in two columns on tablets */
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;

                p {
                    font-size: 2rem;
                }
            }
        }
        .history-con {
            .salary-item {
                flex-direction: column;
                align-items: center;

                p {
                    font-size: 1rem;
                }
            }
        }
    }

    @media (max-width: 480px) {
        .chart-con {
            .amount-con {
                /* Stack amounts vertically in one column on mobile */
                grid-template-columns: 1fr;
                gap: 0.75rem;

                .income, .expense, .balance {
                    padding: 0.75rem;
                }

                p {
                    font-size: 1.5rem;
                }
            }
        }
        .history-con {
            .salary-title {
                font-size: 0.9rem;
                span {
                    font-size: 1.2rem;
                }
            }
            .salary-item {
                padding: 0.5rem;
                p {
                    font-size: 0.9rem;
                }
            }
        }
    }
`;
export default Dashboard;
