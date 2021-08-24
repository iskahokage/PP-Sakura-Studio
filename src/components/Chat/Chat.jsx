import { Avatar, Button, Grid, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { authContext } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from '../Loader/Loader';
import firebase from 'firebase';
import { MessageSharp } from '@material-ui/icons';

const Chat = () => {
    
  const { auth, firestore } = useContext(authContext);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState();
  const [message, loading] = useCollectionData(
      firebase.firestore().collection('messages').orderBy('createdAt')
  );
  
  const sendMessage= () => {
    firebase.firestore().collection('messages').add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    setValue('')
  }
  if(loading){
      return <Loader/>
  }
    return (
            <div className='chat'>
                <div className="chatContainer">
                    {message.map(message =>
                    <div className='messageContainer'>
                        <Grid container>
                            <Avatar src={message.photoURL}/>
                            <div>
                                {message.displayName}
                            </div>
                        </Grid>
                        <div>
                            {message.text}
                        </div>
                    </div>
                    )}
                </div>
                    <Grid
                    container
                    direction='column'
                    alignItems='center'
                    >
                        <TextField
                            maxRows={2}
                            variant='outlined'
                            value={value}
                            onChange={(e)=>setValue(e.target.value)}
                        />
                        <Button
                            variant='outlined'
                            onClick={sendMessage}
                        >Отправить сообщение</Button>
                    </Grid>
            </div>
    );
};

export default Chat;