import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import Register from "./Register";
import "./index.css";
import { TextField, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { getToken, getUserMail } from "../../redux/authReducer";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isRegister) {
      createUserWithEmailAndPassword(auth, mail, password)
        .then((res) => {
          // @ts-ignore
          dispatch(getToken(res.user.accessToken));
          dispatch(getUserMail(res.user.email));
          setError("");
        })
        .catch((err) => setError(err.message));
    } else {
      signInWithEmailAndPassword(auth, mail, password)
        .then((res) => {
          // @ts-ignore
          dispatch(getToken(res.user.accessToken));
          dispatch(getUserMail(res.user.email));
          setError("");
        })
        .catch((err) => setError(err.message));
    }
  };

  const logRegHandler = () => {
    setIsRegister((prev) => !prev);
    setError("");
  };

  return (
    <div className="register">
      <div className="bg-image" />
      <div className="container">
        <div className="content">
          <div className="wrapper">
            <form className="content-container" onSubmit={submitHandler}>
              <Typography variant="h3" sx={{ textAlign: "center" }}>
                {isRegister ? "Register" : "Log in"}
              </Typography>
              {isRegister ? (
                <Register
                  mail={mail}
                  setMail={setMail}
                  name={name}
                  setName={setName}
                  password={password}
                  setPassword={setPassword}
                  error={error}
                />
              ) : (
                <div className="text-fields">
                  <TextField
                    variant="standard"
                    label="Email"
                    type="email"
                    autoComplete="current-password"
                    error={error.length !== 0}
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <TextField
                    variant="standard"
                    label="Password"
                    type="password"
                    error={error.length !== 0}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
              <div>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ marginBottom: "1rem" }}
                >
                  {isRegister ? "Register" : "Log in"}
                </Button>
                <Typography textAlign={"center"} color={"red"}>
                  {error}
                </Typography>
              </div>
            </form>
            <Button onClick={logRegHandler} style={{ marginTop: "2rem" }}>
              {isRegister ? "Have an account?" : "Don't have an account yet?"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
