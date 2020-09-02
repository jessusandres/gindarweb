import {Component, OnInit, ViewChild} from '@angular/core';

declare function WOW(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items = [
    {code: 1, tag: 'example'},
    {code: 2, tag: 'example'},
    {code: 3, tag: 'example'}
  ];

  featured = [
    {code: 1, tag: 'example'},
    {code: 2, tag: 'example'},
    {code: 3, tag: 'example'},
    {code: 4, tag: 'example'},
    {code: 5, tag: 'example'},
    {code: 6, tag: 'example'},
    {code: 7, tag: 'example'},
    {code: 8, tag: 'example'}
  ];

  videoItems = [
    {
      code: 4,
      url: 'cJmyzpUPaRU',
      text: 'RELOJ INVICTA TRITNITE',
    },
    {
      code: 4,
      url: 'cJmyzpUPaRU',
      text: 'RELOJ INVICTA TRITNITE',
    },
  ];

  @ViewChild('featuredItems') container;

  constructor() {
  }

  ngOnInit(): void {
    WOW().init();
  }

  goToFeatured(): void {
    this.container.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
