const { MongoDataSource } = require("apollo-datasource-mongodb");
const {
  success,
  notFound,
  created,
  badRequest,
} = require("../../utils/queryStatus");
const User = require("../../models/User");
class UserAPI extends MongoDataSource {
  constructor() {
    super(User);
    this.collection = "users";
   }

  async getUsers() {
   try {
      const users = await User.find(); 
      return users;
   } catch (error) {
      return error;
   }
       
  }

  async getUserById(id) {
   try {
    const user = await User.findById(id);
    return user;
   } catch (error) {
      return error;
   }
    
  }

  async addUser(user) {
    //TODO verificar dado duplicado antes de inserir
     if (
      !user.name ||
      !user.lastName ||
      user.participation === undefined
    ) {
      const response = badRequest('Você deve preencher todos os campos');
      return { ...response };
    }

    try {
      const newUser = await User.create(user);

      const userCreated = {
        name: newUser.name,
        lastName: newUser.lastName,
        participation: newUser.participation,
      };
      const response = created(`Usuário ${newUser.name} inserido com sucesso`);

      return {
        ...response
      };
      
    } catch (error) {
      const response = badRequest('Erro na requisisção, verifique os dados.');
      return {...response};
    }
  }

  async updateUser(id, user) {
    const newData = {
      name: user.name,
      lastName: user.lastName,
      participation: user.participation,
    };
    try {
      const user = await User.findById(id);

      if (!user) {
        const response = notFound('Usuário não encontrado');
        return { ...response };
      }

      await User.updateOne({ _id: id }, newData);

      const response = success('Usuário atualizado com sucesso');

      return { ...response };
    } catch (error) {
      const response = badRequest('Erro na requisisção, verifique os dados.');
      return {...response};
    }
  }

  async deleteUser(id) {
   try {
      const user = await User.findById(id);
   
      if (!user) {
        const response = notFound('Usuário não encontrado');
        return { ...response };
      }

      await User.deleteOne({ _id:id });

      const response = success('Usuário deletado com sucesso');

      return {...response}
   } catch (error) {
      const response = badRequest('Erro na requisição, verifique os dados.');
      return {...response};
   }
  }
}

module.exports = UserAPI;
