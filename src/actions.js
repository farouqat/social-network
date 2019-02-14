import axios from './axios';

export function receiveFriendsWannabes(){
    return axios.get("/friends-and-wannabes").then((results) => {
        return {
            type: 'RECEIVE_FRIENDS_WANNABES',
            list: results.data.rows
        };
    });
}

export function acceptFriendRequest(wannabeid){
    return axios.post("/accept-friend-request/" + wannabeid).then(()=> {
        return {
            type: 'ACCEPT_FRIEND',
            id: wannabeid
        };
    });
}

export function unfriend(friendid){
    return axios.post('/delete-friend-request/'+ friendid).then(()=>{
        return {
            type: 'UNFRIEND',
            id: friendid
        };
    });
}

export function onlines(onlineUsers){
    console.log("onlineUsers in action", onlineUsers);
    return {
        type: 'ONLINE_USERS',
        onlineUsers: onlineUsers
    };
}
export function userJoined(loggedInUserData){
    return {
        type: 'USER_JOINED',
        loggedInUserData: loggedInUserData
    };
}
export function userLeft(deletedId){
    return {
        type: 'USER_LEFT',
        id: deletedId
    };
}

export function send(sentmessage){
    return {
        type: 'SEND_MESSAGE',
        sentmessage: sentmessage
    };

}
