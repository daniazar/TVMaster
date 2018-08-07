import { Component, OnInit, HostBinding } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemeService} from './core/theme.service';
import { AnimationsService } from './core';
import { AuthService } from './core/auth.service';
import { ChannelService } from './services/channel/channel.service';
import Channel from './entities/Channel';

const NIGHT_MODE_THEME = 'BLACK-THEME';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @HostBinding('class') componentCssClass;

  
  constructor(public electronService: ElectronService,
    private overlayContainer: OverlayContainer,
    private translate: TranslateService, private themeService :ThemeService,
    private animationService: AnimationsService,
    public auth: AuthService,
    public channelService : ChannelService
  )  {

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit(): void {
    this.channelService.loadChannels(); 

    this.themeService.getTheme().subscribe(theme => {
      this.setTheme(theme.theme, theme.nightMode);
    });
    this.animationService.getAnimation().subscribe(animation => {
      this.animationService.updateRouteAnimationType(
        animation.wholePage,
        animation.elementSlide
      );
    });
  }

  private setTheme(theme, autoNightMode) {
    const hours = new Date().getHours();
    const effectiveTheme = (autoNightMode && (hours >= 20 || hours <= 6)
      ? NIGHT_MODE_THEME
      : theme
    ).toLowerCase();
    this.componentCssClass = effectiveTheme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  newChannel(){
    this.channelService.setChannel(new Channel());
  }
}
