import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
0
import { environment } from '../../environments/environment';

import { LocalStorageService } from './local-storage/local-storage.service';

import { AnimationsService } from './animations/animations.service';

 
@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

  ],
  declarations: [],
  providers: [LocalStorageService, AnimationsService]
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
