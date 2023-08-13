import { useState } from "react";
import { Container, Stack, TextField, Button, Typography } from "@mui/material";
import LogoImg from "../assets/logo.png";
import ImageEl from "../components/ImageEl";

const initForm = {
  email: "",
  password: "",
};

const LoginForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);

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
    // Simulate authentication logic here
    if (form.email === "1" && form.password === "1") {
      // Call the provided onLogin callback
      onLogin();
    } else {
      // Handle authentication failure
      // You can show an error message or perform other actions here
    }
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
          value={form.email}
          name="email"
          onChange={(e) => handleInputChange(e, "email")}
          label="Email"
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
          disabled={!form.email.trim() || !form.password.trim()}
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
    </Container>
  );
};

export default LoginForm;
