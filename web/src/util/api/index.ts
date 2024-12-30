import {deleteRequest, get, patch, post, postForm} from '@util/fetch'
import type {NewPage, NewUser, NewAccess, NewFormResponse} from '../../../../api/db/types'

type AccessGetProps = {
  id?: string | number
  uid?:string | number
  type?: string
};

type RecapachaProps = {
  token: string
  action?: string
}

type GetFormResponse = {
  id?: string | number
  column?: string
  value?: string | number
}

export default class API {
  private _url: string;

  constructor(url = import.meta.env.API_DOMAIN || 'https://uona-api.swaggear.life') {
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
    access: async (id:string) => {
      return await post(`${this._url}/users/access`,{
        id,
      });
    },
    get: async (id:string) => {
      return await post(`${this._url}/users/get`,{
        id,
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
    getBySlug: async (slug:string) => {
      return await post(`${this._url}/pages/get`,{
        slug,
      });
    },
    get: async (id:string) => {
      return await post(`${this._url}/pages/get`,{
        id,
      });
    },
    create: async (data: NewPage) => {
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

  formResponse = {
    list: async () => {
      return await post(`${this._url}/form-response/list`);
    },
    get: async (data: GetFormResponse) => {
      return await post(`${this._url}/form-response/get`, data);
    },
    create: async (data: NewFormResponse) => {
      return await post(`${this._url}/form-response/create`, data);
    },
    update: async (data: any) => {
      return await patch(`${this._url}/form-response/update`, data);
    },
    uploadFile: async (data: any) => {
      return await postForm(`${this._url}/form-response/upload`, data);
    },
    delete: async (id: number) => {
      return await deleteRequest(`${this._url}/form-response/delete`, {
        id,
      });
    },
  };

  backups = {
    list: async () => {
      return await get(`${this._url}/backups/list`);
    },
  };

  access = {
    list: async () => {
      return await post(`${this._url}/access/list`);
    },
    info: async (id:string) => {
      return await post(`${this._url}/access/info`,{
        id,
      });
    },
    get: async (data: AccessGetProps) => {
      return await post(`${this._url}/access/get`, data);
    },
    create: async (data: NewAccess) => {
      return await post(`${this._url}/access/create`, data);
    },
    update: async (data: any) => {
      return await patch(`${this._url}/access/update`, data);
    },
    delete: async (data: AccessGetProps) => {
      return await deleteRequest(`${this._url}/access/delete`, data);
    },
  };

  ai = {
    chat: async (data: any) => {
      return await post(`${this._url}/ai/chat`, data);
    },
  };

  test = {
    protected: async () => {
      return await get(`${this._url}/api/protected`);
    },
    headers: async () => {
      return await get(`${this._url}/headers`, {
        credentials: 'include',
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

  verifyRecapacha = async (data: RecapachaProps) => {
    return await post(`${this._url}/recapacha/verify`, data);
  }
}
