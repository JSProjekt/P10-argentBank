import React from "react";
import { useState } from "react";

const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const trySubmit = (e) => {
        e.preventDefault();

        if (username === "" || password === "") {
            setSuccess("Successful Connexion");
            setError("");
        }
        else {
            setError("Invalid Username or Password");
            setSuccess("");
        }
    };
    

    return (

        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}


                <form onSubmit={trySubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label
                        ><input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label
                        ><input
                            type="password"
                            id="password" />
                    </div>

                    <div className="input-remember">
                        <input type="checkbox"
                            id="remember-me" />

                        <label htmlFor="remember-me"
                        >Remember me
                        </label>
                    </div>
         <button className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>
    );
};


export default Login;