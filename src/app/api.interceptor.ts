import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function apiInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return next(
    req.clone({
      url: '/api',
      // url: new URL(req.url, 'https://example.com').toString(),
    }),
  );
}
