import styled from "styled-components";
import bg from './img/bg.png'
import './App.css';
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";

function App() {
  return (
   <AppStyled bg={bg} className="App">
    <Orb/>
    <MainLayout>
      <h1>hello how are you </h1>
      </MainLayout>
   </AppStyled>
    
  );
}

const AppStyled  = styled.div`
height:100vh;
background-image:url(${props=>props.bg});
postion:relative`;

export default App;
