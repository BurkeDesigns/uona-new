import {deleteRequest, patch, post} from '@util/fetch'
import type {NewUser} from '../../../../api/db/types'

export default class API {
  private _url: string;

  constructor(url = 'https://uona-api.swaggear.life') {
    this._url = url;
  }

  users = {
    list: async () => {
      return await post(`${this._url}/users/list`);
    },
    info: async (email:string) => {
      return await post(`${this._url}/users/info`,{
        email,
      });
    },
    create: async (data: NewUser) => {
      return await post(`${this._url}/users/create`, data);
    },
    update: async (data: any) => {
      return await patch(`${this._url}/users/update`, data);
    },
    delete: async (id: number) => {
      return await deleteRequest(`${this._url}/users/delete`, {
        id,
      });
    },
  };

  pages = {
    list: async () => {
      return await post(`${this._url}/pages/list`);
    },
    info: async (email:string) => {
      return await post(`${this._url}/pages/info`,{
        email,
      });
    },
    create: async (data: NewUser) => {
      return await post(`${this._url}/pages/create`, data);
    },
    update: async (data: any) => {
      return await patch(`${this._url}/pages/update`, data);
    },
    delete: async (id: number) => {
      return await deleteRequest(`${this._url}/pages/delete`, {
        id,
      });
    },
  };

  comments = {
    list: async () => {
      return await post(`${this._url}/comments/list`);
    },
    info: async (id:string) => {
      return await post(`${this._url}/comments/info`,{
        id,
      });
    },
    create: async (data: NewUser) => {
      return await post(`${this._url}/comments/create`, data);
    },
    update: async (data: any) => {
      return await patch(`${this._url}/comments/update`, data);
    },
    delete: async (id: number) => {
      return await deleteRequest(`${this._url}/comments/delete`, {
        id,
      });
    },
  };

  tuition = {
    list: async () => {
      return await post(`${this._url}/tuition/list`);
    },
    info: async (id:string) => {
      return await post(`${this._url}/tuition/info`,{
        id,
      });
    },
    create: async (data: NewUser) => {
      return await post(`${this._url}/tuition/create`, data);
    },
    update: async (data: any) => {
      return await patch(`${this._url}/tuition/update`, data);
    },
    delete: async (id: number) => {
      return await deleteRequest(`${this._url}/tuition/delete`, {
        id,
      });
    },
  };

  bugs = {
    list: async () => {
      return await post(`${this._url}/bugs/list`);
    },
    info: async (email:string) => {
      return await post(`${this._url}/bugs/info`,{
        email,
      });
    },
    create: async (data: NewUser) => {
      return await post(`${this._url}/bugs/create`, data);
    },
    update: async (data: any) => {
      return await patch(`${this._url}/bugs/update`, data);
    },
    delete: async (id: number) => {
      return await deleteRequest(`${this._url}/bugs/delete`, {
        id,
      });
    },
  };
}
