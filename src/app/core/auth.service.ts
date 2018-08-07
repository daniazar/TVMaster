import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { CoreModule } from '../../../node_modules/@angular/flex-layout';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
  isAdmin? : boolean;
}


@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  userObservable: Observable<User | boolean>;
  private user : User = null;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

      //// Get auth data, then get firestore user document || null
    this.userObservable = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.user = user;
          console.log(user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }))
    }
  



  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }


  private updateUserData(user) {
    // Sets user data to firestore on login
    this.user = user;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.user = null;
        this.router.navigate(['/']);
    });
  }
  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): any {
    return this.user;
  }
  get isAdmin() : boolean{
    if ( this.currentUser){
      return this.currentUser.isAdmin;
    }
    return false;
  }
  get currentUserId(): string {
    return this.user.uid || '';
  }

  
}