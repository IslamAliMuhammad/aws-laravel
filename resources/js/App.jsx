import React from "react";
import { createInertiaApp } from "@inertiajs/react";

createInertiaApp({
    resolve: (name) => import(`./Pages/${name}.jsx`),
    setup({ el, App, props }) {
        return React.createElement(App, props);
    },
});
