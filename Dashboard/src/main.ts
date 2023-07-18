import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './dashboard/dashboard.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
