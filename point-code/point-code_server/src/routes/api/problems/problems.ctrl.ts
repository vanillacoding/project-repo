import { RequestHandler, Request, Response } from 'express';
import Joi from '@hapi/joi';
import mongoose from 'mongoose';
import createError from 'http-errors';
import { Linter } from 'eslint';
import { VM, VMScript } from 'vm2';
import _ from 'lodash';
import { RUNTIME_ERROR, WRONG_ANSWER, ACCEPTED } from '../../../lib/constants/submissionResult';
import User from '../../../models/User';
import Problem, { IProblemDocument } from '../../../models/Problem';

export const getProblemById: RequestHandler = async (req, res, next) => {
  const { ObjectId } = mongoose.Types;
  const { problem_id: problemId } = req.params;

  if (!ObjectId.isValid(problemId)) {
    return next(createError(400));
  }

  try {
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return next(createError(404));
    }

    res.locals.problem = problem;
    next();
  } catch (e) {
    next(createError(500));
  }
};

export const readProblems: RequestHandler = async (req, res, next) => {
  type RequestQuery = {
    page?: string;
    level?: string;
  };

  const { page = '1', level }: RequestQuery = req.query;
  const query = {
    ...(level ? { level: Number(level) } : {})
  };

  if (Number(page) < 1) {
    return next(createError(400));
  }

  try {
    const problems = await Problem.find(query)
      .sort({ level: 1 })
      .limit(6)
      .skip((Number(page) - 1) * 6)
      .lean();
    const pageCount = await Problem.countDocuments(query);

    res.set('Last-Page', String(Math.ceil(pageCount / 6) || 1));
    res.json(problems);
  } catch (e) {
    next(createError(500));
  }
};

export const readProblem = (req: Request, res: Response) => {
  const { problem } = res.locals;
  res.json(problem);
};

export const confirmSolution: RequestHandler = async (req, res, next) => {
  type RequestBody = {
    userCode: string;
  };

  const schema = Joi.object().keys({
    userCode: Joi.string().required()
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return next(createError(400, validationResult.error.details[0].message));
  }

  try {
    const { userCode }: RequestBody = req.body;
    const { decodedUser, problem }: { decodedUser: { _id: string }, problem: IProblemDocument } = res.locals;
    const user = await User.findById(decodedUser._id);
    const vm = new VM();
    const failureTestsIndex = [];

    if (user!.solved_problems.includes(problem._id)) {
      return next(createError(400));
    }

    for (let i = 0; i < problem.tests.length; i++) {
      const test = problem.tests[i];

      try {
        const script = new VMScript(`${userCode}\n${test.expected_input};`);
        const userSolution = vm.run(script);

        if (!_.isEqual(userSolution, test.expected_output)) {
          failureTestsIndex.push(i + 1);
        }
      } catch (e) {
        user!.tried_submissions.push({
          problem_title: problem.title,
          result: RUNTIME_ERROR
        });
        await user!.save();

        return next(createError(400));
      }
    }

    if (failureTestsIndex.length) {
      user!.tried_submissions.push({
        problem_title: problem.title,
        result: WRONG_ANSWER
      });
      await user!.save();

      return res.json({ result: 'failure', failureTestsIndex, solution: null });
    }

    const linter = new Linter();
    const messages = linter.verify(userCode, {
      parserOptions: { ecmaVersion: 2020 },
      rules: {
        indent: ['error', 2, { SwitchCase: 1 }],
        semi: 'error',
        'no-var': 'error'
      }
    });

    const solution = {
      solved_user: user!._id,
      submitted_code: userCode,
      point: 100 - messages.length
    };

    user!.tried_submissions.push({
      problem_title: problem.title,
      result: ACCEPTED
    });
    user!.solved_problems.push(problem._id);
    user!.total_point += solution.point;
    await user!.save();

    problem.solutions.push(solution);
    await problem.save();

    res.json({ result: 'success', failureTestsIndex, solution });
  } catch (e) {
    next(createError(500));
  }
};

export const readSolutions: RequestHandler = async (req, res, next) => {
  const { decodedUser, problem }: { decodedUser: { _id: string }, problem: IProblemDocument } = res.locals;

  try {
    const user = await User.findById(decodedUser._id);

    if (!user!.solved_problems.includes(problem._id)) {
      return next(createError(401));
    }

    const populatedProblem = await Problem.findById(problem._id).populate({
      path: 'solutions.solved_user',
      select: '_id name email avatar_url tried_submissions solved_problems total_point'
    });

    res.json(populatedProblem!.solutions);
  } catch (e) {
    next(createError(500));
  }
};
