import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Customer 1", new Address("Street 1", 123, "12345-678", "City 1"));

const input = {
    id: customer.id,
    name: "Customer updated",
    address: {
        street: "Street updated",
        number: 456,
        zip: "zip updated",
        city: "City updated"
    }
};


const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn()
    }
}

describe("Unit test update customer use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);
        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });
});