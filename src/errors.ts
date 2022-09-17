import { ResponseError } from './types';

export class EBikeConnectError extends Error {
  constructor(public readonly code: number, public readonly response: ResponseError) {
    super(`HTTP ${code}: ${response.errors.map(({ message }) => message).join(', ')}`);
    this.name = 'EBikeConnectError';
    const actualProto = new.target.prototype;
    // eslint-disable-next-line
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      // @ts-expect-error
      // eslint-disable-next-line
      this.__proto__ = actualProto;
    }
  }
}
