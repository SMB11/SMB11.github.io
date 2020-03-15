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

export function updateHistory(uid, score) {
  var date = new Date();
  try {
    db.ref("scores")
      .child(uid)
      .update({ [date]: score })
      .then(() => {
        alert("Your history is updated, Please refresh your page");
      });
  } catch (error) {
    alert(error);
  }
}
