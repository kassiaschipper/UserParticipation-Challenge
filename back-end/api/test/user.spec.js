const UserAPI = require('../user/datasource/user');

describe('UserAPI', () => {
  let userAPI;

  beforeAll(() => {
    userAPI = new UserAPI();
  });

  it('should return the list of users', async () => {
    jest.setTimeout(10000);
    const users = await userAPI.getUsers();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
  });

});
