const User = require("../models/userModels");

class UserService {
  async create(newUser) {
    const newUserData = await User.create(newUser);

    return newUserData;
  }

  async findOne(filter, select = "") {
    let user;
    if (select.length > 0) {
      user = await User.findOne(filter).select(select);
    } else {
      user = await User.findOne(filter);
    }

    return user;
  }

  async find(filter) {
    const user = await User.findOne(filter);

    return user;
  }

  async findById(id) {
    const user = await User.findById(id);

    return user;
  }

  async findAll(filter = {}, { limit = 10, page = 1 }) {
    let _limit = limit && Number(limit) >= 1 ? Number(limit) : 10;
    const offset = page && page ? limit * (parseInt(page) - 1) : 0;

    const total_users = await User.countDocuments({
      ...filter,
    });

    let pagination_info = {
      totalUsers: Number(total_users),
      currentPage: Number(page),
      totalPages: Math.ceil(Number(total_users) / _limit),
    };

    const users = await User.find({ ...filter })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(_limit);

    return { users, pagination_info };
  }

  async update(id, updateData = {}) {
    const user = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return user;
  }

  async delete(id) {
    const user = await User.findByIdAndRemove(id);
    return user;
  }
}

module.exports = new UserService();
