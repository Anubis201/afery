import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(null, Validators.required),
    describe: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
  })

  constructor() { }

  ngOnInit(): void {
  }

  create() {

  }
}
