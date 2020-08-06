import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MasterDataAddDialogComponent } from '../master-data-add-dialog/master-data-add-dialog.component';
import { MasterDataService } from 'src/app/shared/services/master-data.service';
import { ICollectionField } from 'src/app/shared/models/ICollectionField';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { Knowledge } from 'src/app/shared/models/Knowledge';
import { InvalidInputComponent } from 'src/app/shared/invalid-input/invalid-input.component';

@Component({
  selector: 'app-master-data-table',
  templateUrl: './master-data-table.component.html',
  styleUrls: ['./master-data-table.component.scss']
})
export class MasterDataTableComponent implements OnInit {
  @Input() public tableName: string;

  public dataSource: any[] = [];
  public dataColumns: ICollectionField[];
  public displayedColumns: string[];


  constructor(
    private matDialog: MatDialog,
    private masterDataService: MasterDataService
  ) {

  }

  ngOnInit(): void {
    const dialogRef = this.matDialog.open(LoadingSpinnerComponent, { hasBackdrop: false });
    this.masterDataService.getCollectionSchemeAsync(this.tableName).then(scheme => {
      this.dataColumns = scheme.fields;
      this.displayedColumns = [...scheme.fields.map(x => x.key), "deleteData"];
    });
    this.masterDataService.GetKnowledgeAsync().then(data => {
      this.dataSource = data;
    });
    dialogRef.close();
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

    try {
      const dialogRef = this.matDialog.open(LoadingSpinnerComponent, { hasBackdrop: false });
      const transformedData = this.transformKnowledge(data);
      await this.masterDataService.createKnowledgeAsync(transformedData);
      dialogRef.close();
    } catch (error) {
      this.matDialog.open(InvalidInputComponent);
    }
  }

  private transformKnowledge(dialogData: any): Knowledge {
    return {
      definitiontype: dialogData.definitiontype,
      description: dialogData.description,
      synonyms: dialogData.keywords.split(","),
      name: dialogData.name
    };
  }

  public async deleteData(element: any): Promise<void> {
    const dialogRef = this.matDialog.open(LoadingSpinnerComponent, { hasBackdrop: false });
    this.masterDataService.deleteData(element, this.tableName);
    dialogRef.close();
  }
}
