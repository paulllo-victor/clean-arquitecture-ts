import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto } from "../create/create.customer.dto";
import { InputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;
    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputUpdateCustomerDto): Promise<InputUpdateCustomerDto> {
        const customer = await this.customerRepository.find(input.id);
        customer.changeName(input.name);
        customer.changeAddress(new Address(
            input.address.street,
            input.address.number,
            input.address.zip,
            input.address.city
        ));

        await this.customerRepository.update(customer);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                number: customer.Address.number,
                zip: customer.Address.zip,
                city: customer.Address.city
            }
        };
    }
}