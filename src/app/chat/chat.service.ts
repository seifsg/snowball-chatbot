import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

import {ApiAiClient} from 'api-ai-javascript';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable()
export class ChatService {
  readonly token = environment.dialogflow.snowballBot;
  readonly client = new ApiAiClient({accessToken: this.token});
  fallbackText = 'Sorry, I don\'t understand that...yet.';
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  update(msg: Message) {
    this.conversation.next([msg]);
  }

  converse(msg: string) {
    if (msg.trim() !== '') {
      const userMessage = new Message(msg, 'user');
      this.update(userMessage);

      return this.client.textRequest(msg)
        .then(res => {
            let speech = res.result.fulfillment.speech;
            speech = speech.trim() === '' ? this.fallbackText : speech;
            const botMessage = new Message(speech, 'bot');
            this.update(botMessage);
        });
    }
  }

  /*talk() {
    this.client.textRequest('Who are you?')
    .then(res => console.log(res));
  }*/

}
