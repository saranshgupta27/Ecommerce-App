import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "~/constants/routes";
import { useAuth } from "~/utils/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(routes.INTERESTS);
      return;
    }
    router.push(routes.LOGIN);
  });

  return <></>;
}
