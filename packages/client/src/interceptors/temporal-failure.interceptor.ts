import { HttpFailure } from '@tempest/common';
import {
    BadGatewayException,
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { ActivityFailure, ApplicationFailure, WorkflowFailedError } from '@temporalio/client';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TemporalFailureInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    if (err instanceof WorkflowFailedError) {
                        // handler function
                        const handleError = (cause: ApplicationFailure) => {
                            const failure = HttpFailure.fromApplicationFailure(cause);
                            return throwError(() => new HttpException(
                                {
                                    message: cause.failure?.message,
                                    type: cause.type,
                                    status: failure.statusCode,
                                    extra: failure.details?.[1],
                                },
                                failure.statusCode,
                            ));
                        };
                        if (err.cause instanceof ApplicationFailure) {
                            return handleError(err.cause);
                        } else if (err.cause instanceof ActivityFailure && err.cause.cause instanceof ApplicationFailure) {
                            return handleError(err.cause.cause);
                        }
                        return throwError(() => new BadGatewayException());
                    } else {
                        return throwError(() => err);
                    }
                }),
            );
    }
}
