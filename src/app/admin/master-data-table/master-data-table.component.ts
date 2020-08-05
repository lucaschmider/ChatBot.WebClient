import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterDataAddDialogComponent } from '../master-data-add-dialog/master-data-add-dialog.component';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { ICollectionField } from 'src/app/shared/models/ICollectionField';

@Component({
  selector: 'app-master-data-table',
  templateUrl: './master-data-table.component.html',
  styleUrls: ['./master-data-table.component.scss']
})
export class MasterDataTableComponent implements OnInit {
  @Input() public tableName: string;

  dataSource = [{ departmentName: "Lorem", mock: "Hallo" }, { departmentName: "Ipsum", mock: "Welt" }, { departmentName: "Dolor", mock: "dhgjs" }]
  dataColumns: ICollectionField[];
  displayedColumns: string[];
  constructor(
    private matDialog: MatDialog,
    private masterDataService: MasterDataService
  ) {

  }

  ngOnInit(): void {
    this.masterDataService.GetCollectionSchemeAsync(this.tableName).then(scheme => {
      this.dataColumns = scheme.fields;
      this.displayedColumns = [...scheme.fields.map(x => x.key), "deleteData"];
    });
    this.masterDataService.GetKnowledgeAsync().then(data => {
      this.dataSource = data;
    })
  }

  public addData(): void {
    this.matDialog.open(MasterDataAddDialogComponent, { data: this.dataColumns })
  }
}
