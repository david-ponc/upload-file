import { useRef, useState } from "react";
import styles from "styles/Dropzone.module.css";
import { DRAG_STATE } from "utils";

export default function Dropzone({ setFile }) {
  const area = useRef(null);
  const [drag, setDrag] = useState(DRAG_STATE.EMPTY);

  const handleDragEnter = (e) => {
    e.preventDefault();
    area.current.classList.add(`${styles.areaDragOver}`);
    area.current.textContent = "Drop files here";
    setDrag(DRAG_STATE.DRAG_OVER);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDrag(DRAG_STATE.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    area.current.classList.remove(`${styles.areaDragOver}`);
    area.current.textContent = "Drag & Drop files here";
    setDrag(DRAG_STATE.EMPTY);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    area.current.classList.remove(`${styles.areaDragOver}`);
    area.current.textContent = "Drag & Drop files here";
    setFile(e.dataTransfer.files[0]);
  };

  return (
    <div
      className={styles.area}
      ref={area}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      Drag & Drop files here
    </div>
  );
}
