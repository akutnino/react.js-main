import type { BareFetcher, SWRConfiguration } from 'swr';

export type CurrencyType = 'USD' | 'EUR' | 'GBP';

export type FetcherReturnType = SWRConfiguration<any, any, BareFetcher<any>>;
