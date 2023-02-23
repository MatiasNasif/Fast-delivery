import { faker } from '@faker-js/faker';

export type DeliveryMan = {
  _id: string;
  fullName: string;
  avatar: string;
  status: string;
};

function createDeliveryMan(): DeliveryMan {
  return {
    _id: faker.datatype.uuid(),
    fullName: faker.name.firstName() + ' ' + faker.name.lastName(),
    avatar: faker.image.avatar(),
    status: faker.helpers.arrayElement(['Activo', 'Inactivo']),
  };
}

async function requestDeliveryMans(cant: number) {
  let deliveryMans: DeliveryMan[] = [];
  for (let i = 0; i < cant; i++) {
    deliveryMans.push(createDeliveryMan());
  }
  return deliveryMans;
}

export { requestDeliveryMans };
