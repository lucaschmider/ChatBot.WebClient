import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/User";
import { MatDialog } from "@angular/material/dialog";
import { AddUserDialogComponent } from "../add-user-dialog/add-user-dialog.component";
import { UserService } from "src/app/shared/services/user.service";
import { LoadingSpinnerComponent } from "src/app/shared/loading-spinner/loading-spinner.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-manager",
  templateUrl: "./user-manager.component.html",
  styleUrls: ["./user-manager.component.scss"]
})
export class UserManagerComponent implements OnInit {
  displayedColumns: string[] = ["isAdmin", "name", "email", "department", "uid"];
  public dataSource: User[];
  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.dataSource = await this.userService.GetUsersAsync();
  }

  public async deleteUser(uid: string): Promise<void> {
    const dialogRef = this.matDialog.open(LoadingSpinnerComponent);
    await this.userService.DeleteUserAsync(uid);
    this.dataSource = this.dataSource.filter((user) => user.uid != uid);
    dialogRef.close();
  }

  public addUser(): void {
    const dialogRef = this.matDialog.open(AddUserDialogComponent, {
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(async (data) => {
      if (data) {
        await this.createUserAsync(data);
      }
    });
  }

  private async createUserAsync(data: any) {
    const loadingDialogRef = this.matDialog.open(LoadingSpinnerComponent);
    try {
      const newUser = await this.userService.CreateUserAsync(data);
      this.dataSource = [...this.dataSource, newUser];
    } catch (error) {
      this.matSnackBar.open(error.error.reason, null, { duration: 3000 });
    } finally {
      loadingDialogRef.close();
    }
  }
}
