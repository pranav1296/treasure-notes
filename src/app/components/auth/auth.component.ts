import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveDataService } from 'src/app/services/save-data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin = true;
  errorMessage = '';
  constructor(private saveDataService: SaveDataService, private router: Router) { }

  ngOnInit(): void {
  }
  async onSubmit(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    let statusObj = { status: false, message: '' };
    if (this.isLogin) {
      statusObj = await this.saveDataService.login(email, password);
    } else {
      statusObj = this.saveDataService.signUp(email, password);
    }
    if (statusObj.status) {
      this.router.navigate(['/notes']);
    } else {
      this.errorMessage = statusObj.message;
    }
    loginForm.reset();
  }
  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

}
