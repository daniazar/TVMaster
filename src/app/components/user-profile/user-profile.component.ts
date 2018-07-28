import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { routeAnimations } from '../../core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [routeAnimations]

})
export class UserProfileComponent {


  constructor(public auth: AuthService) { }

}