import { API_SERVER } from "@env";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "localstorage-polyfill";
import "cross-fetch/polyfill";

jest.mock("react-native-vector-icons/Ionicons", () => "Icon");

const handler = [
  rest.patch(`${API_SERVER}/team/rank`, (req, res, ctx) => {
    return res(ctx.json({ message: "sucess", data: null, error: null }));
  }),
  rest.get(`${API_SERVER}/match`, (req, res, ctx) => {
    const query = req.url.searchParams;
    query.get("province");
    query.get("city");
    query.get("district");
    query.get("sports");
    query.get("year");
    query.get("month");
    query.get("date");

    return res(ctx.json({ message: "sucess", data: {}, error: null }));
  }),
  rest.get(`${API_SERVER}/playground`, (req, res, ctx) => {
    const query = req.url.searchParams;
    query.get("province");
    query.get("city");
    query.get("district");
    query.get("sports");
    return res(ctx.json({ message: "sucess", data: {}, error: null }));
  }),
  rest.post(`${API_SERVER}/auth/login`, (req, res, ctx) => {
    return res(ctx.json({
      message: "sucess",
      data: {
        token: "token",
        locations: "locations",
        messages: "messages",
        teams: "teams",
        sports: "sports",
      },
      error: null,
    }));
  }),
];

const server = setupServer(
  ...handler
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
