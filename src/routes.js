import axios from "axios";
import config from "./config/index.js";
import layer from "./layer.js";

export default (ctx) => {
    const params = ctx.request.body;
    const requestPath = ctx.request.path;

    layer(params).then((translatedParams) => {
        const requestUrl = `http://${config.state.ip}:${config.state.port}${requestPath}`;
        console.log(translatedParams);
        axios.post(requestUrl, translatedParams).catch(() => {
            console.error("Failed request");
        })
    });

}