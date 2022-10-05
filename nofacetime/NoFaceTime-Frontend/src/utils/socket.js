import io from 'socket.io-client';
import { SERVER_URL } from '../config/index';
export const socket = io(SERVER_URL);
