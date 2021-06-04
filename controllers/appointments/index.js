module.exports = {
  addNew: async (
    { date, DoB, contactNumber, gardianName, address, summary },
    headers
  ) => {
    return utils.post(
      "/appointments",
      {
        date,
        DoB,
        contactNumber,
        gardianName,
        address,
        summary,
      },
      headers
    );
  },
  getUserAppointments: async ({ search, page, limit, sort }, headers) => {
    let url = "/appointments";
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
};
