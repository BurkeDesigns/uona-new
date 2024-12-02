export const toUrlParams = (params = {}) => {
  let qArr: string[] = [];
  for(let key in params){ qArr.push(`${key}=${params[key]}`);}
  return qArr.join('&');
}

export const post = async (url, data = {}) => {
    const res = await fetch(url, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
}
export const patch = async (url, data = {}) => {
    const res = await fetch(url, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
}
export const put = async (url, data) => {
    const res = await fetch(url, {
      method: "PUT",
      credentials: 'include',
      body: data,
    });
    return res.json();
}
export const deleteRequest = async (url, data = {}) => {
    const res = await fetch(url, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
}

export const postForm = async (url, form) => {
    const res = await fetch(url, {
      method: "POST",
      body: form,
    });
    return res.json();
}

export const get = async (url, options = {}) => {
  const res = await fetch(url, {
      ...options,
      // headers: {
      //   "Authorization": `token ${token}`
      // },
  });
  if (!res.ok) throw new Error(`HTTP error ${res.status}: ${res.statusText}`);
  return res.json();
}