const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  post: async (url, data, headers, isFormData = false) => {
    try {
      let config;
      var formData = new FormData();
      if (isFormData) {
        if (headers) {
          config = {
            headers: {
              ...formData.getHeaders(),
              Authorization: headers["authorization"],
            },
          };
        }
        const keys = Object.keys(data);
        for (const propKey of keys) {
          const prop = data[propKey];
          if (prop) {
            if (
              !["images", "userManual"].includes(propKey) ||
              typeof prop === "string"
            ) {
              if (Array.isArray(prop)) {
                formData.append(propKey, JSON.stringify(prop));
              } else {
                formData.append(propKey, prop);
              }
            } else {
              if (Array.isArray(prop)) {
                prop.forEach((p) => {
                  formData.append(propKey, p.buffer, {
                    filename: p.originalname,
                    contentType: p.mimetype,
                  });
                });
              } else {
                formData.append(propKey, prop.buffer, {
                  filename: prop.originalname,
                  contentType: prop.mimetype,
                });
              }
            }
          }
        }

        const response = await axios.post(
          env.apiAddress + url,
          formData.getBuffer(),
          config
        );
        return response.data;
      } else {
        if (headers) {
          config = {
            headers: {
              Authorization: headers["authorization"],
            },
          };
        }
        const response = await axios.post(env.apiAddress + url, data, config);
        return response.data;
      }
    } catch (error) {
      return error.response ? error.response.data : null;
    }
  },

  patch: async (url, data, headers, isFormData = false) => {
    try {
      let config;
      var formData = new FormData();
      if (isFormData) {
        if (headers) {
          config = {
            headers: {
              ...formData.getHeaders(),
              Authorization: headers["authorization"],
            },
          };
        }
        const keys = Object.keys(data);
        for (const propKey of keys) {
          const prop = data[propKey];
          if (prop) {
            if (
              !["images", "userManual"].includes(propKey) ||
              typeof prop === "string"
            ) {
              if (Array.isArray(prop)) {
                formData.append(propKey, JSON.stringify(prop));
              } else {
                formData.append(propKey, prop);
              }
            } else {
              if (Array.isArray(prop)) {
                prop.forEach((p) => {
                  formData.append(propKey, p.buffer, {
                    filename: p.originalname,
                    contentType: p.mimetype,
                  });
                });
              } else {
                formData.append(propKey, prop.buffer, {
                  filename: prop.originalname,
                  contentType: prop.mimetype,
                });
              }
            }
          }
        }

        const response = await axios.patch(
          env.apiAddress + url,
          formData.getBuffer(),
          config
        );
        return response.data;
      } else {
        if (headers) {
          config = {
            headers: {
              Authorization: headers["authorization"],
            },
          };
        }
        const response = await axios.patch(env.apiAddress + url, data, config);
        return response.data;
      }
    } catch (error) {
      return error.response ? error.response.data : null;
    }
  },

  get: async (url, options) => {
    try {
      const response = await axios.get(env.apiAddress + url, options);
      return response.data;
    } catch (error) {
      return error.response ? error.response.data : null;
    }
  },
};
