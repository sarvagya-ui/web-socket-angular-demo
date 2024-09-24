import { Component } from '@angular/core';
import { WebsocketService } from './service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: string = '';
  tempUsername: string = '';
  message = '';
  messages: any[] = [];
  users: string[] = [];

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.getMessage().subscribe((data: any) => {
      this.messages.push(data);
    });

    this.websocketService.getUserJoined().subscribe((data: any) => {
      this.messages.push({ user: 'System', message: `${data.username} has joined the chat.` });
    });

    this.websocketService.getUserLeft().subscribe((data: any) => {
      this.messages.push({ user: 'System', message: `${data.username} has left the chat.` });
    });

    this.websocketService.getUserList().subscribe((users: string[]) => {
      this.users = users;
    });
  }


  setUsername() {
    console.log('setUsername called');
    if (this.tempUsername.trim()) {
      this.username = this.tempUsername;
      this.websocketService.setUsername(this.username);
      console.log('Username set to:', this.username);
    } else {
      console.log('Username is empty');
    }
  }
  sendMessage() {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message);
      this.message = '';
    }
  }
}
