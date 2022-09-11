import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import {map, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const now = Date.now();
        return next
            .handle()
            .pipe(map((data) => ({ ...data, loadTime: Date.now() - now + ' ms' })));
    }
}