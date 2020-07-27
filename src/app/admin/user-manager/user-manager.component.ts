import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  displayedColumns: string[] = ['isAdmin', 'name', "email", 'department', 'uid'];
  public dataSource: User[];
  constructor(
    private matDialog: MatDialog,
    private userService: UserService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.userService.GetUsersAsync();
  }

  public async deleteUser(uid: string): Promise<void> {
    await this.userService.DeleteUserAsync(uid);
    this.dataSource = this.dataSource.filter(user => user.uid != uid);
  }

  public addUser(): void {
    const dialogRef = this.matDialog.open(AddUserDialogComponent, {
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(async data => {
      if (data) {
        const newUser = await this.userService.CreateUserAsync(data);
        this.dataSource = [...this.dataSource, newUser]
      }
    });
  }
}
