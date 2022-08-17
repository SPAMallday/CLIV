import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ws = Stomp.over(() => new SockJS('ws://localhost:8080/ws/chat'));

// https://i7a605.p.ssafy.io/

function getWebsocket() {
  return ws;
}

export { getWebsocket };
