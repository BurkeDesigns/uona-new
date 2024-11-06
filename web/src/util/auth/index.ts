import type {
  ChangePasswordParams,
  LoginParams,
  RegisterParams,
  UserParams
} from './types'
import {post, get, toUrlParams} from '@util/fetch'

export default class auth {
    private _options: {};
    root: this;
    constructor(options = {}) {
      this.root = this;
      this._options = options;
    }
    static async register(params:RegisterParams) {
      let res = await post(`/api/auth/register`, params);
      return res;
    }
    static async login(params:LoginParams) {
      const {username, password} = params;
      let res = await post(`/api/auth/login`, params);
      return res;
    }
    static async signOut() {
      let res = await post(`/api/auth/logout`);
      return res;
    }
    static async deleteUser() {
      let res = await post(`/api/auth/user/delete`);
      return res;
    }
    static async updateUser(params: UserParams) {
      let res = await post(`/api/auth/user/update`, params);
      return res;
    }
    static async getUser() {
      let res = await post(`/api/auth/user`);
      return res;
    }
    static async changePassword(params: ChangePasswordParams) {
      const {oldPassword, newPassword} = params;
      let res = await post(`/api/auth/user/change-password`, params);
      return res;
    }
}
      