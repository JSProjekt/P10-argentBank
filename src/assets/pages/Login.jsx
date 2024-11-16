import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { userLogin, selectUserInfo, selectLoading, selectError } from "../../redux/reducers/userSlices";


const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const loading = useSelector(selectLoading);
    const userInfo = useSelector(selectUserInfo);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (userInfo) {
            const from = location.state?.from?.pathname || "/user";
            navigate(from, { replace: true });
        }
    }, [userInfo, navigate, location.state?.from?.pathname]);

    const trySubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(userLogin({ email, password })).unwrap();
        } catch (error) { 
            console.error("Failed to sign in", error);
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

                    <form onSubmit={trySubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
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
                                placeholder="Password"
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