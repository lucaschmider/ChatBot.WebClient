import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  public userFormGroup: FormGroup;
  constructor() {
    this.userFormGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      isAdmin: new FormControl(false)
    });
  }

  ngOnInit(): void {
  }

  public createUser(): void {
    console.log(this.userFormGroup.value);
  }
}
