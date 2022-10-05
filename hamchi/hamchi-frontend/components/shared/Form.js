import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createError } from '../../features/userSlice';
import errorMessage from '../../constants/errorMessage';

import { View, Text, StyleSheet } from 'react-native';
import RadioButton from './RadioButton';
import Button from './Button';
import Input from './Input';

const getInitialState = (fieldKeys) => {
  const state = {};

  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const Form = ({ additionalParams, fields, action, afterSubmit }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.userId);
  const username = useSelector(state => state.user.username);

  const fieldsKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialState(fieldsKeys));

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };

    setValues(newState);
  };

  const submit = async () => {
    try {
      const response = await action({
        ...values,
        userId,
        username,
        ...additionalParams
      });

      if (response.code === 200) {
        afterSubmit();
      } else {
        dispatch(createError(response.message));
      }

    } catch (err) {
      dispatch(createError(errorMessage.INTERNAL_ERROR));
    }
  };

  return (
    <>
      {fieldsKeys.map((key) => {
        const field = fields[key];

        return (
          <View key={key}>
            <Text style={style.label}>{field.label}</Text>
            {field.inputType === 'radio' ?
              <RadioButton
                options={field.options}
                map={field.map}
                onChangeOption={(option) => onChangeValue(key, option)}
              />
              : <Input
                {...field.inputProps}
                value={field.value}
                onChangeText={(text) => onChangeValue(key, text)}
              />
            }
          </View>
        );
      })}
      <Button
        text="저장"
        type="filled"
        onPress={submit}
        customButtonStyle={style.button}
      />
    </>
  );
};

const style = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  button: {
    width: '30%',
    alignSelf: 'center',
    margin: 30
  }
});

export default Form;
