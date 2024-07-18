const request = async (method, url, params = {}, bodyData = null, headers = {}, options = {}) => {
    try {
      let requestURL = url;
  
      if (params && Object.keys(params).length > 0) {
        const paramsToString = new URLSearchParams(params).toString();
        requestURL = `${url}?${paramsToString}`;
      }
  
      const fetchOptions = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...options,
      };
  
      if (bodyData) {
        fetchOptions.body = JSON.stringify(bodyData);
      }
  
      const response = await fetch(requestURL, fetchOptions);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error in request:', error);
      throw error;
    }
  };
  
  export const getRequest = (url, headers = {}, params = {}, options = {}) => {
    return request('GET', url, params, null, headers, options);
  };
  
  export const postRequest = (url, bodyData, headers = {}, params = {}, options = {}) => {
    return request('POST', url, params, bodyData, headers, options);
  };
  
  export const putRequest = (url, headers = {}, params = {}, options = {}) => {
    return request('PUT', url, params, null, headers, options);
  };
  
  export const patchRequest = (url, bodyData, headers = {}, params = {}, options = {}) => {
    return request('PATCH', url, params, bodyData, headers, options);
  };

  export const deleteRequest = (url, bodyData, headers = {}, params = {}, options = {}) => {
    return request('DELETE', url, params, bodyData, headers, options);
  };
  