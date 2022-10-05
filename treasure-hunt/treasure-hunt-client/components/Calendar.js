import React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
import message from '../constants/message';

export default function Calendar({ setShowDate, setExpiration }) {
  const onChange = (ev) => {
    const newExpiration = ev.nativeEvent.timestamp || new Date().getTime();
    setShowDate(false);
    if (new Date() > new Date(newExpiration)) return alert(message.invalidExpiration);
    return setExpiration(newExpiration);
  };

  return (
    <RNDateTimePicker
      display="default"
      mode="date"
      value={new Date()}
      onChange={onChange}
    />
  );
}

Calendar.propTypes = {
  setShowDate: PropTypes.func.isRequired,
  setExpiration: PropTypes.func.isRequired,
};
