import { db, auth } from "../configs/firebase_config";

export function loginHandler(email, password, mode) {
  //Login To Firebase
  if (mode === "signIn") {
    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
          alert("Success");
        })
        .catch(ex => {
          console.log(ex);
          alert(ex);
        });
    } catch (error) {
      console.log(error.toString());
    }
  } else {
    try {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
          alert("Success");
        })
        .catch(ex => {
          console.log(ex);
          alert(ex);
        });
    } catch (error) {
      console.log(error.toString());
    }
  }
}
export function signOut() {
  try {
    auth.signOut();
    alert("Success");
  } catch (ex) {
    alert(ex);
  }
}

// export function isLoggedIn() {
//   auth.onAuthStateChanged(user => {
//     if (user) {
//         this.props.navigation.navigate("DashBoardScreen")
//       console.log(user);
//     } else {
//       console.log('Please Log in');
//     }
//   });
// }
