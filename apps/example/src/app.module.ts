import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TemporalClientModule } from '@tempest/client';
import { TemporalWorkerModule } from '@tempest/worker';
import { Connection } from '@temporalio/client';
import { NativeConnection } from '@temporalio/worker';
import { ActivityService } from './activities/activity.service';
import { ActivityModule } from './activities/activity.module';

@Module({
  imports: [
    // client setup
    TemporalClientModule.registerAsync({
      async useFactory() {
        const connection = await Connection.connect({
          address: 'localhost:7233',
        });
        return {
          connection,
          namespace: 'tempest',
        };
      }
    }),
    // worker setup
    TemporalWorkerModule.registerAsync({
      imports: [ActivityModule],
      inject: [ActivityService],
      async useFactory(activityService: ActivityService) {
        const connection = await NativeConnection.connect({
          address: 'localhost:7233',
        });
        return {
          connection,
          activities: {
            add: activityService.add.bind(activityService),
            subtract: activityService.subtract.bind(activityService),
            multiply: activityService.multiply.bind(activityService),
            divide: activityService.divide.bind(activityService),
          },
          namespace: 'tempest',
          taskQueue: 'math',
          workflowsPath: require.resolve('./workflows'),
        };
      }
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
