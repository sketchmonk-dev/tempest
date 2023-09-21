import { Controller, UseInterceptors } from '@nestjs/common';
import { InjectClient, TemporalFailureInterceptor } from '@tempest/client';
import { Client } from '@temporalio/client';
import { TypedBody, TypedRoute } from '@nestia/core';
import { IOperation, IOperationResult } from './interfaces/common';
import { calculateWorkflow } from './workflows/calculate';
import { randomUUID } from 'crypto';

@Controller()
export class AppController {
  constructor(@InjectClient() private readonly client: Client) {}

  @TypedRoute.Post('/calc')
  @UseInterceptors(TemporalFailureInterceptor)
  async calculate(
    @TypedBody() operation: IOperation,
  ): Promise<IOperationResult> {
    const uuid = randomUUID();
    const result = await this.client.workflow.execute(calculateWorkflow, {
      workflowId: `calc/${uuid}`,
      args: [operation],
      taskQueue: 'math'
    });
    return result;
  }
}
