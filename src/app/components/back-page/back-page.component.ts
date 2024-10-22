import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-page',
  templateUrl: './back-page.component.html',
  styleUrls: ['./back-page.component.scss'],
})
export class BackPageComponent {
  constructor(private router: Router) {}

  navigateToRoute(route: string) {
    this.router.navigate([route]);
  }
}
