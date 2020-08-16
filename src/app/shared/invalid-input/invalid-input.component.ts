import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-invalid-input",
  templateUrl: "./invalid-input.component.html",
  styleUrls: ["./invalid-input.component.scss"]
})
export class InvalidInputComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<InvalidInputComponent>) {}

  ngOnInit(): void {}

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
