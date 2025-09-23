import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";
import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
describe("Test find customer use case", () => {
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Paulo");
        const address = new Address("Street", 123, "city", "zip");
        customer.changeAddress(address)

        await customerRepository.create(customer);
        const input = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Paulo",
            address: {
                street: "Street",
                city: "city",
                number: 123,
                zip: "zip",
            }
        }
        const result = useCase.execute(input);

        expect(result).toEqual(output)
    })
})