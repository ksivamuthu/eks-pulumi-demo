export class Brew {
    beverage: string;
    person: string;
    status: BrewStatus;
}

export enum BrewStatus {
    Ordered = 'Ordered',
    Brewing = 'Brewing',
    ReadyToPickup = 'Ready to pickup',
}
