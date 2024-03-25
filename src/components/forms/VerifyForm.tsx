import { useState } from "react";
import styles from "~/components/forms/forms.module.css";
import { classNames } from "~/utils/class-name.util";
import EmailVerificationInput from "../Inputs/EmailVerificationInput";

interface VerifyFormProps {
  email: string;
  onVerify: (verificationCode: number) => Promise<void>;
}

const VerifyForm = ({ email, onVerify }: VerifyFormProps) => {
  const [verificationCode, setVerificationCode] = useState<number>();

  function maskEmail(email: string): string {
    const [localPart, domainPart] = email.split("@");

    // Get the first three characters of the local part
    const maskedLocalPart = localPart?.slice(0, 3);
    // Mask the remaining characters of the local part with asterisks
    const maskedCharacters =
      localPart?.length && "*".repeat(localPart?.length - 3);

    return `${maskedLocalPart}${maskedCharacters}@${domainPart}`;
  }

  return (
    <div
      className={classNames(
        styles.formContainer,
        "mt-10 flex flex-col rounded-3xl border border-solid border-stone-300 bg-white px-14 pt-10 text-base",
      )}
    >
      <div
        className="self-center font-semibold text-black"
        style={{ fontSize: "2rem" }}
      >
        Verify your email
      </div>
      <div
        className="mb-3 mt-9 text-center text-base"
        style={{ fontWeight: 500 }}
      >
        Enter the 8 digit code you have received on <b>{maskEmail(email)}</b>
      </div>

      <EmailVerificationInput
        onChange={(receivedCode: number) => setVerificationCode(receivedCode)}
      />

      <button
        onClick={() => onVerify(verificationCode ?? 0)}
        className="mb-15 mt-2 items-center justify-center rounded-md border border-solid border-black bg-black py-4.5 text-center font-medium uppercase tracking-wider text-white"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyForm;
