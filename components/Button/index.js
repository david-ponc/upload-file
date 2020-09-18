import { useRef } from "react";
import styles from "styles/Button.module.css";

export default function Button({ children, setFile }) {
  const input = useRef(null);

  const handleClickButton = () => {
    input.current.click();
  };

  const handleChange = () => {
    setFile(input.current.files[0]);
  };

  return (
    <>
      <input
        ref={input}
        onChange={handleChange}
        className={styles.inputFile}
        type="file"
      />
      <button onClick={handleClickButton} className={styles.btn}>
        {children}
      </button>
    </>
  );
}
