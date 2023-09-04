import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Message {
  sender: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  userInput = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messages.push({ sender: 'me', text: this.userInput });

    // Mocking an HTTP request. Replace the below with a real HTTP call.
    of({ text: 'Server response for: ' + this.userInput })
      .pipe(delay(1000))
      .subscribe(response => {
        this.messages.push({ sender: 'server', text: response.text });
      });

    this.userInput = '';
  }
}
