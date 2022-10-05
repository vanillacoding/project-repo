import React, { useCallback } from 'react';
import { Wrapper } from '../styledComponents/Editor.styled';
import { Slate, Editable } from 'slate-react';
import HoveringToolbar from './HoveringToolbar';
import Leaf from './Leaf';
import uuid from 'uuid-random';

export default function Editor({
  editor,
  value,
  hasWritingPermission,
  onNoteValueChange,
}) {
  const enterPressHandler = useCallback(() => {
    const newBlock = {
      type: 'paragraph',
      children: [{ text: '' }],
      idLookingForwards: uuid(),
    };

    editor.insertNode(newBlock);
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  function noteValueChangeHandler(value) {
    onNoteValueChange(value);
  }

  return (
    <Wrapper>
      <Slate
        editor={editor}
        value={value}
        onChange={value => noteValueChangeHandler(value)}
      >
        <HoveringToolbar />
        <Editable
          renderLeaf={renderLeaf}
          placeholder='줄을 자주 바꿔주세요.'
          readOnly={!hasWritingPermission}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              enterPressHandler();
            }
          }}
        />
      </Slate>
    </Wrapper>
  );
}
