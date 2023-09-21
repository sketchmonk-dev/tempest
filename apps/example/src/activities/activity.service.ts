import { Injectable } from "@nestjs/common";
import { HttpFailure } from "../../../../packages/common/dist";

@Injectable()
export class ActivityService {
    async add(a: number, b: number): Promise<number> {
        return a + b;
    }
    async subtract(a: number, b: number): Promise<number> {
        return a - b;
    }
    async multiply(a: number, b: number): Promise<number> {
        return a * b;
    }
    async divide(a: number, b: number): Promise<number> {
        if (b === 0) {
            throw new HttpFailure("Cannot divide by zero", "DIVIDE_BY_ZERO", 400);
        }
        return a / b;
    }
}