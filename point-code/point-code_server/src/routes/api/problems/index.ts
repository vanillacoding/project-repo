import express from 'express';
import { checkLoggedIn } from '../../../lib/middlewares/auth';
import * as problemsCtrl from './problems.ctrl';

const problems = express.Router();

problems.get('/', problemsCtrl.readProblems);

problems.get('/:problem_id', checkLoggedIn, problemsCtrl.getProblemById, problemsCtrl.readProblem);
problems.put('/:problem_id', checkLoggedIn, problemsCtrl.getProblemById, problemsCtrl.confirmSolution);

problems.get('/:problem_id/solutions', checkLoggedIn, problemsCtrl.getProblemById, problemsCtrl.readSolutions);

export default problems;
