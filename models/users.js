const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error();
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    age: {
      type: Number,
      default: 18,
      min: 12,
    },
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.statics.userCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Wrong Email!!!");
  }

  const passMatched = await bcrypt.compare(password, user.password);

  if (!passMatched) {
    throw new Error("Wrong Password!!!");
  }

  return user;
};

userSchema.methods.genAuthToken = async function () {
  const token = await jwt.sign(
    { _id: this._id.toString() },
    process.env.JWT_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
