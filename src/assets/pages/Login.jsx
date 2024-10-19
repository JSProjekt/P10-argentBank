import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import Header from "../components/Header";


const Login = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    

    const trySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:3001/api/v1/user/login", {
                email,
                password,
            });
            setSuccess(true);
            setLoading(false);

            localStorage.setItem("token", response.data.token);
            navigate("/user");

        } catch (error) {
            setError("Invalid email or password");
            setLoading(false);
        }
    };


    return (
        <>
        <Header />
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}


                <form onSubmit={trySubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required                            
                            />
                    </div>

                    <div className="input-remember">
                        <input type="checkbox"
                            id="remember-me"                           
                            />

                        <label htmlFor="remember-me"
                        >Remember me
                        </label>
                    </div>
                    <button 
                    type="submit"
                    className="sign-in-button"
                    disabled={loading}
                    >
                      {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
            </section>
        </main>
        </>
    );
};


export default Login;