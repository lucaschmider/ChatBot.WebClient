import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterDataAddDialogComponent } from '../master-data-add-dialog/master-data-add-dialog.component';

@Component({
  selector: 'app-master-data-table',
  templateUrl: './master-data-table.component.html',
  styleUrls: ['./master-data-table.component.scss']
})
export class MasterDataTableComponent implements OnInit {
  @Input() public tableName: string;

  dataSource = [{ departmentName: "Lorem", mock: "Hallo" }, { departmentName: "Ipsum", mock: "Welt" }, { departmentName: "Dolor", mock: "dhgjs" }]
  dataColumns = [{ key: "departmentName", name: "Abteilung" }, { key: "mock", name: "Test Daten" }]
  displayedColumns = ["departmentName", "mock", "deleteData"]
  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public addData(): void {
    this.matDialog.open(MasterDataAddDialogComponent, { data: this.dataColumns })
  }
}
