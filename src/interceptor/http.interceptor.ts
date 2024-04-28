import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CommonService } from 'src/services/common.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class HttpAPIInterceptor implements HttpInterceptor {

    constructor(private commonService: CommonService, public snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const session: string | null = localStorage.getItem('session');
        this.commonService.isShowLoader = true;

        if (session) {
            request = request.clone({
                headers: request.headers.set("Session", session)
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.commonService.isShowLoader = false;
                
                if (error?.error?.isShowMessage && error?.error?.message) {
                    this.snackBar.open(error.error.message, '', {
                        duration: 3000,
                        panelClass: 'custom-snackbar'
                    });
                }
                return throwError(error);
            }),
            map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
                if (evt instanceof HttpResponse) {
                    this.commonService.isShowLoader = false;
                    if (evt.body.isShowMessage && evt.body.message) {
                        this.snackBar.open(evt.body.message, '', {
                            duration: 3000,
                            panelClass: 'custom-snackbar'
                        });
                    }
                }
                return evt;
            })
        );
    }
}
