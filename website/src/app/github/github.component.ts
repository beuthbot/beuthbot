import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  constructor() { }

  ngOnInit() {
  }

}
