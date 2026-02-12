import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export const usaJobsInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  if (req.url.includes('data.usajobs.gov')) {


    // console.log('-------',req.url);
    const clonedRequest = req.clone({
      setHeaders: {
        'Authorization-Key': 'ME2tsDBQsa/shvTgJLKtQHoySQ77Q9l5QGKkL357YBs='
      }
    });
    return next(clonedRequest);
  }

   return next(req);
};

