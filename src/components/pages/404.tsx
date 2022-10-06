import ErrorMessage from "../errors/error";
import { Link } from "react-router-dom";

const Page404 = () => {

    return (
        <>
            <ErrorMessage/>
            <h2 style={{textAlign: "center"}}>
                <Link to={"/"}>
                    Back to the main page.
                </Link>
            </h2>
        </>
    )
}

export default Page404;
