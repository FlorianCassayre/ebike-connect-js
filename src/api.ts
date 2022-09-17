import fetch from 'node-fetch';
import {
  ResponseActivityRide,
  ResponseActivityTrip,
  ResponseActivityTripHeaders,
  ResponseApiVersion,
  ResponseError,
  ResponseMyEbikes,
  ResponseVersionNumber,
} from './types';
import { EBikeConnectError } from './errors';

export interface EBikeConnectAuth {
  cookies: {
    remember: string;
  };
}

const EBIKE_CONNECT_ENDPOINT = 'https://www.ebike-connect.com';

const COOKIE_REMEMBER = 'REMEMBER';

type UrlParameters = Record<string, string | number | boolean | null | undefined>;

const buildUrl = (baseUrl: string, path: string, params: UrlParameters = {}): string => {
  const search = Object.entries(params)
    .filter(([, value]) => value != null)
    .map(([key, value]) => [key, (value as any).toString()].map((s) => encodeURIComponent(s)).join('='))
    .join('&');
  return `${baseUrl}/${path}${search.length > 0 ? `?${search}` : ''}`;
};

const fetchApi = async <T>(url: string, auth: EBikeConnectAuth, params: UrlParameters = {}): Promise<T> => {
  return await fetch(buildUrl(EBIKE_CONNECT_ENDPOINT, url, params), {
    headers: {
      cookie: [[COOKIE_REMEMBER, auth.cookies.remember]].map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('; '),
      'user-agent': `Mozilla/5.0 (compatible; ebike-connect-js +https://github.com/FlorianCassayre/ebike-connect-js)`,
      'protect-from': 'CSRF',
    },
  }).then(async (response) => {
    const responseJson = response.json();
    if (response.status >= 200 && response.status < 300) {
      return await (responseJson as Promise<T>);
    } else {
      return await responseJson.then((json) => {
        throw new EBikeConnectError(response.status, json as ResponseError);
      });
    }
  });
};

type RequestArgumentless<R> = (auth: EBikeConnectAuth) => () => Promise<R>;
type RequestWithArgument<A, R> = (auth: EBikeConnectAuth) => (arg: A) => Promise<R>;
type RequestOptionalArgument<A, R> = (auth: EBikeConnectAuth) => (arg?: A) => Promise<R>;

// API

// Does not require authentication
export const getVersionNumber: RequestArgumentless<ResponseVersionNumber> = (auth) => async () => await fetchApi('/versionNumber.txt', auth);

export const getApiVersion: RequestArgumentless<ResponseApiVersion> = (auth) => async () => await fetchApi('/ebikeconnect/api/api_version', auth);

export const getActivityTrip: RequestWithArgument<{ id: string }, ResponseActivityTrip> =
  (auth) =>
  async ({ id }) =>
    await fetchApi(`/ebikeconnect/api/activities/trip/details/${encodeURIComponent(id)}`, auth);

export const getActivityRide: RequestWithArgument<{ id: string }, ResponseActivityRide> =
  (auth) =>
  async ({ id }) =>
    await fetchApi(`/ebikeconnect/api/activities/ride/details/${encodeURIComponent(id)}`, auth);

export const getActivityTripHeaders: RequestOptionalArgument<{ max?: number; offset?: number }, ResponseActivityTripHeaders> =
  (auth) =>
  async ({ max = 20, offset = new Date().getTime() } = {}) =>
    await fetchApi('/ebikeconnect/api/portal/activities/trip/headers', auth, {
      max,
      offset,
    });

export const getMyEBikes: RequestArgumentless<ResponseMyEbikes> = (auth) => async () => await fetchApi('/ebikeconnect/api/portal/devices/my_ebikes', auth);
