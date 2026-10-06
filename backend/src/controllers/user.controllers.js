
const fs = require('fs');
const appRoot = require('app-root-path');
const { errorResponse, successResponse } = require('../configs/app.response');
const User = require('../models/user.model');
const logger = require('../middleware/winston.logger');
const MyQueryHelper = require('../configs/api.feature');

// TODO: Controller for get user info
exports.getUser = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'User information get successful',
      {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatar: process.env.APP_BASE_URL + user.avatar,
        gender: user.gender,
        dob: user.dob,
        address: user.address,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for get user info using id by admin
exports.getUserById = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'User information get successful',
      {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatar: process.env.APP_BASE_URL + user.avatar,
        gender: user.gender,
        dob: user.dob,
        address: user.address,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for update user info
exports.updateUser = async (req, res) => {
  try {
    const { user } = req;
    const {
      fullName, email, phone, gender, dob, address
    } = req.body;

    if (!user) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    // update user info & save database
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        fullName: fullName || user.fullName,
        email: email || user.email,
        phone: phone || user.phone,
        gender: gender || user.gender,
        dob: dob ? dob.toString().split('T')[0] : user.dob,
        address: address || user.address
      },
      { runValidators: true, new: true }
    );

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'User info updated successful',
      {
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar: process.env.APP_BASE_URL + updatedUser.avatar,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        address: updatedUser.address,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for update user avatar/image
exports.avatarUpdate = async (req, res) => {
  try {
    const { user, file } = req;

    if (!user) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    if (file) {
      // if find to delete user old avatar
      if (user?.avatar?.includes('/uploads/users')) {
        fs.unlink(`${appRoot}/public/${user.avatar}`, (err) => {
          if (err) { logger.error(err); }
        });
      }

      // update user info & save database
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { avatar: `/uploads/users/${file.filename}` },
        { runValidators: true, new: true }
      );

      res.status(200).json(successResponse(
        0,
        'SUCCESS',
        'User avatar updated successful',
        {
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          avatar: process.env.APP_BASE_URL + updatedUser.avatar,
          gender: updatedUser.gender,
          dob: updatedUser.dob,
          address: updatedUser.address,
          role: updatedUser.role,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
      ));
    } else {
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'User `avatar` field is required'
      ));
    }
  } catch (error) {
    // if any error delete uploaded avatar image
    if (req?.file?.filename) {
      fs.unlink(`${appRoot}/public/uploads/users/${req.file.filename}`, (err) => {
        if (err) { logger.error(err); }
      });
    }

    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for delete user also database
exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    // delete user form database
    await User.findByIdAndDelete(user.id);

    // user avatar image delete if available
    if (user?.avatar) {
      const userAvatar = user.avatar.includes('/uploads/users');

      if (userAvatar) {
        fs.unlink(`${appRoot}/public${user.avatar}`, (err) => {
          if (err) {
            logger.error(err.message);
          }
        });
      }
    }

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'User delete form database successful'
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for delete user using id by admin
exports.deleteUserById = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    if (req?.user?.id?.toString() === req.params.id) {
      return res.status(400).json(errorResponse(
        1,
        'FAILED',
        'Sorry! You can\'t delete yourself'
      ));
    }

    // delete user form database
    await User.findByIdAndDelete(user.id);

    // user avatar image delete if available
    if (user?.avatar) {
      const userAvatar = user.avatar.includes('/uploads/users');

      if (userAvatar) {
        fs.unlink(`${appRoot}/public${user.avatar}`, (err) => {
          if (err) {
            logger.error(err.message);
          }
        });
      }
    }

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'User delete form database successful'
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};

// TODO: Controller for get users list for admin
exports.getUsersList = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json(errorResponse(
        4,
        'UNKNOWN ACCESS',
        'User does not exist'
      ));
    }

    // finding all users data from database
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(200).json(successResponse(
        0,
        'SUCCESS',
        'No users found',
        {
          rows: [],
          total_rows: 0,
          response_rows: 0,
          total_page: 0,
          current_page: 1
        }
      ));
    }

    // filtering users based on different types query
    const userQuery = new MyQueryHelper(User.find(), req.query).search('fullName').sort().paginate();
    const findUsers = await userQuery.query;

    const mappedUsers = findUsers?.map((data) => ({
      id: data._id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      avatar: process.env.APP_BASE_URL + data.avatar,
      gender: data.gender,
      dob: data.dob,
      address: data.address,
      role: data.role,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }));

    res.status(200).json(successResponse(
      0,
      'SUCCESS',
      'Users list data found successful',
      {
        rows: mappedUsers,
        total_rows: users.length,
        response_rows: findUsers.length,
        total_page: req?.query?.keyword ? Math.ceil(findUsers.length / (parseInt(req.query.limit, 10) || 10)) : Math.ceil(users.length / (parseInt(req.query.limit, 10) || 10)),
        current_page: req?.query?.page ? parseInt(req.query.page, 10) : 1
      }
    ));
  } catch (error) {
    res.status(500).json(errorResponse(
      2,
      'SERVER SIDE ERROR',
      error
    ));
  }
};
