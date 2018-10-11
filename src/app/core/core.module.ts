import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { LocalStorageService } from './local-storage/local-storage.service';

import { AnimationsService } from './animations/animations.service';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ThemeService } from './theme.service';
import { SettingsComponent } from './settings/settings.component';
import { MatIconModule, MatSelectModule, MatSlideToggleModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule
  ],
  exports: [
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [LocalStorageService, AnimationsService, AuthService, ThemeService]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
