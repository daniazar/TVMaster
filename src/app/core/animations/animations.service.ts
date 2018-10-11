import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { CoreModule } from '../../../../node_modules/@angular/flex-layout';

export class AnimationSettings{
  
  wholePage : boolean;
  elementSlide : boolean;
  constructor( whole: boolean, slide : boolean){
    this.wholePage = whole;
    this.elementSlide = slide;
  }
}

@Injectable({
  providedIn: CoreModule
})
export class AnimationsService {
  constructor() {}

  private static routeAnimationType: RouteAnimationType = 'NONE';

  static isRouteAnimationsType(type: RouteAnimationType) {
    return AnimationsService.routeAnimationType === type;
  }

  updateRouteAnimationType(
    pageAnimations: boolean,
    elementsAnimations: boolean
  ) {
    AnimationsService.routeAnimationType =
      pageAnimations && elementsAnimations
        ? 'ALL'
        : pageAnimations ? 'PAGE' : elementsAnimations ? 'ELEMENTS' : 'NONE';
  }

  private animationSubject = new BehaviorSubject<AnimationSettings>(new AnimationSettings(false, false));

  getAnimation() : Observable<AnimationSettings> {
    return this.animationSubject.asObservable();
  }
  setAnimation(animation : AnimationSettings) {
    this.animationSubject.next(animation);
    this.updateRouteAnimationType(animation.wholePage, animation.elementSlide);
  }


}

export type RouteAnimationType = 'ALL' | 'PAGE' | 'ELEMENTS' | 'NONE';
