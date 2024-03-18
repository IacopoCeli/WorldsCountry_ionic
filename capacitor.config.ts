import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.example.worldscountries',
  appName: 'WorldsCountries',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
