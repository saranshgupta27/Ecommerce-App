import LoginForm from "~/components/forms/LoginForm";
import { routes } from "~/constants/routes";
import { useAuth } from "~/utils/AuthContext";

function Login() {
  const { user } = useAuth();

  if (user) {
    window.location.href = routes.INTERESTS;
    return;
  }

  return <LoginForm />;
}

export default Login;
