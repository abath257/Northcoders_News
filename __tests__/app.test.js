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

describe("GET /api/articles/:article_id", () => {
  test("Status 200 : Returns the article given in the endpoint, with the username as the author ", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) =>
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
        )
      );
  });
  test("status 400: Returns a bad request message when given a endpoint of wrong type", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: Returns a Route Not found message when given endpoint of correct type but is otherwise invalid", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not Found");
      });
  });
});

describe("GET /api/article/:article_id, with added comment count ", () => {
  test("Status 200 : Returns the article given in the endpoint, with the username as the author and added comment count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) =>
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            comment_count: 11,
          })
        )
      );
  });
  test("status 200 : Returns the article's comment count as 0 when there are no comments", () => {
    return request(app)
      .get("/api/articles/4")
      .expect(200)
      .then(({ body }) =>
        expect(body.article).toEqual(
          expect.objectContaining({
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: "2020-05-06T01:14:00.000Z",
            votes: 0,
            comment_count: 0,
          })
        )
      );
  });
  test("status 400: Returns a bad request message when given a endpoint of wrong type", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: Returns a route not found message when given a non existent endpoint ", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not Found");
      });
  });
});

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
  test("status 404: Returns a Route Not found message when given endpoint of correct type but is otherwise invalid", () => {
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

describe("GET/api/users", () => {
  test("status 200: returns an array of all the usernames property", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toHaveLength(4);
        expect(users).toEqual(
          expect.arrayContaining([{ username: expect.any(String) }])
        );
      });
  });
});

describe("api/articles", () => {
  test("status 200: Returns an  array of article objects with added comment count ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(12);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("status 200: articles are sorted by created_in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        articles.forEach((article) => {
          article.created_at = Date.parse(article.created_at);
        });
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET/api/articles/:article_id/comments", () => {
  test("Should return an array of all the comments on a given article_id", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        comments.forEach((comment) => {
          expect(comments).toBeInstanceOf(Array);
          expect(comments).toHaveLength(2);
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              body: expect.any(String),
              votes: expect.any(Number),
              author: expect.any(String),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
  test("status 200: Returns an empty array, with no error, when endpoint is valid but there are no comments attached", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(0);
      });
  });
  test("status 400: Returns a bad request message when given a endpoint of wrong type", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: Returns a route not found message when given a non existent endpoint ", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not Found");
      });
  });
});

const newComment = { username: "lurker", body: "This is a very good article" };

describe("POST/api/articles/:article_id/comments", () => {
  test("Responds with the posted comment ", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: 19,
            body: "This is a very good article",
            votes: 0,
            author: "lurker",
            article_id: 1,
            created_at: expect.any(String),
          })
        );
      });
  });
  test("status 400: Returns a bad request message when given a endpoint of wrong type", () => {
    return request(app)
      .post("/api/articles/banana/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("status 404: Returns a route not found message when given a non existent endpoint ", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not Found");
      });
  });
  test("status 422: returns an incorrect message when sent invalid data key", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ leg: "This is a very good article", username: "lurker" })
      .expect(422)
      .then(({ body }) => {
        expect(body.msg).toBe("Incorrect Input");
      });
  });
  test("status 404: returns not found when sent username that doesnt exist", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ body: "This is a very good article", username: "Frank" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Route not Found");
      });
  });
});
