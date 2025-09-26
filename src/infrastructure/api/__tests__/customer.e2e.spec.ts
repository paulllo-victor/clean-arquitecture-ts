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
        expect(response.body).toEqual({
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


    it('should not create a customer', async () => {
        const response = await request(app)
            .post("/customers")
            .send({
                name: "John",
            });

        expect(response.status).toBe(500);
    });

    it("should list all customers", async () => {
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

        const response2 = await request(app)
            .post("/customers")
            .send({
                name: "Carol",
                address: {
                    street: "Street 2",
                    number: 456,
                    zip: "123456",
                    city: "City 2"
                }
            });

        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/customers").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.address.street).toBe("Street");
        const customer2 = listResponse.body.customers[1];
        expect(customer2.id).toBeDefined();
        expect(customer2.name).toBe("Carol");
        expect(customer2.address.street).toBe("Street 2");
    });
});