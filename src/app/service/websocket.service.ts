import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private socket: Socket) { }

  setUsername(username: string) {
    console.log('Emitting setUsername event:', username);
    this.socket.emit('setUsername', username);
  }

  sendMessage(message: string) {
    console.log('Emitting message event:', message);
    this.socket.emit('message', message);
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent<any>('message');
  }

  getUserJoined(): Observable<any> {
    return this.socket.fromEvent<any>('userJoined');
  }

  getUserLeft(): Observable<any> {
    return this.socket.fromEvent<any>('userLeft');
  }

  getUserList(): Observable<string[]> {
    return this.socket.fromEvent<string[]>('userList');
  }
}
