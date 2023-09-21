import { ApplicationFailure } from "@temporalio/common";

/**
 * An HttpFailure is an ApplicationFailure with an associated HTTP status code.
 */
export class HttpFailure<Type extends string = string> extends ApplicationFailure {
    constructor(
        message: string,
        type: Type,
        statusCode: number = 500,
        extra?: any
    ) {
        super(message, type, true, [{statusCode}, extra]);
    }

    get statusCode(): number {
        return (this.details?.[0] as any)?.statusCode;
    }

    static fromApplicationFailure(failure: ApplicationFailure): HttpFailure {
        const statusCode = (failure.details?.[0] as any)?.statusCode ?? 500 ;
        const extra = (failure.details?.[1] as any);
        return new HttpFailure(failure.message, failure.type ?? 'UNKNOWN', statusCode, extra);
    }
}
