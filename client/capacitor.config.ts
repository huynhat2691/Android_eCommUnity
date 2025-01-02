// import { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'com.ecommunity.app',
//   appName: 'eCommUnity',
//   webDir: 'dist',
//   server: {
//     url: 'http://192.168.1.4:5173',
//     cleartext: true,
//     androidScheme: 'http'
//   },
//   android: {
//     allowMixedContent: true,
//   },
//   ios: {
//     limitsNavigationsToAppBoundDomains: false
//   },
//   plugins: {
//     App: {
//       androidBackButtonDispatch: true
//     }
//   }
// };

// export default config;

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ecommunity.app",
  appName: "eCommUnity",
  webDir: "dist",
  server: {
    url: "https://android-e-comm-unity-client.vercel.app",
    cleartext: true,
    androidScheme: "http",
  },
  android: {
    allowMixedContent: true,
  },
  ios: {
    limitsNavigationsToAppBoundDomains: false,
  },
  plugins: {
    App: {
      androidBackButtonDispatch: true,
    },
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
