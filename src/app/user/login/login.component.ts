import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {}

  public async login(): Promise<void> {
    const loginResult = await this.authService.signIn(this.loginForm.value);
    if (!loginResult.wasSuccessful) {
      this.snackBar.open(loginResult.errorCode, null, {
        duration: 3000
      });
    }
  }
}
