import "./Bye.css";
import Hello from './Hello';
import Wrapper from "./Wrapper";

function Bye() {

    return (
        <Wrapper>
            <Hello name="react" color="red"/>
            <Hello color="blue"/>
        </Wrapper>
       );       
    }

export default Bye;