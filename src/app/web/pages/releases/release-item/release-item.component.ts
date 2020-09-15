import {Component, Input, OnInit} from '@angular/core';
import {ItemInterface} from '../../../interfaces/item.interface';

@Component({
  selector: 'app-release-item',
  templateUrl: './release-item.component.html',
  styles: [
  ]
})
export class ReleaseItemComponent implements OnInit {

  @Input() item: ItemInterface;
  constructor() { }

  ngOnInit(): void {
  }

}
