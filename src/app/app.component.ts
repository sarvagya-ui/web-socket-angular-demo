import { Component } from '@angular/core';
import { WebsocketService } from './service/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message = '';
  messages: string[] = [];

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.getMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.message.trim()) {
      this.websocketService.sendMessage(this.message);
      this.message = '';
    }
  }
}
