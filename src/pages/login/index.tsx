import LoginForm from "~/components/forms/LoginForm";
import { useAuth } from "~/utils/AuthContext";

function Login() {
  const { user } = useAuth();

  if (user) {
    return (window.location.href = "/interests");
  }

  return (
    <>
      <LoginForm />
    </>
  );
}

export default Login;
