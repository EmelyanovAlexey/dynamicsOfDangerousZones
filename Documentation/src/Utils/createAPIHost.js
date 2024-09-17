function createAPIHost() {
  const apiHost = process.env.REACT_APP_API_HOST; //  window.API_URL;
  const apiPath = process.env.REACT_APP_API_PATH;

  const originHost = window.location.origin;

  return `${apiHost || originHost}${apiPath}`;
}

export default createAPIHost;
