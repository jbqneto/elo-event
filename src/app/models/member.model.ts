export interface IMember {
    id: number;
    name: string;
    phone: string;
    admin: boolean;
}

export interface EventMember extends IMember {
    checked: boolean;
    confirmed: boolean | null;
}

export class Member implements IMember {
    public id: number;
    public name: string;
    public phone: string;
    public admin: boolean;

    constructor(init: IMember) {
        this.id = init.id;
        this.name = init.name;
        this.phone = init.phone;
        this.admin = init.admin;

    }

    public getFirstName(): string | null {
        const names = this.name?.split(' ') ?? [];

        return names.length > 0 ? names[0].trim() : null;
    }

    public getFormatedPhone(): string {
        let phone = this.phone.trim().replaceAll(' ', '');

        return phone;
    }

    public getNormalizedName(): string {
        return this.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
    
}