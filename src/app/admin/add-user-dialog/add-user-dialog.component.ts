import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MasterDataService } from "../../shared/services/master-data.service";
@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  public userFormGroup: FormGroup;
  public departments: string[] = [];
  constructor(
    masterDataService: MasterDataService
  ) {
    masterDataService.GetDepartmentsAsync().then(departments => this.departments = departments);
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

  // public async createUser(): Promise<void> {
  //   const newUser = await this.userService.CreateUserAsync(
  //     this.userFormGroup.value
  //   );
  //   console.log(newUser);
  // }
}
