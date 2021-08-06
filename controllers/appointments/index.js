module.exports = {
  getAllAppointments: async (
    { search, page, limit, sort, from, to, createAfter },
    headers
  ) => {
    let url = "/appointments/getAllAppointments";
    if (search || page || limit || sort || from || to || createAfter) {
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
    if (from) {
      url += `from=${from}&`;
    }
    if (to) {
      url += `to=${to}&`;
    }
    if (createAfter) {
      url += `createAfter=${createAfter}`;
    }
    return utils.get(url, headers);
  },
  assign: async ({ appointmentId, GPId }, headers) => {
    let url = "/appointments/assign";
    return utils.post(url, { appointmentId, GPId }, headers);
  },
};
