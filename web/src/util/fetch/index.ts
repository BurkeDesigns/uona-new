export const toUrlParams = (params = {}) => {
  let qArr: string[] = [];
  for(let key in params){ qArr.push(`${key}=${params[key]}`);}
  return qArr.join('&');
}

export const post = async (url, data:any = {}) => {

    let headers = {
      "Content-Type": "application/json",
    };
    if(typeof window !== 'undefined') {
      headers["token"] = data.token || localStorage.token || '';
      headers["publicKey"] = data.publicKey || localStorage.publicKey || '';
    } else {
      headers["token"] = data.token || '';
    }
    const res = await fetch(url, {
      method: "POST",
      credentials: 'include',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
}
export const patch = async (url, data:any = {}) => {
    let headers = {
      "Content-Type": "application/json",
    };
    if(typeof window !== 'undefined') {
      headers["token"] = data.token || localStorage.token || '';
      headers["publicKey"] = data.publicKey || localStorage.publicKey || '';
    } else {
      headers["token"] = data.token || '';
    }
    const res = await fetch(url, {
      method: "PATCH",
      credentials: 'include',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
}
export const put = async (url, data) => {
    let headers = {};
    if(typeof window !== 'undefined') {
      headers["token"] = data.token || localStorage.token || '';
      headers["publicKey"] = data.publicKey || localStorage.publicKey || '';
    } else {
      headers["token"] = data.token || '';
    }
    const res = await fetch(url, {
      method: "PUT",
      credentials: 'include',
      headers,
      body: data,
    });
    return res.json();
}
export const deleteRequest = async (url, data:any = {}) => {
    let headers = {
      "Content-Type": "application/json",
    };
    if(typeof window !== 'undefined') {
      headers["token"] = data.token || localStorage.token || '';
      headers["publicKey"] = data.publicKey || localStorage.publicKey || '';
    } else {
      headers["token"] = data.token || '';
    }
    const res = await fetch(url, {
      method: "DELETE",
      credentials: 'include',
      headers,
      body: JSON.stringify(data),
    });
    return res.json();
}

export const postForm = async (url, form) => {
    let headers = {};
    if(typeof window !== 'undefined') {
      headers["token"] = localStorage.token ?? '';
      headers["publicKey"] = localStorage.publicKey ?? '';
    }
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: form,
    });
    return res.json();
}

export const get = async (url, options:any = {}) => {
  let headers = {};
  if(typeof window !== 'undefined') {
    headers["token"] = options.token || localStorage.token || '';
    headers["publicKey"] = options.publicKey || localStorage.publicKey || '';
  } else {
    headers["token"] = options.token || '';
  }
  const res = await fetch(url, {
      ...options,
      headers,
  });
  if (!res.ok) throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
  return res.json();
}