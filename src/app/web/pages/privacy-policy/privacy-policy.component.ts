import {Component, OnInit} from '@angular/core';

declare function WOW(): any;

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  page = 'Políticas de privacidad';

  constructor() {
  }

  ngOnInit(): void {
    // WOW().init();
  }

}
