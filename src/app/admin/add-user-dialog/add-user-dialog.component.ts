import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MasterDataService } from "../../shared/services/master-data.service";
import { Department } from "src/app/shared/models/Department";
@Component({
  selector: "app-add-user-dialog",
  templateUrl: "./add-user-dialog.component.html",
  styleUrls: ["./add-user-dialog.component.scss"]
})
export class AddUserDialogComponent implements OnInit {
  public userFormGroup: FormGroup;
  public departments: string[] = [];
  constructor(masterDataService: MasterDataService) {
    masterDataService.getCollectionDataAsync("departments").then((departments: Department[]) => {
      this.departments = departments.map((d) => d.departmentName);
    });
    this.userFormGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      isAdmin: new FormControl(false)
    });
  }

  ngOnInit(): void {}
}
