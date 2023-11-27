// import { parseFullSymbol } from './helpers.js';
import { socket } from 'src/socket.js';
let flag = false;
const channelToSubscription = new Map();
let bar;
socket.on('/TICKSUpdate/POST', (res) => {
  // console.log({ flag });
  if (flag) {
    // console.log('[socket] Message:', res, channelToSubscription.get(res.platformId));
    const subscriptionItem = channelToSubscription.get(res.platformId);
    if (subscriptionItem === undefined) {
      return;
    }
    // const lastDailyBar = subscriptionItem.lastDailyBar;
    // const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);
    console.log('time', subscriptionItem.lastDailyBar.time, res.data.time);
    if (subscriptionItem.platformId === res.platformId) {
      bar = {
        time: res.data.time,
        open: res.data.open,
        high: res.data.high,
        low: res.data.low,
        close: res.data.close
      };
      subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
    }

    // if (tradeTime >= nextDailyBarTime) {
    //   bar = {
    //     time: nextDailyBarTime,
    //     open: tradePrice,
    //     high: tradePrice,
    //     low: tradePrice,
    //     close: tradePrice
    //   };
    //   console.log('[socket] Generate new bar', bar);
    // } else {
    //   bar = {
    //     ...lastDailyBar,
    //     high: Math.max(lastDailyBar.high, tradePrice),
    //     low: Math.min(lastDailyBar.low, tradePrice),
    //     close: tradePrice
    //   };
    //   console.log('[socket] Update the latest bar by price', tradePrice);
    // }
    // subscriptionItem.lastDailyBar = bar;

    // Send data to every subscriber of that symbol
  }
});

function getNextDailyBarTime(barTime) {
  const date = new Date(barTime * 1000);
  date.setDate(date.getDate() + 1);
  return date.getTime() / 1000;
}

export function subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback, lastDailyBar) {
  // const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
  const parsedSymbol = symbolInfo.platformId;
  // const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
  const handler = {
    id: subscriberUID,
    callback: onRealtimeCallback
  };
  let subscriptionItem = channelToSubscription.get(parsedSymbol);
  if (subscriptionItem) {
    // Already subscribed to the channel, use the existing subscription
    subscriptionItem.handlers.push(handler);
    return;
  }
  subscriptionItem = {
    platformId: parsedSymbol,
    subscriberUID,
    resolution,
    lastDailyBar,
    handlers: [handler]
  };
  channelToSubscription.set(parsedSymbol, subscriptionItem);
  console.log('[subscribeBars]: Subscribe to streaming. Channel:', parsedSymbol, subscriptionItem);
  flag = true;
}

export function unsubscribeFromStream(subscriberUID) {
  // Find a subscription with id === subscriberUID
  for (const channelString of channelToSubscription.keys()) {
    const subscriptionItem = channelToSubscription.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex((handler) => handler.id === subscriberUID);

    if (handlerIndex !== -1) {
      // Remove from handlers
      subscriptionItem.handlers.splice(handlerIndex, 1);

      if (subscriptionItem.handlers.length === 0) {
        // Unsubscribe from the channel if it is the last handler
        console.log('[unsubscribeBars]: Unsubscribe from streaming. Channel:', channelString);
        socket.emit('SubRemove', { subs: [channelString] });
        channelToSubscription.delete(channelString);
        break;
      }
    }
  }
}
