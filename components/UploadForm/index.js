import { useEffect, useState } from "react";
import Button from "components/Button";
import Dropzone from "components/Dropzone";
import { FORM_STATE } from "utils";
import styles from "styles/UploadForm.module.css";
import { uploadFile } from "firebase/client";
import CheckIcon from "components/Icons/Check";
import { AnimatePresence, motion, AnimateSharedLayout } from "framer-motion";
import BarLoader from "react-bar-loader";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [state, setState] = useState(FORM_STATE.NORMAL);
  const [task, setTask] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    file !== null && setState(FORM_STATE.WITH_FILE);
    console.log(file);
  }, [file]);

  useEffect(() => {
    if (state === FORM_STATE.WITH_FILE) {
      console.log("iniciendo proceso de subida de archivos al servidor");
      const task = uploadFile(file);
      setTask(task);
    }
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (task) {
      const onProcess = () => setState(FORM_STATE.UPLOADING);
      const onError = () => setState(FORM_STATE.ERROR);
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setFileURL);
        setState(FORM_STATE.COMPELTE);
      };
      task.on("state_changed", onProcess, onError, onComplete);
    }
  }, [task]);

  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(fileURL);
  };

  return (
    <AnimatePresence>
      <AnimateSharedLayout>
        <motion.div
          className={styles.container}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          layout
        >
          {state === FORM_STATE.NORMAL && (
            <motion.section
              transition={{ duration: 1.5, delay: 0.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>Upload your image</h3>
              <span>File should be jpeg, jpg, png, gif.</span>
              <Dropzone setFile={setFile} />
              <span className={styles.separate}>or</span>
              <Button setFile={setFile}>Choose a file</Button>
            </motion.section>
          )}

          {state === FORM_STATE.UPLOADING && (
            <motion.section
              transition={{ duration: 1.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>Uploading...</h3>
              <BarLoader
                color="#2F80ED"
                height="4"
                style={{ width: "338px" }}
              />
            </motion.section>
          )}

          {state === FORM_STATE.COMPELTE && fileURL && (
            <motion.section
              transition={{ duration: 1.5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CheckIcon className={styles.checkIcon} />
              <h3>Uploaded Successfully!</h3>
              <img loading="lazy" className={styles.image} src={fileURL} />
              <div className={styles.copyContainer}>
                <input
                  className={styles.inputCopy}
                  type="text"
                  value={fileURL}
                />
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={handleCopyClipboard}
                  className={styles.buttonCopy}
                >
                  Copy
                </motion.button>
              </div>
            </motion.section>
          )}
        </motion.div>
      </AnimateSharedLayout>
    </AnimatePresence>
  );
}
