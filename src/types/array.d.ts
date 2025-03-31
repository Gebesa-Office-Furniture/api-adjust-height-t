import { Request, Response, NextFunction } from 'express';

declare global {
  interface Array<T> {
    /**
     * Returns the first element of the array that satisfies the provided predicate.
     * If no predicate is provided, it returns the first element of the array.
     *
     * @param predicate - A function to evaluate each element.
     * @returns A promise that resolves with the first element that satisfies the predicate,
     *          or `undefined` if none is found.
     */
    firstOrDefault(predicate?: (item: T) => boolean | Promise<boolean>): Promise<T | undefined>;
  }

  interface Promise<T> {
    /**
     * Returns the first element of an array resolved by the promise that satisfies the provided predicate.
     * If no predicate is provided, it returns the first element of the array.
     *
     * @param predicate - A function to evaluate each element.
     * @returns A promise that resolves with the first element that satisfies the predicate,
     *          or `undefined` if none is found.
     */
    firstOrDefault(predicate?: (item: T extends Array<infer U> ? (item: U) => boolean | Promise<boolean> : never) => boolean): Promise<T extends Array<infer U> ? U | undefined : never>;
  }

  interface MiddlewareFunction {
    (req: Request, res: Response, next: NextFunction): void | T;
  }
}

export {}; // This ensures the file is treated as a module.
