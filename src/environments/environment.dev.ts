// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `index.ts`, but if you do
// `ng build --env=prod` then `index.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const AppConfig = {
  production: false,
  environment: 'DEV'
};
export const environment = {
  production: false,
  test: false,
  firebase: {
    apiKey: "AIzaSyAhBBDwSTagR_D3P4bKGoTkgi96dtk7vT4",
    authDomain: "tv-master-67d96.firebaseapp.com",
    databaseURL: "https://tv-master-67d96.firebaseio.com",
    projectId: "tv-master-67d96",
    storageBucket: "tv-master-67d96.appspot.com",
    messagingSenderId: "390945708392"
  }
};
