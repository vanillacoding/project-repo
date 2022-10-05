import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useQuery } from "react-query";
import styled from "styled-components";

import PreviewSnippet from "./PreviewSnippet/PreviewSnippet";
import Button from "../common/Button";

import { getSnippetList } from "../../api/service";

const Loading = styled.p`
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  margin: auto;
`;

export default function SnippetList() {
  const { search: query } = useLocation();

  const [page, setPage] = useState(1);
  const [snippets, setSnippets] = useState(null);
  const resource = { page };

  const {
    refetch,
    isLoading,
  } = useQuery("snippetList", async () => await getSnippetList(resource, query), {
    enabled: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await refetch();

      if (snippets === null) {
        setSnippets(data.snippetList);

        return;
      }

      setSnippets([...snippets, ...data.snippetList]);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, refetch]);

  if (isLoading) {
    return <Loading>로딩 중...</Loading>;
  }

  const handleButtonClick = async () => setPage(page + 1);

  return (
    <Wrapper>
      {snippets && snippets.map((snippet) => (
        <PreviewSnippet key={snippet._id} data={snippet} snippetId={snippet._id} />
      ))}
      <Button variant="utility" onClick={handleButtonClick} children="더 보기" />
    </Wrapper>
  );
}
