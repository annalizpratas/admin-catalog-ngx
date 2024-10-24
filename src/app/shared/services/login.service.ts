import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokenService } from '../utils/token.service';
import { StorageService } from '../utils/storage.service';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Router } from '@angular/router';
import { environment } from 'src/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingService } from 'src/app/shared/utils/loading.service';
import { MsgErroLoginService } from '../utils/msg-erro-login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private loadingService: LoadingService,
    private msgErroLoginService: MsgErroLoginService,
    private storageService: StorageService
  ) {}

  login(loginRequest: LoginRequest): void {
    this.loadingService.show();
    this.http
      .post(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        catchError((data: HttpErrorResponse) => {
          console.log(data.error);
          this.msgErroLoginService.show();
          this.loadingService.hide();
          return throwError(data);
        })
      )
      .subscribe((response: LoginResponse) => {
        if (response?.login) {
          this.tokenService.setAuthToken(response.token);
          this.storageService.setStorage('LOGGED', response.login.toString());
          this.router.navigate(['home']);
        } else {
          console.log(response.message);
          this.msgErroLoginService.show();
        }
        this.loadingService.hide();
      });
  }

  logout(): void {
    this.http
      .post(`${this.apiUrl}/logout`, {})
      .subscribe((response: { login: boolean }) => {
        if (!response?.login) {
          this.router.navigate(['/login']);
        }
      });
  }
}
