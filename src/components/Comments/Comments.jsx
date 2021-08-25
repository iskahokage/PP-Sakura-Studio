import { Avatar, Button, Grid, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { authContext } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loader from "../Loader/Loader";
import firebase from "firebase";

const Comments = ({ id }) => {
  const { auth, firestore } = useContext(authContext);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState();
  const [comments, loading] = useCollectionData(
    firebase.firestore().collection(`comments.${id}`).orderBy("createdAt")
  );
  const sendMessage = () => {
    firebase.firestore().collection(`comments.${id}`).add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      email: user.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="chat">
      <div className="chatContainer">
        {comments.map((comments) => (
          <div
            className="messageContainer"
            style={{
              border:
                user.uid === comments.uid ? "2px solid green" : "2px dashed red",
              marginLeft: user.uid === comments.uid ? "auto" : "10px",
              borderRadius: "15px",
            }}
          >
            <div className="userMessage">
              <Avatar src={comments.photoURL} />
              {comments.email}
              <p className="messageBody">{comments.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Grid container direction="column" alignItems="center">
        <TextField
          maxRows={2}
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="outlined" onClick={sendMessage}>
          Отправить комментарий
        </Button>
      </Grid>
    </div>
  );
};

export default Comments;
