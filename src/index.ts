import "@sentry/tracing";
import { registerSentry } from "./sentry";

(async () => {
    registerSentry();
    console.log('hello world');
})();
