import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 123, "12345-678", "City 1"));
const customer2 = CustomerFactory.createWithAddress("Customer 2", new Address("Street 2", 456, "98765-432", "City 2"));


const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        find: jest.fn(),
        update: jest.fn()
    }
}


describe("Unit test list customers use case", () => {
    it("should list all customers", async () => {
        const customerRepository = MockRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0]).toEqual({
            id: customer1.id,
            name: customer1.name,
            address: {
                street: customer1.Address.street,
                number: customer1.Address.number,
                zip: customer1.Address.zip,
                city: customer1.Address.city
            }
        });
        expect(output.customers[1]).toEqual({
            id: customer2.id,
            name: customer2.name,
            address: {
                street: customer2.Address.street,
                number: customer2.Address.number,
                zip: customer2.Address.zip,
                city: customer2.Address.city
            }
        });
    });
});