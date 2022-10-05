import 'jest-canvas-mock';
import '@testing-library/jest-dom';
import { server } from './test/server';

beforeAll(() => server.listen());

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
