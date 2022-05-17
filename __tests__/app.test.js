process.env.NODE_ENV = "test";
const app = require("../app");
const db = require("../db");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("status 200 : Responds with all the topics, including slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toBeInstanceOf(Array);
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              description: expect.any(String),
              slug: expect.any(String),
            })
          );
        });
      });
  });
  test("status 404: Returns a route not found message when given a incorrect endpoint", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("/api/article/:article_id", () => {
  test("Status 200 : Returns the article given in the endpoint, with the username as the author ", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
<<<<<<< Updated upstream
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
        });
=======
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
          })
        );
>>>>>>> Stashed changes
      });
  });
  test("status 400: Returns a bad request message when given a endpoint of wrong type", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: Returns a Route Not found message when given data of correct type but is otherwise invalid", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route Not Found");
      });
  });
});
<<<<<<< Updated upstream
=======

const voteUpdate = {
  inc_votes: 500,
};

describe("PATCH /api/articles/:article_id", () => {
  test("status 200: responds with the updated article", () => {
    return request(app)
      .patch("/api/articles/3")
      .send(voteUpdate)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: 3,
            votes: 500,
          })
        );
      });
  });
  test("status 400: Returns a bad request message when given a endpoint of wrong type", () => {
    return request(app)
      .patch("/api/articles/banana")
      .send(voteUpdate)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test.only("status 404: Returns a Route Not found message when given endpoint of correct type but is otherwise invalid", () => {
    return request(app)
      .patch("/api/articles/9999")
      .send(voteUpdate)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route Not Found");
      });
  });
  test("status 422: returns an incorrect input message when sent invalid data key", () => {
    const voteUpdate = { bananas: 500 };
    return request(app)
      .patch("/api/articles/3")
      .send(voteUpdate)
      .expect(422)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Input");
      });
  });
  test("status 400: returns an bad request message when sent invalid key value", () => {
    const voteUpdate = { inc_votes: "bananas" };
    return request(app)
      .patch("/api/articles/3")
      .send(voteUpdate)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 422: returns an incorrect input message when sent empty object", () => {
    const voteUpdate = {};
    return request(app)
      .patch("/api/articles/3")
      .send(voteUpdate)
      .expect(422)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Input");
      });
  });
});

describe("GET /api/users", () => {
  test("status 200: Should return an array containing all of the usernames ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toEqual(
          expect.arrayContaning([
            { username: "butter_bridge" },
            { username: "icellusedkars" },
            { username: "rogersop" },
            { username: "lurker" },
          ])
        );
      });
  });
});
>>>>>>> Stashed changes
