import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/src/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  // company: faker.company.name(),
  // isVerified: faker.datatype.boolean(),
  // status: sample(['active', 'banned']),
  userType: sample(['admin', 'user', 'staff']),
  permissions: sample(['Create', 'Read', 'Update', 'Delete']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
}));


export const previlage = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  action: faker.lorem.word(),
  description: faker.lorem.sentence(),

}));


export const role = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  action: faker.lorem.word(),
  description: faker.lorem.sentence(),

}));