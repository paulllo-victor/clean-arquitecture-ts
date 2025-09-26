import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer extends Entity {
    private _name: string
    _address!: Address;
    _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {
        CustomerValidatorFactory.create().validate(this);
    }

    get name(): string {
        return this._name;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    set address(address: Address) {
        this._address = address;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    changeAddress(address: Address) {
        this._address = address;
    }
    get Address(): Address {
        return this._address;
    }
}