import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));
    this.messages.subscribe(() => this.scrollDown());
  }


  scrollDown() {
    const mE = document.getElementById('messages');
    setTimeout(() => {
      const mEtarget = mE.scrollHeight - mE.clientHeight;
        mE.scrollTop = mEtarget;
    }, 100);
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
