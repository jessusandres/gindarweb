import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styles: []
})
export class ReleasesComponent implements OnInit {
  releases = [1, 2, 3, 4, 5];

  constructor() {
  }

  ngOnInit(): void {
  }

}
