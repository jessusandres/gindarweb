import {Component, Input, OnInit} from '@angular/core';
import {CoverSquareInterface} from "../../../interfaces/cover-squares.interface";

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [
  ]
})
export class FeaturedProductComponent implements OnInit {

  @Input() outstanding: CoverSquareInterface;

  constructor() { }

  ngOnInit(): void {
    console.log(this.outstanding)
  }

}
