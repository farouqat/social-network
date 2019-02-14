// all the FRONT END? socket code will go here
import * as io from 'socket.io-client';
import { onlines , userLeft , send , userJoined } from './actions';

let socket;

export function initSocket(store){
    if (!socket) {
        socket = io.connect();
        socket.on('onlines', onlineUsers  =>  {
            store.dispatch(onlines(onlineUsers));
        });

        socket.on('userJoined', loggedInUserData => {
            store.dispatch(userJoined(loggedInUserData));
        });

        socket.on('userLeft', deletedId =>{
            store.dispatch(userLeft(deletedId));
        });

        socket.on('newMessage', sentdata => {
            store.dispatch(send(sentdata));
        });

        // socket.on('chatMessages', user =>{
        //     store.dispatch(someActionCreator());
        // });

        // socket.on('chatMessage', user =>{
        //     store.dispatch(someActionCreator());
        // });
    }
    return socket;
}
//
// table to save the messages
// and send 10 messages everytime client conncects
