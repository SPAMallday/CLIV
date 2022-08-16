import api from "./api";

function fetchCreateRoom(success, fail) {
    api.get("chat/room").then(success).catch(fail);
}

function fetchChatList(authId, success, fail) {
    api.get(`chat/rooms/${authId}`).then(success).catch(fail);
}

function fetchChatRoom(roomId, success, fail) {
    api.get(`chat/room/${roomId}`).then(success).catch(fail);
}

export { fetchCreateRoom, fetchChatList, fetchChatRoom };