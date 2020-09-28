import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-culqi-form',
  templateUrl: './culqi-form.component.html',
  styleUrls: ['./culqi-form.component.css']
})
export class CulqiFormComponent implements OnInit {

  culqiFormGroup: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.culqiFormGroup = new FormGroup({
      cardNumber: new FormControl('', []),
      cardCVV: new FormControl('', []),
      cardMonth: new FormControl('', []),
      cardYear: new FormControl('', []),
    })
  }

}
