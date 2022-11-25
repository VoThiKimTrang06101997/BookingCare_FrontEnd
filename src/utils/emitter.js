import EventEmitter from "events";

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0);       // Unlimit Listener

export const emitter = _emitter;

