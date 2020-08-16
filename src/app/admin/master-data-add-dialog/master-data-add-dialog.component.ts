import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-master-data-add-dialog",
  templateUrl: "./master-data-add-dialog.component.html",
  styleUrls: ["./master-data-add-dialog.component.scss"]
})
export class MasterDataAddDialogComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    const formControls = {};

    data.forEach((element) => {
      formControls[element.key] = new FormControl("");
    });
    this.formGroup = new FormGroup(formControls);
  }

  ngOnInit(): void {}
}
