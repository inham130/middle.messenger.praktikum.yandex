class Tooltip {
    constructor() {
          this.el = document.createElement('div');
          this.el.style.position = 'absolute';

          this.el.classList.add(this.name);
          document.body.appendChild(this.el);
          this.listeners = [];

          this.onShow = this.onShow.bind(this);
          this.onHide = this.onHide.bind(this);
      }

      get name() {
          return 'tooltip';
      }

      get indent() {
          return 5;
      }

    delegate(eventName, element, cssSelector, callback) {
        const fn = event => {
            if (!event.target.matches(cssSelector)) {
                return;
            }

            callback(event);
        };

        element.addEventListener(eventName, fn);
        this.listeners.push({ fn, element, eventName });

        return this;
    }

    onShow = (event) => {
        const message = event.target.dataset.tooltip;
        this.el.textContent = message;
        this.el.classList.add('tooltip_active');

        const tooltipClientRect = this.el.getBoundingClientRect();
        const tooltipHeight = tooltipClientRect.height;

        const targetClientRect = event.target.getBoundingClientRect();
        const offsetTop = targetClientRect.top;

        let y = targetClientRect.y + targetClientRect.height;
        if (tooltipHeight < offsetTop) {
        y = targetClientRect.y - tooltipHeight;
        }

        this.el.style.top = `${y}px`;
    }

    onHide(event) {
        this.el.classList.remove('tooltip_active');
    }

    attach(root) {
        this
            .delegate('mouseover', root, '[data-tooltip]', this.onShow)
            .delegate('mouseout', root, '[data-tooltip]', this.onHide);
    }

    detach() {
        this.listeners.forEach((listener) => {
            listener.element.removeEventListener(listener.eventName, listener.fn)
        });
    }
}