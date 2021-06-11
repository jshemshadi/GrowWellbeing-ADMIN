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
  profile: async ({}, headers) => {
    return utils.get("/users/profile", headers);
  },
  updateProfile: async (user, headers) => {
    return utils.patch("/users/profile", user, headers, true);
  },
};
