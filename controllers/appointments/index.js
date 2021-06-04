module.exports = {
  getAllAppointments: async ({ search, page, limit, sort }, headers) => {
    let url = "/appointments/getAllAppointments";
    if (search || page || limit || sort) {
      url += "?";
    }
    if (search) {
      url += `search=${search}`;
    }
    if (page) {
      url += `search=${page}`;
    }
    if (limit) {
      url += `search=${limit}`;
    }
    if (sort) {
      url += `search=${sort}`;
    }
    return utils.get(url, headers);
  },
  assign: async ({ appointmentId, GPId }, headers) => {
    let url = "/appointments/assign";
    return utils.post(url, { appointmentId, GPId }, headers);
  },
};
