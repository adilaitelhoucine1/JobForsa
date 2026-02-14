import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export const usaJobsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  if (req.url.includes('data.usajobs.gov')) {
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization-Key': environment.usaJobsApiKey
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};

