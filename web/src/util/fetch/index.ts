export const toUrlParams = (params = {}) => {
    let qArr: string[] = [];
    for(let key in params){ qArr.push(`${key}=${params[key]}`);}
    return qArr.join('&');
}

export const post = async (url, data = {}) => {
      const res = await fetch(url, {
        method: "POST",
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