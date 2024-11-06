import {post, get, toUrlParams} from '@util/fetch'

export default class API {
    private _url: string;
    constructor(
      url = '/',
    ) {
      this._url = url;
    }
  
    async search() {
        let res = await post(`/api/search`);
        return res;
    }
}