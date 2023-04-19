import { faker } from '@faker-js/faker';

export type Package = {
  _id: string;
  address: string;
  receiver: string;
  weight: number;
  deliveryDate: Date;
  deliveryManId: number;
  deliveryStatus: string;
  quantity: number;
};

function createPackage(): Package {
  return {
    _id: faker.datatype.uuid(),
    address: faker.helpers.arrayElement([
      'Avenida Carabobo y Rivadavia,CABA',
      'Mendoza 1810, CABA',
      'Amenabar 256, CABA',
    ]),
    receiver: faker.name.fullName(),
    weight: faker.datatype.number({ min: 100, max: 10000, precision: 100 }),
    deliveryDate: faker.date.recent(1),
    deliveryManId: faker.datatype.number({ min: 1, max: 100, precision: 100 }),
    deliveryStatus: faker.helpers.arrayElement(['Pendiente']),
    quantity: 0,
  };
}

async function requestGetPackages(cant: number) {
  let packages: Package[] = [];
  for (let i = 0; i < cant; i++) {
    packages.push(createPackage());
  }
  return packages;
}

export { requestGetPackages };
