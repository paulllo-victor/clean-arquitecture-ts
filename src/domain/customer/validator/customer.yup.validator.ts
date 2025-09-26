import Customer from "../entity/customer";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from 'yup';
import e from "express";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
            }).validateSync({
                id: entity.id,
                name: entity.name,
            }, { abortEarly: false });
        } catch (errors) {
            const yupErrors = errors as yup.ValidationError;

            yupErrors.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error
                });
            });
        }
    }
}