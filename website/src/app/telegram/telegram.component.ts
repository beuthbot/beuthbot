import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.css']
})
export class TelegramComponent implements OnInit {

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  constructor() { }

  ngOnInit() {
  }

}
