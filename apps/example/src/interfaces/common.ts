import { tags } from "typia";

export interface ILiteral {
    type: 'literal';
    /**
     * The value of the literal
     */
    value: number;
}

export interface IOperation {
    type: 'operation';
    /**
     * The left-hand side of the operation.
     */
    left: IOperation | ILiteral;
    /**
     * The arithmetic operator.
     */
    operator: '+' | '-' | '*' | '/';
    /**
     * The right-hand side of the operation.
     */
    right: IOperation | ILiteral;
}

export interface IOperationResult {
    /**
     * The result of the arithmetic operation
     */
    result: number;
}