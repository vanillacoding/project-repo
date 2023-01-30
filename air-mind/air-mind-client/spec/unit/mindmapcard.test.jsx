import React from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { render, renderHook, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { currentUserInfo } from '../../store/states';
import MindMapCard from '../../components/mindmapcard';
import mindmapPublicMockData from '../mockdata/mindmap_public.json';
import mindmapPrivateMockData from '../mockdata/midmap_private.json';
import currentUserMockData from '../mockdata/current_user.json';
import generatedateformat from '../../utils/generatedateformat';

let container;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const { result } = renderHook(() => useSetRecoilState(currentUserInfo), {
  wrapper: RecoilRoot,
});

describe('MindMapCard - public mindmap - not permission', () => {
  beforeEach(() => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    const renameTitleHandler = jest.fn();

    act(() => {
      container = render(
        <RecoilRoot>
          <MindMapCard
            mindMap={mindmapPublicMockData}
            renameTitleHandler={renameTitleHandler}
          />
          ,
        </RecoilRoot>,
      );
    });
  });

  it('should render without crashing', () => {
    expect(screen).toBeDefined();
  });

  it('should renders a mindmap data', () => {
    const titleInput = screen.getByRole('textbox');
    const nameDiv = screen.getByText(mindmapPublicMockData.author.userName);
    const accessDiv = screen.getByText(mindmapPublicMockData.access);
    const createdAtDiv = screen.getByText(
      generatedateformat(mindmapPublicMockData.createdAt),
    );
    expect(titleInput).toBeInTheDocument();
    expect(nameDiv).toBeInTheDocument();
    expect(accessDiv).toBeInTheDocument();
    expect(createdAtDiv).toBeInTheDocument();
    expect(titleInput).toHaveValue('test');
  });

  it('should open options menu when user click the option button', () => {
    const optionButton = screen.getByRole('button');
    fireEvent.click(optionButton);
    expect(container).toMatchSnapshot();
  });

  it('should not be modified without permission', () => {
    const titleInput = screen.getByRole('textbox');
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(titleInput);

    expect(window.alert).toBeCalledTimes(1);
  });
  it('should move the page when click the thumbnail', async () => {
    const router = useRouter();
    const wrapper = screen.getByTestId('thumbnailWrapper');
    fireEvent.click(wrapper);

    expect(router.push).toBeCalled();
  });
});

describe('MindMapCard - public mindmap - permission', () => {
  beforeEach(() => {
    const renameTitleHandler = jest.fn();
    result.current(currentUserMockData);

    const initialRecoilState = snap => {
      snap.set(currentUserInfo, currentUserMockData);
    };
    act(() => {
      container = render(
        <RecoilRoot initializeState={initialRecoilState}>
          <MindMapCard
            mindMap={mindmapPublicMockData}
            renameTitleHandler={renameTitleHandler}
          />
          ,
        </RecoilRoot>,
      );
    });
  });

  it('should be modified with permission', () => {
    const titleInput = screen.getByRole('textbox');

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(titleInput);

    expect(window.alert).toBeCalledTimes(0);
  });
});

describe('MindMapCard - private mindmap', () => {
  beforeEach(() => {
    const renameTitleHandler = jest.fn();

    act(() => {
      container = render(
        <RecoilRoot>
          <MindMapCard
            mindMap={mindmapPrivateMockData}
            renameTitleHandler={renameTitleHandler}
          />
          ,
        </RecoilRoot>,
      );
    });
  });

  it('should view lock icon', () => {
    const titleInput = screen.getByTestId('lockWrapper');

    expect(titleInput).toBeInTheDocument();
  });
});
