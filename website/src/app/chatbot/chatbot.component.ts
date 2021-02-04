import { Component, OnInit } from '@angular/core';
import {Gateway, BotRequest} from '@bhtbot/bhtbot';
import {config as dotenvConig} from 'dotenv';

// use `dotenv` to ready `.env` file even when not running with docker-compose
dotenvConig();

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  reply = '';
  message;

  gateway = new Gateway(process.env.GATEWAY_ENDPOINT, 'website');

  constructor() { }

  ngOnInit() {

    this.message = new BotRequest({
      text: 'Hello World',
      serviceUserId: 1,
      clientDate: new Date().getTime(),
      clientLanguage: 'de',
      firstName: 'test',
    });

    this.gateway.query(this.message).then(botResponse => {
      console.log('bot responded', botResponse);
      if (botResponse && botResponse.answer && botResponse.answer.content) {
          const responseMessage = botResponse.answer.content;
          this.reply = responseMessage;
      } else {
        this.reply = 'ERROR cant connect to bot gateway';
      }
    });
  }

}
