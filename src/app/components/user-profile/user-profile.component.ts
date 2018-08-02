import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { routeAnimations } from '../../core';
import { AuthProvider } from '../../../../node_modules/ngx-auth-firebaseui';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [routeAnimations]

})
export class UserProfileComponent {


  constructor(public auth: AuthService) { }
  providers = AuthProvider;
}