import { faker } from '@faker-js/faker';

export type DeliveryMan = {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  status: boolean;
};

function createDeliveryMan(email: string, status: boolean): DeliveryMan {
  return {
    _id: faker.datatype.uuid(),
    fullName: faker.name.firstName() + faker.name.lastName(),
    email,
    avatar: faker.image.avatar(),
    status,
  };
}

async function requestDeliveryMans(cant: number) {
  let deliveryMans: DeliveryMan[] = [];
  for (let i = 0; i < cant; i++) {
    deliveryMans.push(createDeliveryMan('seed@seed.com', true));
  }
  return deliveryMans;
}

export { requestDeliveryMans };
