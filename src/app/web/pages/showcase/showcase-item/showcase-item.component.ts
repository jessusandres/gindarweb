import {Component, Input, OnInit} from '@angular/core';
import {ItemInterface} from '../../../interfaces/item.interface';

@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styles: []
})
export class ShowcaseItemComponent implements OnInit {

  @Input() item: ItemInterface;

  constructor() {
  }

  ngOnInit(): void {
  }

}
