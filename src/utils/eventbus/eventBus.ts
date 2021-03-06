export default class EventBus {
    listeners: Record<string, EventListener[]>

    constructor() {
      this.listeners = {};
    }

    on(event: string, callback: EventListener): void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }

    off(event: string, callback: EventListener): void {
      if (!this.listeners[event]) {
        throw new Error(`There is no event: ${event}`);
      } else {
        this.listeners[event] = this.listeners[event].filter((item) => item !== callback);
      }
    }

    emit(event: string, ...args: unknown[]): void {
      if (!this.listeners[event]) {
        throw new Error(`There is no event: ${event}`);
      } else {
        this.listeners[event].forEach(function(listener) {
          listener.apply(this, args);
        });
      }
    }
  }