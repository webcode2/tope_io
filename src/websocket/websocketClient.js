class WebSocketClient {
    constructor(url) {
        if (WebSocketClient.instance) return WebSocketClient.instance;
        this.url = url;
        this.ws = null;
        this.listeners = {};
        WebSocketClient.instance = this;
    }

    connect() {
        if (this.ws && (this.ws.readyState === 1 || this.ws.readyState === 0)) return;
        this.ws = new window.WebSocket(this.url);

        this.ws.onopen = () => this.emit('open');
        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.emit('message', data);
            } catch (e) {
                this.emit('error', e);
            }
        };
        this.ws.onerror = (err) => this.emit('error', err);
        this.ws.onclose = () => this.emit('close');
    }

    send(data) {
        if (this.ws && this.ws.readyState === 1) {
            this.ws.send(JSON.stringify(data));
        }
    }

    close() {
        if (this.ws) this.ws.close();
    }

    on(event, cb) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(cb);
    }

    emit(event, ...args) {
        (this.listeners[event] || []).forEach(cb => cb(...args));
    }
}

let instance = null;
export default function getWebSocketClient(url) {
    if (!instance) {
        instance = new WebSocketClient(url);
    }
    return instance;
}