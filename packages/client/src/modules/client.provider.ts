import { Inject, Provider } from "@nestjs/common";
import { Client, ClientOptions } from "@temporalio/client";

import { TEMPORAL_CLIENT_OPTIONS } from "./client.options";

export const TEMPORAL_CLIENT = Symbol('TEMPORAL_CLIENT');

export function InjectClient() {
    return Inject(TEMPORAL_CLIENT);
}

export function createClientProvider(): Provider {
    return {
        inject: [TEMPORAL_CLIENT_OPTIONS],
        provide: TEMPORAL_CLIENT,
        useFactory(options: ClientOptions) {
            return new Client(options);
        }
    }
}