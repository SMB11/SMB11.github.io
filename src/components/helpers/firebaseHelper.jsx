import { db } from "../configs/firebase_config";

export function getHistory(uid) {
  try {
    db.ref("scores")
      .child(uid)
      .once("value")
      .then(snapshot => {
        return snapshot.val();
      });
  } catch (error) {
    console.log(error);
  }
}
