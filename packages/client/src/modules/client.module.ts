import { Module } from '@nestjs/common';
import { TEMPORAL_CLIENT, createClientProvider } from './client.provider';
import { ConfigurableModuleClass } from './client.options';

@Module({
    providers: [createClientProvider()],
    exports: [TEMPORAL_CLIENT]
})
export class TemporalClientModule extends ConfigurableModuleClass {}