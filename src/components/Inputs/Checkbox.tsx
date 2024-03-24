import { classNames } from "~/utils/class-name.util";
import styles from "./inputs.module.css";

function Checkbox({ label, value }: { label: string; value: string }) {
  return (
    <label
      htmlFor={label}
      className={classNames(
        "flex items-center gap-3",
        styles.checkBoxContainer,
      )}
    >
      <input type="checkbox" name="coding" value={value} />
      {label}
    </label>
  );
}

export default Checkbox;
