
import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";

function Income(){

    return(
        <IncomeStyled>
            <InnerLayout>
           <h1>Income Page</h1>
           <div className="income-content">
            <div className="form-container">

            </div>
            <div className="incomes">
                <Form/>
            </div>
           </div>
            </InnerLayout>
           
        </IncomeStyled>
    )
}
const IncomeStyled=styled.div`


`;
export default Income;