import { useEffect } from "react";
import { routes } from "~/constants/routes";
import { useAuth } from "~/utils/AuthContext";

export default function Home() {
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      return (window.location.href = routes.INTERESTS);
    }
    window.location.href = routes.LOGIN;
  });

  return <></>;
}
