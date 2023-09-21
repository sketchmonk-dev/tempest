import { ConfigurableModuleBuilder, Inject } from '@nestjs/common';
import type { WorkerOptions } from '@temporalio/worker';

export const {
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN: TEMPORAL_WORKER_OPTIONS
} = new ConfigurableModuleBuilder<WorkerOptions>().build();

/**
 * Inject the worker options provided
 */
export function InjectWorkerOptions() {
    return Inject(TEMPORAL_WORKER_OPTIONS);
}
