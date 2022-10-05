import { Document, Types, Schema, model } from 'mongoose';
import { IUserDocument } from './User';

enum Level {
  EASY = 1,
  NORMAL = 2,
  HARD = 3
}

interface ITest {
  expected_input: string;
  expected_output: any;
}

interface ISolution {
  solved_user: IUserDocument['_id'];
  submitted_code: string;
  point: number;
}

export interface IProblemDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  level: Level;
  description: string;
  initial_code: string;
  tests: ITest[];
  solutions: ISolution[];
}

const testSchema = new Schema({
  expected_input: {
    type: String,
    required: true
  },
  expected_output: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  _id: false
});

const solutionSchema = new Schema({
  solved_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submitted_code: {
    type: String,
    required: true
  },
  point: {
    type: Number,
    required: true
  }
}, {
  _id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const ProblemSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  level: {
    type: Number,
    enum: [1, 2, 3],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  initial_code: {
    type: String,
    required: true
  },
  tests: {
    type: [testSchema],
    required: true
  },
  solutions: [solutionSchema]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default model<IProblemDocument>('Problem', ProblemSchema);
