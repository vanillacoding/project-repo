import {
  Option,
  Caption,
  OptionButton,
} from "@/components/layout/quiz/styled/OptionsStyled";

function TextOptions({ list, handleSelectOption }) {
  return (
    <ul>
      {list.map((example, index) => (
        <Option key={example}>
          <Caption>{index + 1}</Caption>
          <OptionButton
            key={example}
            size={0.9}
            onClick={() => handleSelectOption(example)}
          >
            {example}
          </OptionButton>
        </Option>
      ))}
    </ul>
  );
}

export default TextOptions;
