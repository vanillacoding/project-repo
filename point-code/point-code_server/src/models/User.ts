import { Document, Types, Schema, model, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { WEEK } from '../lib/constants/date';
import { IProblemDocument } from './Problem';

interface ITriedSubmission {
  problem_title: string;
  result: string;
}

interface ISerializedUserDocument extends Document {
  _id: Types.ObjectId,
  name: string;
  email: string;
  avata_url: string;
  tried_submissions: ITriedSubmission[];
  solved_problems: Array<IProblemDocument['_id']>;
  total_point: number;
}

export interface IUserDocument extends ISerializedUserDocument {
  hashed_password: string;
}

interface IUser extends IUserDocument {
  setPassword: (password: string) => void;
  comparePassword: (password: string) => Promise<boolean>;
  serialize: () => ISerializedUserDocument;
  generateToken: () => string;
}

interface IUserModel extends Model<IUser> {
  findByEmail: (email: string) => Promise<IUser> | null;
  findByName: (name: string) => Promise<IUser> | null;
}

const triedSubmissionSchema = new Schema({
  problem_title: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true
  }
}, {
  _id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  avatar_url: {
    type: String,
    default: 'https://recap-project.eu/wp-content/uploads/2017/02/default-user.jpg'
  },
  tried_submissions: [triedSubmissionSchema],
  solved_problems: [{
    type: Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  total_point: {
    type: Number,
    default: 0
  },
  hashed_password: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.methods.setPassword = async function(password: string) {
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
  this.hashed_password = hashedPassword;
};

UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, this.hashed_password);

  return isMatch;
};

UserSchema.methods.serialize = function(): ISerializedUserDocument {
  const data = this.toJSON();
  delete data.hashed_password;

  return data;
};

UserSchema.methods.generateToken = function(): string {
  const token = jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: WEEK
    }
  );

  return token;
};

UserSchema.statics.findByEmail = function(email: string): Promise<IUser> | null {
  return this.findOne({ email });
};

UserSchema.statics.findByName = function(name: string): Promise<IUser> | null {
  return this.findOne({ name });
};

export default model<IUser, IUserModel>('User', UserSchema);
