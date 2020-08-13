import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void { }

  public async login(): Promise<void> {
    if (this.loginForm.invalid)
      return;

    const dialogRef = this.dialog.open(LoadingSpinnerComponent, { hasBackdrop: false });
    const loginResult = await this.authService.signIn(this.loginForm.value);
    dialogRef.close();
    if (!loginResult.wasSuccessful) {
      this.snackBar.open(loginResult.errorCode, null, {
        duration: 3000
      });
    }
  }
}
