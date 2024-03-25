import { useRouter } from "next/navigation";
import LoginForm from "~/components/forms/LoginForm";
import { routes } from "~/constants/routes";
import { useAuth } from "~/utils/AuthContext";

function Login() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) {
    router.push(routes.INTERESTS);
    return;
  }

  return <LoginForm />;
}

export default Login;
