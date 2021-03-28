import {Component, HostBinding, OnInit} from '@angular/core';

import {TranslateService} from '@ngx-translate/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public translate: TranslateService, public cookies: CookieService) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
    translate.currentLang = 'fr';
    if (cookies.check('lang')) {
      translate.use(cookies.get('lang'));
    } else {
      cookies.set('lang', translate.currentLang);
    }
  }

  title = 'Time2Watch';

  @HostBinding('class') class = 'd-flex flex-column min-vh-100';

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    this.cookies.set('lang', lang);
  }

  ngOnInit(): void {
    this.translate.use(this.cookies.get('lang'));
  }

}

export function DisplayTime(minutes: number): string {
  if (minutes < 60) {
    return minutes + 'min';
  }
  const hours = Math.floor(minutes / 60);
  return hours + 'h' + Math.floor(minutes - (hours * 60)) + 'min';
}

export function DisplayDate(date: string): string {
  const datePart = date.match(/\d+/g);
  return datePart[2] + '/' + datePart[1] + '/' + datePart[0];
}
