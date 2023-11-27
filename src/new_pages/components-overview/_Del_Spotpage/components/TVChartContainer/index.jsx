import React, { useEffect, useRef } from 'react';
import './index.css';
import { widget } from '../../charting_library';
import { subscribeOnStream } from './streaming';

function getLanguageFromURL() {
  const regex = new RegExp('[\\?&]lang=([^&#]*)');
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export const TVChartContainer = ({ pairData, superData }) => {
  const chartContainerRef = useRef();

  // Below Code - From GRA App
  const lastBarsCache = new Map();

  // Below Code - From GRA App
  const configurationData = {
    supported_resolutions: ['1', '15', '30', '60', '1D', '1W', '1M', '12M', '24M', '48M'],
    exchanges: [{ value: 'Gravitus', name: 'Gravitus', desc: 'Gravitus' }],
    symbols_types: [{ name: 'crypto', value: 'crypto' }]
  };

  // Below Code - From GRA App
  var Datafeed = {
    onReady: (callback) => {
      console.log('[onReady]: Method call');
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

      console.log({ superData });

      if (superData.length >= 305) {
        let bars = [];
        superData.forEach((bar) => {
          bars = [
            ...bars,
            {
              // time: bar.time * 1000,
              time: bar.time,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close,
              volume: bar.volume
            }
          ];
        });

        if (firstDataRequest) {
          lastBarsCache.set(symbolInfo.platformId, {
            ...bars[bars.length - 1]
          });
        }

        console.log(`[getBars]: returned ${bars.length} bar(s)`);
        onHistoryCallback(bars, { noData: false });
        return;
      } else {
        onHistoryCallback([], { noData: true });
        return;
      }

      // onHistoryCallback([], {noData: true});
      // return;
    },

    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
      console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID, symbolInfo, lastBarsCache);
      subscribeOnStream(
        symbolInfo,
        resolution,
        onRealtimeCallback,
        subscriberUID,
        onResetCacheNeededCallback,
        lastBarsCache.get(symbolInfo.platformId)
      );
    },

    unsubscribeBars: (subscriberUID) => {
      console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    }
  };

  useEffect(() => {
    const widgetOptions = {
      interval: '1',
      symbol: 'Gravitus: BNB/USDT',
      // timeframe        : {from : '1676359800', to : '1676419200'},

      // preset           : "mobile",
      width: '100%',
      // height           : '280px',

      container: chartContainerRef.current,
      library_path: '/charting_library/',
      locale: 'en',

      datafeed: Datafeed,
      disabled_features: ['legend_widget', 'header_symbol_search'],

      enabled_features: ['study_templates'],
      autosize: true
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('Noticed!');
            }
          })
        );

        button.innerHTML = 'Check API';
      });
    });

    return () => {
      tvWidget.remove();
    };
  });

  return <div ref={chartContainerRef} className={'TVChartContainer'} />;
};