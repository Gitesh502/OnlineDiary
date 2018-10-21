import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService} from '../shared/services/storage/storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private storage: StorageService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.storage.get('user');
        debugger;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.token}`,
                    UserId:currentUser.user.id
                }
            });
        }

        return next.handle(request);
    }
}