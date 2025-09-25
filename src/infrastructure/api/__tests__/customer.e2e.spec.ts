import { app, sequelize } from "../express";
import request from "supertest";
describe("E2E test for customer", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
                address: {
                    street: "Street",
                    number: 123,
                    zip: "12345",
                    city: "City"
                }
            });

        expect(response.status).toBe(200);
        expexct(response.body).toEqual({
            id: expect.any(String),
            name: "John",
            address: {
                street: "Street",
                number: 123,
                zip: "12345",
                city: "City"
            }
        });
    });

});