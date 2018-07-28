import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './core/settings/settings.component';
import { ChannelPageComponent } from './components/channel-page/channel-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        data: {
          title: 'User'
        }
      },
      {
        path: 'channel/:channel',
        component: ChannelPageComponent,
        data: {
          title: 'Channel'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent
    },
    {
      path: 'about',
      component: AboutPageComponent
  },
    {
        path: '**',
        redirectTo: ''
      }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
