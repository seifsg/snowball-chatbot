import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';
import { setInterval } from 'timers';

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
    const t = setInterval(() => {
      const mEtarget = mE.scrollHeight - mE.clientHeight;
      if (mE.scrollTop < mEtarget && mEtarget > 0) {
        mE.scrollTop = mEtarget;
      }else {
        clearInterval(t._id);
      }
    }, 100);
    setTimeout(() => clearInterval(t), 300);
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
