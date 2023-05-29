const { MongoDataSource } = require("apollo-datasource-mongodb");
const {
  success,
  notFound,
  created,
  internalServerError,
  badRequest,
} = require("../../utils/queryStatus");
const User = require("../../models/User");
class UserAPI extends MongoDataSource {
  constructor() {
    super(User);
    this.collection = "users";
    this.respostaCustom = {
      code: 200,
      mensagem: "Operação efetuada com sucesso",
    };
  }

  async getUsers() {
    const users = await User.find();
    return users;
  }

  async getUserById(id) {
    const user = await User.findById(id);
    return user;
  }

  async addUser(user) {
    //TODO verificar dado duplicado antes de inserir
    if (
      user.name === undefined ||
      user.lastName === undefined ||
      user.participation === undefined
    ) {
      const response = badRequest("Você deve preencher todos os campos");
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
        ...response,
        user: userCreated,
      };
    } catch (error) {
      console.log("Erro ao adicionar usuário", error);
      throw error;
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
        const response = notFound("Usuário não encontrado");
        return { ...response };
      }

      await User.updateOne({ _id: id }, newData);

      const response = success("Usuário atualizado com sucesso");

      return { ...response };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserAPI;
