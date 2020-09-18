import * as firebase from "firebase";
import { hashString } from "utils";

const firebaseConfig = {
  apiKey: "AIzaSyBKvxGln5455IVRlB6oWjXfC-goGV9FY04",
  authDomain: "upload-file-app-3cd72.firebaseapp.com",
  databaseURL: "https://upload-file-app-3cd72.firebaseio.com",
  projectId: "upload-file-app-3cd72",
  storageBucket: "upload-file-app-3cd72.appspot.com",
  messagingSenderId: "228472815701",
  appId: "1:228472815701:web:da149576f1e16c710254dc",
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export const uploadFile = (file) => {
  const nameHashed = hashString(file.name);
  const ref = firebase.storage().ref(`files/${nameHashed}`);
  const task = ref.put(file);
  return task;
};
