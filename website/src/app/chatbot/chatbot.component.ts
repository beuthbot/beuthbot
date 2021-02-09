import { environment } from './../../environments/environment.dev';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Gateway, BotRequest } from '@bhtbot/bhtbot';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, AfterViewInit {

  @ViewChildren('lastMessage') lastMessage: QueryList<ElementRef>;

  reply;

  gateway = new Gateway(environment.gateway_endpoint, 'website');

  message: BotRequest;

  createdTimestamp = new Date().getTime();
  cleanMessage;

  chatBots = [];

  constructor() { }

  ngAfterViewInit() {
    this.lastMessage.changes.subscribe(() => {
      if (this.lastMessage && this.lastMessage.last) {
        this.lastMessage.last.nativeElement.focus();
      }
    });
  }

  ngOnInit() {
  }

  messageRequest() {
    this.message = new BotRequest({
        text: this.cleanMessage,
        clientDate: this.createdTimestamp,
        clientLanguage: 'de'
    });
    return this.message;
  }

  chatbotReply(messageRequest) {
    messageRequest = this.messageRequest();
    this.gateway.query(messageRequest).then(botResponse => {
      console.log('bot responded', botResponse);
      if (botResponse && botResponse.answer && botResponse.answer.content) {
          const responseMessage = botResponse.answer.content;
          this.reply = responseMessage;
      /* } else {
      if (botResponse && botResponse.answer && botResponse.answer.error) {
          this.reply = botResponse.answer.error; */
      } else {
        this.reply = 'Unknown Error, probably cant connect to bot gateway';
      }
      // }
      this.chatBots.push({
        message: this.cleanMessage,
        reply: this.reply
      });
    });
  }

}
