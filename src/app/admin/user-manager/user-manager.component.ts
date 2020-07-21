import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: User[] = [
  { department: "Human Resources", isAdmin: true, name: "Max Mustermann", "uid": "dskajlk", email: "max.mustermann@gmail.com" },
  { department: "External Sales", isAdmin: false, name: "Bertha Mustermann", "uid": "dskajlk", email: "bertha.mustermann@gmail.com" },
];

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  displayedColumns: string[] = ['isAdmin', 'name', "email", 'department', 'uid'];
  dataSource = ELEMENT_DATA;

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public async deleteUser(uid: string): Promise<void> {
    console.log(uid);
  }

  public addUser(): void {
    const dialogRef = this.matDialog.open(AddUserDialogComponent, {
      hasBackdrop: true
    });
  }
}
