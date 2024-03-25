import { useRouter } from "next/navigation";
import InterestsForm from "~/components/forms/InterestsForm";
import { useAuth } from "~/utils/AuthContext";

function Interests() {
  const router = useRouter();
  const { user } = useAuth();

  if (user && typeof window !== "undefined") {
    return (
      <div>
        <InterestsForm />
      </div>
    );
  }
  return <></>;
}

export default Interests;
