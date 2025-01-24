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

type APIOptions = {
  token?: string
  publicKey?: string
  url?: string
}

export default class API {
  private _url: string | null;
  private _token: string | null;
  private _publicKey: string | null;

  constructor(options: APIOptions = {}) {
    this._url = options.url || import.meta.env.API_DOMAIN || 'https://api.uona.edu';
    this._token = options.token || ''
    this._publicKey = options.publicKey || ''
  }

  users = {
    list: async () => {
      let data:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/users/list`, data);
    },
    info: async (email:string) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/users/info`, {
        email,
        ...auth
      });
    },
    access: async (id:string) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/users/access`,{
        id,
        ...auth
      });
    },
    get: async (id:string) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/users/get`,{
        id,
        ...auth
      });
    },
    create: async (data: NewUser) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/users/create`, {...data, ...auth});
    },
    update: async (data: any) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await patch(`${this._url}/users/update`, {...data, ...auth});
    },
    delete: async (id: number) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await deleteRequest(`${this._url}/users/delete`, {
        id,
        ...auth
      });
    },
  };

  pages = {
    list: async () => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/pages/list`, auth);
    },
    getBySlug: async (slug:string) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/pages/get`,{
        slug,
        ...auth
      });
    },
    get: async (id:string) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/pages/get`,{
        id,
        ...auth
      });
    },
    create: async (data: NewPage) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/pages/create`, {...data, ...auth});
    },
    update: async (data: any) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await patch(`${this._url}/pages/update`, {...data, ...auth});
    },
    delete: async (id: number) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await deleteRequest(`${this._url}/pages/delete`, {
        id,
        ...auth
      });
    },
  };

  formResponse = {
    list: async () => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/form-response/list`, auth);
    },
    get: async (data: GetFormResponse) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/form-response/get`, {...data, ...auth});
    },
    create: async (data: NewFormResponse) => {
      return await post(`${this._url}/form-response/create`, data);
    },
    update: async (data: any) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await patch(`${this._url}/form-response/update`, {...data, ...auth});
    },
    uploadFile: async (data: any) => {
      return await postForm(`${this._url}/form-response/upload`, data);
    },
    delete: async (id: number) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await deleteRequest(`${this._url}/form-response/delete`, {
        id,
        ...auth
      });
    },
  };

  backups = {
    list: async () => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await get(`${this._url}/backups/list`, auth);
    },
  };

  access = {
    list: async () => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/auth/access/list`, auth);
    },
    info: async (id:string) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/auth/access/info`,{
        id,
        ...auth
      });
    },
    get: async (data: AccessGetProps) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/access/get`, {...data, ...auth});
    },
    create: async (data: NewAccess) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/access/create`, {...data, ...auth});
    },
    update: async (data: any) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await patch(`${this._url}/access/update`, {...data, ...auth});
    },
    delete: async (data: AccessGetProps) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await deleteRequest(`${this._url}/access/delete`, {...data, ...auth});
    },
  };

  ai = {
    chat: async (data: any) => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/auth/ai/chat`, {...data, ...auth});
    },
  };

  stats = {
    usage: async () => {
      let auth:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await get(`${this._url}/usage`, auth);
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
    auth: async () => {
      let data:any = {
        token: this._token,
        publicKey: this._publicKey,
      };
      return await post(`${this._url}/auth/test`, data);
    },
  };

  verifyRecapacha = async (data: RecapachaProps) => {
    return await post(`${this._url}/recapacha/verify`, data);
  }
}
