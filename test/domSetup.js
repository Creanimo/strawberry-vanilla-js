import { JSDOM } from 'jsdom';
import jsdomGlobal from 'jsdom-global';
import fetch from 'node-fetch';
import { Crypto } from "@peculiar/webcrypto";

global.flush = import("flush-cache");

globalThis.crypto = new Crypto();

// Create JSDOM instance
const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
  pretendToBeVisual: true
});

// Set global variables
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLDivElement = dom.window.HTMLDivElement;
global.DocumentFragment = dom.window.DocumentFragment;
global.fetch = fetch;

// For sinon fake timers
// global.setTimeout = dom.window.setTimeout;

// Initialize jsdom-global
const cleanup = jsdomGlobal();

// Add cleanup if needed
export const domCleanup = () => {
  cleanup();
  dom.window.close();
};
