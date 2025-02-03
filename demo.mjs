import { loadConfig, getConfig } from "./init.mjs";

loadConfig().then(() => {
    console.log(getConfig());
});
