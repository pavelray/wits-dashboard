const httpService = {
  get: async (url, options = {}) => {
    let data;
    const response = await fetch(url, { next: { revalidate: 300 } });

    if (response) {
      data = await response.json();
    }
    return data;
  },
  post: async (url, options = {}) => {
    let data;
    const { body } = options;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ...body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      next: { revalidate: 300 },
    });
    if (response) {
      data = await response.json();
    }
    return data;
  },
};

export default httpService;
