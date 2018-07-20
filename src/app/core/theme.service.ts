import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeSettings{
  theme: string;
  nightMode : boolean;
  constructor( theme: string, night : boolean){
    this.theme = theme;
    this.nightMode = night;
  }
}
export class ThemeService {

  constructor() { }
  private themeSubject = new BehaviorSubject<ThemeSettings>(new ThemeSettings('BLACK-THEME', false));

  getTheme() : Observable<ThemeSettings> {
    return this.themeSubject.asObservable();
  }
  setTheme(theme : ThemeSettings) {
    this.themeSubject.next(theme);
  }

}
