import mongoose from "mongoose";
import Adapters from "next-auth/adapters";

export default class User extends Adapters.TypeORM.Models.User.model {
  // eslint-disable-next-line no-useless-constructor
  constructor(name, email, image, emailVerified, reviews, history, recycleScore, pictures, badges) {
    super(name, email, image, emailVerified);

    this.reviews = reviews || [];
    this.history = history || [];
    this.recycleScore = recycleScore || 0;
    this.pictures = pictures || [];
    this.badges = badges || [];
  }
}

export const UserSchema = {
  name: "User",
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    history: [String],
    recycleScore: {
      type: Number,
      default: 0,
    },
    pictures: [String],
    badges: [String],
  },
};
