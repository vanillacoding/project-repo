import { REG_PETTERNS } from '../constants';

const handleInput = (value, setFunction) => {
  setFunction(value.replace(REG_PETTERNS.name, ''));
};

export default handleInput;
