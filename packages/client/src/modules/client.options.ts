import { ConfigurableModuleBuilder, Inject } from "@nestjs/common";
import type { ClientOptions } from "@temporalio/client";

export const {
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: TEMPORAL_CLIENT_OPTIONS
} = new ConfigurableModuleBuilder<ClientOptions>().build();

/**
 * Inject the client options provided
 */
export function InjectClientOptions() {
    return Inject(TEMPORAL_CLIENT_OPTIONS);
}