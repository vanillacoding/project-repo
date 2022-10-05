import React from 'react';
import { Provider } from 'react-redux';
import store from '../../features/store';
import { queryByAttribute } from '@testing-library/react';
import { render, fireEvent } from '@testing-library/react-native';
import AdoptCardList from '../../components/AdoptCardList';


describe('adopt card list test', () => {
  it('calls onPressCard prop when pressed', () => {
    const handlePressCard = jest.fn();
    const getById = queryByAttribute.bind(null, 'id');
    const dom = render(
      <Provider store={store}>
        <AdoptCardList
          onPressCard={handlePressCard}
        />
      </Provider>
    );
    // const adoptCard = getById(dom, '60a75de79b472913a33904db');

    // fireEvent.press(adoptCard);
    // expect(handlePressCard).toHaveBeenCalledTimes(1);
  });
});
