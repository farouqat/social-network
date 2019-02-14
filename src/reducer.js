export default function (state = {}, action) {
    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        const list = { ...state, list: action.list };
        return  list ;
    }
    if (action.type == 'ACCEPT_FRIEND') {
        const friendslist = { ...state, list: state.list.map(friend => {
            if (friend.id == action.id) {
                return {
                    ...friend,
                    accepted: true
                };
            } else {
                return friend;
            }
        }) };
        return   friendslist ;
    }

    if (action.type == 'UNFRIEND') {
        const unfriendlist = { ...state, list: state.list.filter(friend => {
            return friend.id != action.id;
        }) };
        return  unfriendlist ;
    }

    if (action.type == 'ONLINE_USERS') {
        state = { ...state, onlineUsers: action.onlineUsers };
    }

    if (action.type == 'USER_JOINED') {
        state = { ...state, onlineUsers: [action.loggedInUserData]};
    }

    if (action.type == 'USER_LEFT') {
        state = { ...state, onlineUsers: state.onlineUsers.filter(i => {
            i.id != action.id;
        })
        };
    }

    // if (action.type == 'SEND_MESSAGE') {
    //     state = { ...state, sentmessage : action.sentmessage};
    //
    // }

    console.log("REDUX STATE", state);
    return  state ;

}
