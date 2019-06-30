import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { Brew, BrewStatus } from './brew.model';

@Injectable()
export class BrewService {
    getAllBrews(): Brew[] {
        const brews: Brew[] = [];
        for (let i = 0; i <= 10; i++) {
            brews.push({
                beverage: faker.random.arrayElement(this.getCoffees()),
                person: faker.name.findName() as string,
                status: faker.random.arrayElement([
                    BrewStatus.Ordered,
                    BrewStatus.Brewing,
                    BrewStatus.ReadyToPickup,
                ]),
            });
        }
        return brews;
    }

    getCoffees(): string[] {
        return [
            'Americano',
            'Caffe Latte',
            'Caffe Mocha',
            'Cappuccino',
            'Cortado',
            'Corretto',
            'Ethiopian Coffee',
            'White coffee',
            'Vietnamese style coffee',
            'Turkish Coffee',
            'Flat White',
            'Hammerhead',
            'Irish Coffee',
            'Macchiato',
            'Ristretto',
            'Short Black',
            'Viennese Coffee',
            'Latte Macchiato',
            'Long Black',
            'Lungo',
            'Doppio',
            'Espresso con Panna',
            'Espresso Romano',
            'Caffe Latte',
            'Caffe Mocha',
            'White Chocolate Mocha',
            'Freshly Brewed Coffee',
            'Cinnamon Dolce Latte',
            'Skinny Vanilla Latte',
            'Caramel Macchiato',
            'Teavana® Oprah Cinnamon Chai Tea Latte',
            'Caramel Flan Latte',
            'Flat White',
            'Skinny Peppermint Mocha',
            'Pumpkin Spice Latte',
            'Salted Caramel Mocha',
            'Toasted Graham Latte '];
    }
}
