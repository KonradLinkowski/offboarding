import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

(async () => {
  const { worker } = await import('./mocks/browser');

  await worker.start();

  await bootstrapApplication(AppComponent, appConfig);
})().catch(console.error);
