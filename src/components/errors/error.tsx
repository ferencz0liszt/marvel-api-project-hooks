import Img from './error.gif'
import {FC} from "react";

const ErrorMessage: FC = () => {
    return(
        <img
            src={Img}
            alt="Error"
            style={{
                display: "block",
                width: "250px",
                height: "250px",
                objectFit: "contain",
                margin: "0 auto"
            }}/>
    )
}

export default ErrorMessage;