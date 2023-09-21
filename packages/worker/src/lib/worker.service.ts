import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Worker, WorkerOptions } from "@temporalio/worker";

import { InjectWorkerOptions } from "./worker.options";

@Injectable()
export class TemporalWorkerService implements OnModuleInit, OnModuleDestroy {
    private worker?: Worker;

    constructor(@InjectWorkerOptions() private readonly options: WorkerOptions) { }

    async onModuleInit() {
        const worker = await Worker.create(this.options);
        // start worker
        worker.run();
        // console log
        console.log(`Worker started in queue ${this.options.taskQueue} with pid ${process.pid}`);
        this.worker = worker;
    }

    async onModuleDestroy() {
        this.worker?.shutdown();
    }

    /**
     * Close the worker
     */
    close() {
        this.worker?.shutdown();
    }
}