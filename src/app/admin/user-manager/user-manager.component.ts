import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { auth } from 'firebase';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: User[] = [
  { department: "Human Resources", isAdmin: true, name: "Max Mustermann", "uid": "dskajlk", email: "max.mustermann@gmail.com" },
  { department: "External Sales", isAdmin: false, name: "Bertha Mustermann", "uid": "dskajeelk", email: "bertha.mustermann@gmail.com" },
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
    private matDialog: MatDialog,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  public async deleteUser(uid: string): Promise<void> {
    await this.userService.DeleteUserAsync(uid);
    this.dataSource = this.dataSource.filter(user => user.uid != uid);
  }

  public addUser(): void {
    const dialogRef = this.matDialog.open(AddUserDialogComponent, {
      hasBackdrop: true
    });
  }
}
