// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {StoreDevtoolsModule} from '@ngrx/store-devtools';

export const environment = {
  production: false,
  storeDevTools: [
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: false})
  ],
  baseUrl: `http://localhost:3000`,
  // baseUrl: `https://tuquepides.com/apigindar`,
  publicPath: 'https://gindarperu.com/assets/img',
  culqiKey: 'pk_test_55e885618c6261bb'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
