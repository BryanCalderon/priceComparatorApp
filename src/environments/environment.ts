// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB96QU6DGX7j_GceUuTQvvRqQSTA3GTFYw",
    authDomain: "pricecomparator-a8733.firebaseapp.com",
    databaseURL: "https://pricecomparator-a8733.firebaseio.com",
    projectId: "pricecomparator-a8733",
    storageBucket: "pricecomparator-a8733.appspot.com",
    messagingSenderId: "1007773781150",
    appId: "1:1007773781150:web:030e337db92a171d9a3f8f",
    measurementId: "G-X1711D27K0"
  },
  domain: 'http://localhost:8000/'
};

/*
 * For easier debugging in development mode, you can import the following fil
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.