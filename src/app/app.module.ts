import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import {FlexLayoutModule} from '@angular/flex-layout';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { YoutubePlayerModule } from 'ngx-youtube-player';
// Firebase
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule,
        AngularFireStorage,
        AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';

//import {ChannelService} from './services/channel/channel.service';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';




import { CoreModule } from './core';

//import { SettingsModule } from './settings';

//import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/player/player.component';
import { ChannelListComponent, ChannelSheet } from './components/channel-list/channel-list.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ChannelPageComponent } from './components/channel-page/channel-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ChannelFormComponent } from './components/channel-form/channel-form.component';
import { ChannelListPageComponent } from './components/channel-list-page/channel-list-page.component';
import { ResportsPageComponent } from './components/resports-page/resports-page.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    PlayerComponent,
    ChannelListComponent,
    ChannelSheet,
    CountryListComponent,
    UserProfileComponent,
    UserLoginComponent,
    LoginFormComponent,
    ChannelPageComponent,
    AboutPageComponent,
    ChannelFormComponent,
    ChannelListPageComponent,
    ResportsPageComponent
  ],
  entryComponents: [ChannelSheet],
  imports: [
    CoreModule,
    //SettingsModule,
    BrowserModule,
    YoutubePlayerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    // To initialize AngularFire
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
