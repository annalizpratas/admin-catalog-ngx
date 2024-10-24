import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MsgErroLoginService {
  private msgErroLoginSubject = new BehaviorSubject<boolean>(false);
  msgErroLogin$ = this.msgErroLoginSubject.asObservable();

  show() {
    this.msgErroLoginSubject.next(true);
  }

  hide() {
    this.msgErroLoginSubject.next(false);
  }
}
