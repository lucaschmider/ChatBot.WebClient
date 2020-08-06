import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterDataAddDialogComponent } from '../master-data-add-dialog/master-data-add-dialog.component';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { ICollectionField } from 'src/app/shared/models/ICollectionField';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';

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
    this.matDialog
      .open(MasterDataAddDialogComponent, { data: this.dataColumns })
      .afterClosed()
      .subscribe(data => {
        this.createData(data);
      });
  }

  public async createData(data: any) {
    if (!data || data === "") {
      return;
    }

    const transformedData = this.transformData(data);
    const dialogRef = this.matDialog.open(LoadingSpinnerComponent, { hasBackdrop: false });
    await this.masterDataService.CreateKnowledgeAsync(transformedData);
    dialogRef.close();
  }

  public transformData(dialogData: any): any {
    return {
      definitiontype: dialogData.definitiontype,
      description: dialogData.description,
      synonyms: dialogData.keywords.split(","),
      name: dialogData.name
    };
  }
}
