import { EBikeConnectAuth, getActivityRide, getActivityTrip, getActivityTripHeaders, getApiVersion, getMyEBikes, getVersionNumber } from '../src';
import { z } from 'zod';
import {
  responseActivityTripSchema,
  responseActivityRideSchema,
  responseVersionNumberSchema,
  responseActivityTripHeadersSchema,
  responseApiVersionSchema,
  responseMyEbikesSchema,
} from './generated/schemas';
import { describe, it } from 'mocha';

const check = async <T>(result: Promise<T>, schema: z.Schema<T>): Promise<T> => {
  const value = await result;
  schema.parse(value);
  return value;
};

const auth: EBikeConnectAuth = {
  cookies: {
    remember: process.env.COOKIE_REMEMBER ?? '',
  },
};

describe('Test of our schemas against the current API', () => {
  it('getVersionNumber', () => check(getVersionNumber(auth)(), responseVersionNumberSchema));
  it('getApiVersion', () => check(getApiVersion(auth)(), responseApiVersionSchema));
  it('getMyEBikes', () => check(getMyEBikes(auth)(), responseMyEbikesSchema));
  it('getActivityTrip', () => check(getActivityTrip(auth)({ id: '2473397346630' }), responseActivityTripSchema));
  it('getActivityRide', () => check(getActivityRide(auth)({ id: '2473397346692' }), responseActivityRideSchema));
  it('getActivityTripHeaders', () => check(getActivityTripHeaders(auth)(), responseActivityTripHeadersSchema));
});
