import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/shared/models/login-request.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { MsgErroLoginService } from 'src/app/shared/utils/msg-erro-login.service';
import { StorageService } from 'src/app/shared/utils/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  msgError = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private storageService: StorageService,
    private msgErroLoginService: MsgErroLoginService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.storageService.clearDataLogin();

    this.msgErroLoginService.msgErroLogin$.subscribe((msgErro) => {
      console.log('======', msgErro);
      if (msgErro) {
        this.msgError = 'Usuário ou senha inválidos';
      } else {
        this.msgError = '';
      }
    });
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
