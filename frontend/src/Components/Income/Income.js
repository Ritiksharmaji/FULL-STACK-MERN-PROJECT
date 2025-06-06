
import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
import { useGlobalContext } from "../../context/globalContext";
import IncomeItem from "../IncomeItem/IncomeItem";

function Income(){

     const {addIncome,incomes, getIncomes,totalIncome,deleteIncome}= useGlobalContext()
     useEffect(()=>{
        getIncomes()
     },[])

    return(
        <IncomeStyled>
            <InnerLayout>
           {/* <h1>Income Page</h1> */}
           <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
           <div className="income-content">
            <div className="form-container">
            <Form/>
            </div>
            <div className="incomes">
               {incomes.map((income)=>{
                const {_id, title, amount, date, category, description, type}= income;
               
                // here we are rending the incomes to income 
                return <IncomeItem
                key={_id}
                id={_id} 
                title={title} 
                description={description} 
                amount={amount} 
                date={date} 
                type={type}
                category={category} 
                indicatorColor="var(--color-green)"
                deleteItem={deleteIncome}
                
                />
               })}
            </div>
           </div>
            </InnerLayout>
           
        </IncomeStyled>
    )
}
// const IncomeStyled=styled.div`
//   display: flex;
//     overflow: auto;
//     .total-income{
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         background: #FCF6F9;
//         border: 2px solid #FFFFFF;
//         box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//         border-radius: 20px;
//         padding: 1rem;
//         margin: 1rem 0;
//         font-size: 2rem;
//         gap: .5rem;
//         span{
//             font-size: 2.5rem;
//             font-weight: 800;
//             color: var(--color-green);
//         }
//     }
//     .income-content{
//         display: flex;
//         gap: 2rem;
//         .incomes{
//             flex: 1;
//         }
//     }


// `;

const IncomeStyled = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column; /* So total-income stays on top */

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;

    .form-container {
      flex: 1;
    }

    .incomes {
      flex: 1;
    }
  }

  /* Responsive for mobile */
  @media (max-width: 768px) {
    .income-content {
      flex-direction: column;
      gap: 1.5rem;

      .form-container,
      .incomes {
        flex: unset;
        width: 100%;
      }
    }

    .total-income {
      font-size: 1.6rem;
      padding: 0.8rem;

      span {
        font-size: 2rem;
      }
    }
  }
`;

export default Income;