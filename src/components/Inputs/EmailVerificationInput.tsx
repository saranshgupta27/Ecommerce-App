import React, { useEffect, useRef, useState } from "react";
import styles from "./inputs.module.css";

function EmailVerificationInput({
  onChange,
}: Readonly<{
  onChange: (code: number) => void;
}>) {
  const emptyArray = Array(8).fill("") as (HTMLInputElement | null)[];
  const [codes, setCodes] = useState<string[]>(Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(emptyArray);

  const handleChange = (index: number, value: string) => {
    if (isValidInput(value)) {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);

      if (shouldFocusNextInput(index, value)) {
        focusNextInput(index);
      }
    }
  };

  const isValidInput = (value: string): boolean => {
    return /^\d*$/.test(value);
  };

  const shouldFocusNextInput = (index: number, value: string): boolean => {
    return index < codes.length - 1 && value !== "";
  };

  const focusNextInput = (index: number) => {
    inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const clipboardData = e.clipboardData?.getData("text/plain") || "";
    const clipboardCodes = getNumericCharacters(clipboardData);
    updateCodesFromClipboard(clipboardCodes, index);
  };

  const getNumericCharacters = (data: string): string[] => {
    return data.match(/\d/g) ?? [];
  };

  const updateCodesFromClipboard = (
    clipboardCodes: string[],
    index: number,
  ) => {
    const newCodes = [...codes];
    clipboardCodes.slice(0, 8).forEach((code, i) => {
      newCodes[index + i] = code;
    });
    setCodes(newCodes.slice(0, 8));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (isBackspaceAndEmpty(index, e)) {
      removePreviousCode(index);
    } else if (isLastCharacterEntered(index, e)) {
      e.preventDefault();
    }
  };

  const isBackspaceAndEmpty = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): boolean => {
    return e.key === "Backspace" && index > 0 && codes[index] === "";
  };

  const removePreviousCode = (index: number) => {
    const newCodes = [...codes];
    newCodes[index - 1] = "";
    setCodes(newCodes);
    focusPreviousInput(index);
  };

  const focusPreviousInput = (index: number) => {
    inputRefs.current[index - 1]?.focus();
  };

  const isLastCharacterEntered = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): boolean => {
    return Boolean(
      index === 7 && codes[index] !== "" && e?.key?.match(/^[0-9]$/),
    );
  };

  const convertCodesToNumber = (): number => {
    const unifiedCode = codes.join("");
    return parseInt(unifiedCode);
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  useEffect(() => {
    onChange(convertCodesToNumber());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codes]);

  return (
    <div className="mb-16 mt-11 flex flex-col">
      <p className="mb-2 text-base">Code</p>
      <div className="flex items-center gap-3">
        {codes.map((code, index) => (
          <input
            className={styles.codeContainer}
            key={`${index}-${code}`}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={code}
            onChange={(e) => handleChange(index, e.target.value)}
            onPaste={(e) => handlePaste(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}

export default EmailVerificationInput;
