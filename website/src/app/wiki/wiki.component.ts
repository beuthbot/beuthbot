import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  constructor() { }

  ngOnInit() {
  }

}
