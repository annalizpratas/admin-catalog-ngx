import { Component } from '@angular/core';
import { StorageService } from './shared/utils/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'admin-catalog-ngx';

  constructor(private storageService: StorageService) {}

  get isLogged(): boolean {
    return Boolean(this.storageService.getStorage('LOGGED'));
  }
}
