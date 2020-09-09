import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [
  ]
})
export class FeaturedProductComponent implements OnInit {

  @Input() outstanding: any;

  constructor() { }

  ngOnInit(): void {
  }

}
