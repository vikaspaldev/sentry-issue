import * as Sentry from "@sentry/node";

export const registerSentry = () => {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
};

export const captureExceptions = async (errors: string[]): Promise<string[]> => {
    const sentryEventIds = await Promise.all(
        errors.map<Promise<string>>((err) => {
            return new Promise((resolve) => {
                Sentry.withScope((scope) => {
                    scope.setTag("kind", "operation");
                    const sentryEventId = Sentry.captureException(err);
                    resolve(sentryEventId);
                });
            });
        })
    )
    return sentryEventIds.filter(Boolean);
};
