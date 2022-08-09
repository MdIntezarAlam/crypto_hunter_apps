import { Box, Button, TextField } from "@material-ui/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firebse";
import React, { useState } from "react";
import { CryptoState } from "../../CryptoContext";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "All Fields are required",
        type: "Error",
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful, Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose()
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "19PX" }}
    >
      <TextField
        label="Enter Your Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Enter Your Password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: "blue",
          color: "#fff",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Signup;
