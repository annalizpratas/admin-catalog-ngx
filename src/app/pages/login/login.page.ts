import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/shared/models/login-request.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { StorageService } from 'src/app/shared/utils/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.storageService.clearDataLogin();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const username: string = this.loginForm.get('username').value;
      const password: string = this.loginForm.get('password').value;
      const loginData = new LoginRequest(username, password);

      this.loginService.login(loginData);
    } else {
      // TODO: MSG Apresentar MSG para tratar o formulário inválido se necessário
    }
  }
}
