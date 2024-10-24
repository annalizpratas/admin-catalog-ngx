import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { ResponseModel } from '../models/reponse.model';
import { LoadingService } from 'src/app/components/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements HttpInterceptor {
  constructor(
    private router: Router,
    private storageService: StorageService,
    private loadingService: LoadingService
  ) {}

  setAuthToken(token: string | null): void {
    this.storageService.setStorage('AUTH_ALP', token);
  }

  getAuthToken(): string {
    return this.storageService.getStorage('AUTH_ALP');
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.show();
    return next.handle(request).pipe(
      tap((successesponse: HttpEvent<ResponseModel<any>>) => {
        if (successesponse instanceof HttpResponse) {
          if (request.method === 'GET') {
            return;
          }
          const successMsg = successesponse?.body;
          console.log('successMsg', successMsg)
        }
      }),
      catchError((errorResponse) => {
        if (
          errorResponse instanceof HttpErrorResponse &&
          (errorResponse.status === 401 || errorResponse.status === 403)
        ) {
          this.router.navigateByUrl('login');
        }
        const errorMsg = errorResponse?.error;
        console.error('errorMsg', errorMsg)
        return throwError(errorResponse);
      }),
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}
