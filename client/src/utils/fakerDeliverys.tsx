import { faker } from '@faker-js/faker';

export type Delivery = {
  _id: string;
  firstname: string;
  circle: number;
  avatar: string;
  deliveryStatus: string;
};

function createDeliveryMan(): Delivery {
  return {
    _id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    avatar: faker.image.avatar(),
    circle: faker.datatype.number({ min: 1, max: 100 }),
    deliveryStatus: faker.helpers.arrayElement(['Viaje en curso', 'Finalizó', 'Inactivo']),
  };
}

async function requestDelivery(cant: number) {
  let delivery: Delivery[] = [];
  for (let i = 0; i < cant; i++) {
    delivery.push(createDeliveryMan());
  }
  return delivery;
}

export { requestDelivery };
