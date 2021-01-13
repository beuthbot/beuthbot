import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css']
})
export class DiscordComponent implements OnInit {

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  constructor() { }

  ngOnInit() {
  }

}
