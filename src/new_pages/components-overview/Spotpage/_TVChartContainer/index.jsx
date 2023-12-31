
import React, { useEffect, useRef, useReducer, useState } from 'react';
import { Spot_ChartData_URL, fetcherCHART} from 'src/api_ng/spotTrade_ng';

import { widget } from '../_charting_library';
import { socket } from '../../../../socket';

import './index.css';

export const TVChartContainer = ({ pairData, exchangeType }) => {
  const chartContainerRef = useRef();
  const lastBarsCache = new Map();

  const configurationData = {
    supported_resolutions: ['1', '15', '30', '60', '1D', '1W', '1M', '12M', '24M', '48M'],
    exchanges: [{ value: 'Gravitus', name: 'Gravitus', desc: 'Gravitus' }],
    symbols_types: [{ name: 'crypto', value: 'crypto' }]
  };

  var Datafeed = {
    onReady: (callback) => {
      // console.log('[onReady]: Method call');
      setTimeout(() => callback(configurationData));
    },

    resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback, extension) => {
      // console.log('[resolveSymbol]: Symbol resolved', symbolName);

      const symbolInfo = {
        ticker: pairData?.tradePair,
        name: `Gravitus: ${pairData?.tradePair}`,
        description: `${pairData?.tradePair} Chart Presentation`,
        type: 'Crypto',
        session: '24x7',
        timezone: 'Etc/UTC',
        exchange: 'Gravitus',
        minmov: 1,
        pricescale: 100,
        has_intraday: true,
        has_weekly_and_monthly: true,
        // has_no_volume				: true,
        visible_plots_set: 'ohlcv',
        supported_resolutions: configurationData.supported_resolutions,
        volume_precision: 2,
        data_status: 'streaming',
        platformId: pairData?.id
      };

      onSymbolResolvedCallback(symbolInfo);
    },

    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
      const { from, to, countBack, firstDataRequest } = periodParams;
      // console.log('[getBars]: Method call', symbolInfo, resolution, from, to, countBack);

      fetcherCHART(Spot_ChartData_URL(pairData?.id, resolution, exchangeType)).then(function(res) {
        if(res.error != 'ok') {
          onErrorCallback(res.error);
        }
        else {
          if(res.result.length > 0) {
            var superData = res.result;
            // console.log(res.result);

            if(superData.length >= 305) {
              let bars = [];
              superData.forEach(bar => {
                // From Trades OHLC
                bars = [...bars, {
                  // time: bar.time * 1000,
                  time: bar.time,
                  low: bar.low,
                  high: bar.high,
                  open: bar.open,
                  close: bar.close,
                  volume: bar.volume
                }];
              });
              
              if(firstDataRequest) {
                lastBarsCache.set(symbolInfo.ticker, {
                  ...bars[bars.length - 1],
                });
              }

              onHistoryCallback(bars, {noData: false});
              return;
            }
            else {
              onHistoryCallback([], {noData: true});
              return;
            }
          }
          else {
            onHistoryCallback([], {noData: true});
            return;
          }
        }
      },function(err) {
        onErrorCallback(err);
      });
    },

    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
      // console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID, symbolInfo, lastBarsCache);
      
      socket.on('/TICKSUpdate/POST', function(res) {
        if(pairData?.id == res.platformId && resolution == res.data.interval && 'cmc' == res.from) {
          onRealtimeCallback({
            "time"  : res.data.time,
            "open"  : res.data.open,
            "high"  : res.data.high,
            "low"   : res.data.low,
            "close" : res.data.close,
            "volume": res.data.volume,
          });
        }
      });
    },

    unsubscribeBars: (subscriberUID) => {
      // console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);

      socket.off('/TICKSUpdate/POST', function(){
        // Do something here
      });
    }
  };

  useEffect(() => {
    const widgetOptions = {
      interval    : '1',
      symbol      : 'Gravitus: BNB/USDT',
      width       : '100%',
  
      container   : chartContainerRef.current,
      library_path: '/charting_library/',
      locale      : 'en',
  
      datafeed    : Datafeed,
      disabled_features: ['legend_widget', 'header_symbol_search'],
  
      enabled_features: ['study_templates'],
      autosize    : true
    };

    const tvWidget = new widget(widgetOptions);
    return () => {tvWidget.remove();};
  }, [pairData.id, exchangeType]);

  return (
    <>
      <div ref={chartContainerRef} className={'TVChartContainer'} />
    </>
  );

};