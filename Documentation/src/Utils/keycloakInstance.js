import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: window?.appConfig?.url,
  realm: window?.appConfig?.realm,
  clientId: window?.appConfig?.clientId,
};

function initKeycloak() {
  let keycloak = null;
  function getKeycloak() {
    if (keycloak == null) keycloak = Keycloak(keycloakConfig);
    return keycloak;
  }

  return { getKeycloak };
}

export default initKeycloak;
