import Link from "next/link";
import { routes } from "~/constants/routes";

function NotFound() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      Error 404:Not Found <br />
      <Link href={routes.LOGIN}>Login</Link>
    </div>
  );
}

export default NotFound;
