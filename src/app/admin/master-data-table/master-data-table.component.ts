import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
