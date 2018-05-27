import { Connector } from './connector';

export function getApiClass(configs) {
    const connector = new Connector(configs.apiUrl, configs.timeout);
    configs.errorHandler = configs.errorHandler || function(res){ return res.error; };
    configs.successHandler = configs.successHandler || function(res) { return res.data; };
    class Api {
        races = [];
        static setHeaders(headers) {
            connector.setHeaders(headers);
        }
        getRace(key) {
            return this.races.find(race => race.key === key);
        }
        withPreventRaceCondition(key, requestFn) {
            return new Promise((resolve, reject) => {
                let race = this.getRace(key);
                if (!race) {
                    this.races.push({
                        key,
                        resolve: resolve,
                        reject: reject,
                    });
                } else {
                    race.resolve = resolve;
                    race.reject = reject;
                }
                requestFn().then((res) => {
                    this.getRace(key).resolve(res);
                }, (res) => {
                    this.getRace(key).reject(res);
                })
            });
        }
        async wrapRequest(requestFn) {
            const { errorHandler, successHandler } = Api.configs;
            let res = await requestFn().catch(errorHandler);
            return successHandler(res);
        }
        async doGet(url, config = {}) {
            return await this.wrapRequest(() => connector.get(url, config))
        }
        async doPost(url, data = {}, config = {}) {
            return await this.wrapRequest(() => connector.post(url, data, config))
        }
        async doPut(url, data = {}, config = {}){
            return await this.wrapRequest(() => connector.put(url, data, config))
        }
        async doDelete(url, config = {}){
            return await this.wrapRequest(() => connector.delete(url, config));
        }
        async doRequest(config = {}) {
            return await this.wrapRequest(() => connector.request(config));
        }
    }
    return Api;
}