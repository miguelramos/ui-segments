export function uniqueID() {
  function chr4() {
    return Math.random()
      .toString(16)
      .slice(-4);
  }

  return (
    chr4() +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    chr4() +
    chr4()
  );
}

export function between(
  num: number,
  min: number,
  max: number,
  inclusive = true
) {
  const minValue = Math.min.apply(Math, [min, max]);
  const maxValue = Math.max.apply(Math, [min, max]);

  return inclusive
    ? num >= minValue && num <= maxValue
    : num > minValue && num < maxValue;
}

export function extractHostname(url: string) {
  let hostname;

  if (url.indexOf('://') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  hostname = hostname.split(':')[0];

  return hostname;
}

/**
 * Creates a pub/sub (publish–subscribe) event hub with emit, on, and off methods.
 *
 * const handler = data => console.log(data);
 * const hub = createEventHub();
 *
 * Subscribe: listen for different types of events
 * hub.on('message', handler);
 * hub.on('message', () => console.log('Message event fired'));
 *
 * Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
 * hub.emit('message', 'hello world');
 * hub.emit('message', { hello: 'world' });
 *
 * Unsubscribe: stop a specific handler from listening to the 'message' event
 * hub.off('message', handler);
 *
 */
export function createEventHub() {
  return ({
    hub: Object.create(null),
    emit(event: string, data: any) {
      (this.hub[event] || []).forEach(handler => handler(data));
    },
    on(event: string, handler: Function) {
      if (!this.hub[event]) {
        this.hub[event] = [];
      }
      this.hub[event].push(handler);
    },
    off(event: string, handler: Function) {
      const i = (this.hub[event] || []).findIndex(h => h === handler);

      if (i > -1) {
        this.hub[event].splice(i, 1);
      }
    },
    destroy() {
      (this.hub || []).forEach((item, index) => {
        this.hub[item].splice(index, 1);
      });
    }
  });
}

/**
 * Smooth-scrolls to the top of the page.
 */
export function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

export function validateNumber(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
}
