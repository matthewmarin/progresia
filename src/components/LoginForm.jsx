import { useState } from "react";
import { Container, Stack, TextField, Button, Typography } from "@mui/material";
import LogoImg from "../assets/logo.png";
import ImageEl from "../components/ImageEl";

const initForm = {
  username: "",
  password: "",
};

const LoginForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);
  const [showInvalidAlert, setShowInvalidAlert] = useState(false);

  const authText = isLogin
    ? "Do not have an account?"
    : "Already have an account?";

  const handleInputChange = (e, field) => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (form.username === "Thewmat" && form.password === "qwerty123") {
      onLogin();
    } else {
    }
    setShowInvalidAlert(true);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 10,
      }}
    >
      <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
        <ImageEl
          sx={{ width: 500, height: 100 }}
          src={LogoImg}
          alt="Progresia"
        />
        <Typography color="rgba(255, 255, 255, .6)">
          Visualized Your Workflow for Increased Productivity.
          <br />
          Access Your Tasks Anytime, Anywhere
        </Typography>
      </Stack>
      <Stack spacing={2}>
        <TextField
          value={form.username}
          name="username"
          onChange={(e) => handleInputChange(e, "username")}
          label="Username"
        />
        <TextField
          value={form.password}
          name="password"
          type="password"
          onChange={(e) => handleInputChange(e, "password")}
          label="Password"
        />
        <Button
          onClick={onSubmit}
          disabled={!form.username.trim() || !form.password.trim()}
          size="large"
          variant="contained"
        >
          {isLogin ? "Login" : "Register"}
        </Button>
      </Stack>
      <Typography
        sx={{
          cursor: "pointer",
        }}
        onClick={() => setIsLogin(!isLogin)}
        mt={3}
        textAlign="center"
      >
        {authText}
      </Typography>
      {showInvalidAlert && (
        <Typography color="error" textAlign="center" mt={2}>
          Invalid username or password. Please try again.
        </Typography>
      )}
    </Container>
  );
};

export default LoginForm;
