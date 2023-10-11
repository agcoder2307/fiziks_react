import React, { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";
interface registerProps {
  mail: string;
  setMail: Dispatch<SetStateAction<string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  error: string;
}

const Register = ({
  mail,
  setMail,
  password,
  setPassword,
  setName,
  name,
  error,
}: registerProps) => {
  return (
    <div className="text-fields">
      <TextField
        variant="standard"
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        variant="standard"
        label="Email"
        type="email"
        value={mail}
        error={error.length !== 0}
        onChange={(e) => setMail(e.target.value)}
      />
      <TextField
        variant="standard"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        error={error.length !== 0}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
};

export default Register;
