import classes from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {

    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const history = useHistory();


    const emailPassHandler = (event) => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value,
        })
    }

    const signUpHandler = (event) => {
        event.preventDefault()
        axios
            .post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaUc0j5zYLLz_Wr79slNXhN7NMVhzzLhQ",
                {
                    email: state.email,
                    password: state.password,
                    returnSecureToken: true,
                })
            .then((response) => {
                const uId = response.data.localId;
                localStorage.setItem("uId", uId)
            })
            .catch((error) => {
                alert(error.response.data.error.message);
            })
        setState({
            email: "",
            password: "",
        })
    };

    const signInHandler = (event) => {
        event.preventDefault()
        axios
            .post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaUc0j5zYLLz_Wr79slNXhN7NMVhzzLhQ", {
                email: state.email,
                password: state.password,
                returnSecureToken: true,
            })
            .then((response) => {
                const uId = response.data.localId;
                localStorage.setItem("uId", uId)
                history.replace("/home")
            })
            .catch((error) => {
                alert("No User Found")
            })
    }




    return (
        <section className={classes.login}>
            <form>
                <h1>Colorify</h1>
                <input type="email" placeholder="email" name="email" value={state.email} onChange={emailPassHandler} />
                <input type="password" placeholder=" password" name="password" value={state.password} onChange={emailPassHandler} />
                <div>
                    <button className={classes.btn1} type="submit" onClick={signUpHandler}>
                        Sign Up
                    </button>
                    <button className={classes.btn2} type="submit" onClick={signInHandler}>
                        Sign In
                    </button>
                </div>
            </form>
        </section>
    );
};
export default Login;
