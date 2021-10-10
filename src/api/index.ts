import API from './api';

export default API;
export * from './form';
export * from './user';
export * from './recipe';
export * from './auth';

/**
 * export const delPhotoCC = async photoIndex => {
  const url = `${API_URL}/ccu/company/photos/${photoIndex}`;
  const token = await AsyncStorage.getItem('token');
  const callback = {
    onSuccess: res => {
      console.log('DelPhotoCC', res.status, url);
      console.log();
      return {data: null, err: null};
    },
    onFail: async res => {
      const err = await res.json();
      console.log('DelPhotoCC', err, url);
      console.log();
      if (res.status === 401)
        return onTokenExpired(() => delPhotoCC(photoIndex));
      return {data: null, err};
    },
    onErr: err => {
      console.log('DelPhotoCC', err, url);
      console.log();
      return {data: null, err};
    },
  };
  return makeDeleteRequest(url, token, null, callback);
};
 */
