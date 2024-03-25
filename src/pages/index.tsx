import { useEffect } from "react";
import { routes } from "~/constants/routes";

export default function Home() {
  useEffect(() => {
    window.location.href = routes.LOGIN;
  });

  return <></>;
}
