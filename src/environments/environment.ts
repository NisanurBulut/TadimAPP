// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  firebase: {
    signUpURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
    loginURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    dataURL: 'https://tadimapp-ca4fc.firebaseio.com/recipes.json',
    apiKey: 'AIzaSyD8RC-SDBnkSqKFyuNVgsgG1UKJg15iagE',
    authDomain: 'tadimapp-ca4fc.firebaseapp.com',
    databaseURL: 'https://tadimapp-ca4fc.firebaseio.com',
    projectId: 'tadimapp-ca4fc',
    storageBucket: 'tadimapp-ca4fc.appspot.com',
    messagingSenderId: '407057887168',
    appId: '1:407057887168:web:254fa336fead2ea0a36225',
    measurementId: 'G-CY6N4J7C9X'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
