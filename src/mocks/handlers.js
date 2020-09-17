import { rest } from "msw";

const endpoint = "https://api.thecatapi.com/v1";

const cat = [
  {
    breeds: [],
    id: "b4k",
    url: "https://cdn2.thecatapi.com/images/b4k.gif",
    width: 346,
    height: 201
  }
];

const handlers = [
  rest.get(`${endpoint}/images/search`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cat));
  })
];

export { handlers };
