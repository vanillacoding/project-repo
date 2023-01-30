import React from 'react';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { currentUserInfo } from '../../store/states';
import Navbar from '../../components/navbar';
import currentUserMockData from '../mockdata/current_user.json';
import { createMindMapData } from '../../service/mindmaprequests';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../service/mindmaprequests', () => ({
  createMindMapData: jest.fn(),
}));

createMindMapData.mockReturnValue({
  mindMap: {
    _id: 'test',
  },
});

useRouter.mockReturnValue({
  push: jest.fn(),
});

const router = useRouter();
describe('Navbar - not login', () => {
  beforeEach(() => {
    act(() => {
      render(
        <RecoilRoot>
          <Navbar />,
        </RecoilRoot>,
      );
    });
  });

  it('should be visible a create button', () => {
    const createButton = screen.getByRole('button', { name: 'Create' });
    expect(createButton).toBeInTheDocument();
  });

  it('should not move the page when click a create button', () => {
    const createButton = screen.getByRole('button', { name: 'Create' });

    fireEvent.click(createButton);
    expect(router.push).toBeCalledTimes(0);
  });
  it('should be visible a public button', () => {
    const publicButton = screen.getByRole('button', { name: 'Public' });
    expect(publicButton).toBeInTheDocument();
  });

  it('should move the page when click a public button', () => {
    const publicButton = screen.getByRole('button', { name: 'Public' });

    fireEvent.click(publicButton);
    expect(router.push).toBeCalledTimes(1);
  });
});

describe('Navbar - login', () => {
  beforeEach(() => {
    const initialRecoilState = snap => {
      snap.set(currentUserInfo, currentUserMockData);
    };
    render(
      <RecoilRoot initializeState={initialRecoilState}>
        <Navbar />,
      </RecoilRoot>,
    );
  });

  it('should be visible a my work button', () => {
    const myworkButton = screen.getByRole('button', { name: 'My Work' });
    expect(myworkButton).toBeInTheDocument();
  });

  it('should move the page when click a my work button', () => {
    const myworkButton = screen.getByRole('button', { name: 'My Work' });

    fireEvent.click(myworkButton);
    expect(router.push).toBeCalledTimes(1);
  });

  it('should move the page when click a create button', async () => {
    const createButton = screen.getByRole('button', { name: 'Create' });

    fireEvent.click(createButton);
    await waitFor(() => expect(createMindMapData).toBeCalledTimes(1));
  });
});
