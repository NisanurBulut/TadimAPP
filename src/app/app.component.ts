import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as fromAuthActions from './auth/store/auth.actions';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, @Inject(DOCUMENT) private document,
    private renderer: Renderer2, private router: Router,
    private activatedRoute: ActivatedRoute) { }
  // this.store.dispatch(new fromAuthActions.AutoLogin());
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((data) => this.updateBodyClass(data.bodyClass));
  }

  private updateBodyClass(customBodyClass: string) {
    console.log(customBodyClass);
    this.renderer.setAttribute(this.document.body, 'class', '');
    if (customBodyClass) {
      this.renderer.addClass(this.document.body, customBodyClass);
    }
  }
}
