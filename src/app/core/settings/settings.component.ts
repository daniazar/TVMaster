import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AnimationSettings, AnimationsService } from '../animations/animations.service';
import { routeAnimations } from '../animations/route.animations';
import { ThemeService, ThemeSettings } from '../theme.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [routeAnimations]

})
export class SettingsComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  themes = [
    { value: 'DEFAULT-THEME', label: 'Blue' },
    { value: 'LIGHT-THEME', label: 'Light' },
    { value: 'NATURE-THEME', label: 'Nature' },
    { value: 'BLACK-THEME', label: 'Dark' }
  ];
  nightMode = false;
  currentTheme = 0;
  wholePage = true;
  slide = true;

  constructor(private themeService: ThemeService, private animationService: AnimationsService) {

  }

  setTheme() {
    console.log(this.currentTheme);
    this.themeService.setTheme(new ThemeSettings(this.themes[this.currentTheme].value, this.nightMode));
  }

  setAnimation() {
    this.animationService.setAnimation(new AnimationSettings(this.wholePage, this.slide));
  }

  ngOnInit() {
    // this.setTheme();
  }

  ngOnDestroy(): void {
  }

}
