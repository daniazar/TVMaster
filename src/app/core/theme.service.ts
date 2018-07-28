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
  private themeSubject :BehaviorSubject<ThemeSettings>;
  private key = 'theme';
  constructor() {
    let theme : ThemeSettings = this.retrieveLocal(this.key);
    if(theme){
      this.themeSubject = new BehaviorSubject<ThemeSettings>(theme);

    }else{
      this.themeSubject = new BehaviorSubject<ThemeSettings>(new ThemeSettings('default-THEME', false));

    }
   }

  getTheme() : Observable<ThemeSettings> {
    return this.themeSubject.asObservable();
  }
  setTheme(theme : ThemeSettings) {
    this.themeSubject.next(theme);
    this.saveLocal(this.key, theme);
  }

  saveLocal(key, object){
    localStorage.setItem(key, JSON.stringify(object) );
  }
  retrieveLocal(key){
    let obj = localStorage.getItem(key);
    console.log(obj);
    if (obj){
      return JSON.parse(obj);
    }
    return null;
  }
}
