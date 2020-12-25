import * as Sentry from "@sentry/react";

function init() {
    Sentry.init({
        dsn: "https://70f0b569d14b4aae9d6624e342d73a82@o68909.ingest.sentry.io/5536814",
    });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log,
};
