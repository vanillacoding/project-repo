import styled from "styled-components";
import PropTypes from "prop-types";

import PreviewSnippet from "../SnippetList/PreviewSnippet/PreviewSnippet";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ListBox = styled.div`
  width: 700px;
`;

export default function UserSnippetList({ snippets, profileImage, nickname }) {
  return (
    <Wrapper>
      <ListBox>
        {snippets && snippets.map((snippet) => (
          <PreviewSnippet key={snippet._id} data={snippet} snippetId={snippet._id} profileImage={profileImage} nickname={nickname} />
        ))}
      </ListBox>
    </Wrapper>
  );
}

UserSnippetList.propTypes = {
  snippets: PropTypes.array,
  profileImage: PropTypes.string.isRequired,
  nickname: PropTypes.string,
};
