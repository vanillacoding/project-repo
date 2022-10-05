import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import ContentForm from "../components/ContentForm";
import ContentSpectator from "../components/ContentSpectator";
import getApi from "../api/category";

const LENGTH = 7;

const Container = styled.div`
  display: flex;
  flex-flow: row-reverse wrap;
  justify-content: center;

  .list {
    flex-grow: 1;
    justify-items: center;
    max-width: 680px;
  }
`;

function CustomAlbum() {
  const { creatorId, category } = useParams();
  const { get, post } = getApi(category);
  const [albums, setAlbums] = useState({
    prevBuffer: [],
    current: [],
    nextBuffer: [],
    prevPage: null,
    nextPage: 1,
  });

  const handleSubmitForm = async function ({
    date, heartCount, image, text,
  }) {
    await post(creatorId, {
      date, image, heartCount, text,
    });
  };

  useEffect(() => {
    async function fetchAlbums() {
      const result = await get(creatorId, 1);

      if (!result) {
        return;
      }

      setAlbums((prevState) => {
        return {
          ...prevState,
          current: result.data,
          nextPage: result.nextPage,
        };
      });
    }

    fetchAlbums();
  }, []);

  useEffect(() => {
    async function fetchBuffer() {
      const result = await get(creatorId, albums.prevPage);

      if (!result) {
        return;
      }

      setAlbums((prevState) => {
        return {
          ...prevState,
          prevBuffer: [...result.data, ...prevState.prevBuffer],
          prevPage: result.prevPage,
        };
      });
    }

    const isDataEnough = albums.prevBuffer.length >= LENGTH;
    const isFetchEnable = Boolean(albums.prevPage);

    if (isDataEnough || !isFetchEnable) {
      return;
    }

    fetchBuffer();
  }, [albums.prevBuffer.length]);

  useEffect(() => {
    async function fetchBuffer() {
      const result = await get(creatorId, albums.nextPage);

      if (!result) {
        return;
      }

      setAlbums((prevState) => {
        return {
          ...prevState,
          nextBuffer: [...prevState.nextBuffer, ...result.data],
          nextPage: result.nextPage,
        };
      });
    }

    const isDataEnough = albums.nextBuffer.length >= LENGTH;
    const isFetchEnable = Boolean(albums.nextPage);

    if (isDataEnough || !isFetchEnable) {
      return;
    }

    fetchBuffer();
  }, [albums.nextBuffer.length]);

  const handleWheel = function (isAscending, count) {
    if (isAscending) {
      setAlbums((prevState) => {
        const { prevBuffer, current, nextBuffer } = prevState;
        const prevAlbums = current.slice(0, count);
        const remainingAlbums = current.slice(count);
        const newAlbums = nextBuffer.slice(0, count);
        const remainingNext = nextBuffer.slice(count);
        const updatedCurrent = [...remainingAlbums, ...newAlbums];

        if (updatedCurrent.length < LENGTH) {
          return prevState;
        }

        return {
          ...prevState,
          prevBuffer: [...prevBuffer, ...prevAlbums],
          current: [...remainingAlbums, ...newAlbums],
          nextBuffer: remainingNext,
        };
      });
    } else {
      setAlbums((prevState) => {
        const { prevBuffer, current, nextBuffer } = prevState;
        const remainingPrev = prevBuffer.slice(0, -count);
        const newAlbums = prevBuffer.slice(-count);
        const remainingAlbums = current.slice(0, -count);
        const prevAlbums = current.slice(-count);
        const updatedCurrent = [...newAlbums, ...remainingAlbums];

        if (updatedCurrent.length < LENGTH) {
          return prevState;
        }

        return {
          ...prevState,
          prevBuffer: remainingPrev,
          current: updatedCurrent,
          nextBuffer: [...prevAlbums, ...nextBuffer],
        };
      });
    }
  };

  return (
    <div>
      <h1>{category}</h1>
      <Container>
        <div className="viewer">
          <ContentForm
            onSubmit={handleSubmitForm}
            submitButtonText="add album"
          />
        </div>
        <div>
          <ContentSpectator
            creatorId={creatorId}
            category={category}
            contents={albums.current || []}
            onWheel={handleWheel}
          />
        </div>
      </Container>
    </div>
  );
}

export default CustomAlbum;
