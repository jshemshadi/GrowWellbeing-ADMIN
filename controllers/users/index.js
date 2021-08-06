module.exports = {
  login: async ({ accountType, username, password }) => {
    return utils.post("/users/login", { accountType, username, password });
  },
  forgetPassword: async ({ email }) => {
    return utils.patch("/users/requestResetPassword", { email });
  },
  verifyPasswordReset: async ({ verificationCode, email }) => {
    return utils.patch("/users/checkResetPasswordCode", {
      verificationCode,
      email,
    });
  },
  resendResetPasswordCode: async ({ email }) => {
    return utils.patch("/users/resendResetPasswordCode", { email });
  },
  resetPassword: async ({ password, verificationCode, email }) => {
    return utils.patch("/users/resetPassword", {
      password,
      verificationCode,
      email,
    });
  },
  getAllGPs: async ({}, headers) => {
    return utils.get("/users/getAllGPs", headers);
  },
  profile: async ({ userGUID }, headers) => {
    if (userGUID) {
      return utils.get(`/users/${userGUID}/profile`, headers);
    } else {
      return utils.get("/users/profile", headers);
    }
  },
  updateProfile: async (user, headers) => {
    const { userGUID } = user;
    if (userGUID) {
      return utils.patch(`/users/${userGUID}/profile`, user, headers, true);
    } else {
      return utils.patch("/users/profile", user, headers, true);
    }
  },
  getAllUsers: async ({ search, page, limit, sort }, headers) => {
    let url = "/users";
    if (search || page || limit || sort) {
      url += "?";
    }
    if (search) {
      url += `search=${search}&`;
    }
    if (page) {
      url += `page=${page}&`;
    }
    if (limit) {
      url += `limit=${limit}&`;
    }
    if (sort) {
      url += `sort=${sort}&`;
    }
    return utils.get(url, headers);
  },
};
