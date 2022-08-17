import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const ws = Stomp.over(() => new SockJS("https://localhost:3000/ws/chat"));

function getWebsocket() {
    return ws;
}

export { getWebsocket };