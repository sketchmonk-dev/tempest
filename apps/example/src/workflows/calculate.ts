import { HttpFailure } from "@tempest/common";
import { proxyActivities, startChild } from "@temporalio/workflow";
import { ActivityService } from "src/activities/activity.service";
import { IOperation, IOperationResult } from "src/interfaces/common";

const acts = proxyActivities<ActivityService>({
    startToCloseTimeout: '1 minute',
});

export async function calculateWorkflow(input: IOperation): Promise<IOperationResult> {
    const leftValue = input.left.type === 'literal' ? input.left.value : await calc(input.left);
    const rightValue = input.right.type === 'literal' ? input.right.value : await calc(input.right);
    switch (input.operator) {
        case '+':
            return {
                result: await acts.add(leftValue, rightValue)
            };
        case '-':
            return {
                result: await acts.subtract(leftValue, rightValue)
            };
        case '*':
            return {
                result: await acts.multiply(leftValue, rightValue)
            };
        case '/':
            return {
                result: await acts.divide(leftValue, rightValue)
            };
        default:
            throw new HttpFailure("Invalid operator", "INVALID_OPERATOR", 400);
    }
}

async function calc(input: IOperation) {
    const handle = await startChild(calculateWorkflow, {
        args: [input]
    });
    const { result } = await handle.result();
    return result;
}