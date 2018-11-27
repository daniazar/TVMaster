export const AppConfig = {
  production: false,
  environment: 'LOCAL'
};
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  test: false,
  firebase: {
    apiKey: 'AIzaSyAhBBDwSTagR_D3P4bKGoTkgi96dtk7vT4',
    authDomain: 'tv-master-67d96.firebaseapp.com',
    databaseURL: 'https://tv-master-67d96.firebaseio.com',
    projectId: 'tv-master-67d96',
    storageBucket: 'tv-master-67d96.appspot.com',
    messagingSenderId: '390945708392'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
