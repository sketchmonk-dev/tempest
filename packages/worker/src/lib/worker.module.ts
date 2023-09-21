import { Module } from '@nestjs/common';
import { TemporalWorkerService } from './worker.service';
import { ConfigurableModuleClass } from './worker.options';

@Module({
    providers: [TemporalWorkerService],
    exports: [TemporalWorkerService],
})
export class TemporalWorkerModule extends ConfigurableModuleClass { }