import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import MindMap from '../../components/mindmap';
import {
  getMindMapAccessInfo,
  getAllMindMapId,
} from '../../service/mindmaprequests';

export default function MindMapPage({ title, mindMapId }) {
  return (
    <>
      <Head />
      <meta name="title" title={title} />
      <MindMap mindMapId={mindMapId} />
    </>
  );
}

export async function getStaticProps(context) {
  const { mindMapId } = context.params;
  const data = await getMindMapAccessInfo('anonymous', mindMapId);

  const title = data.mindMap?.title || '';

  return {
    props: {
      title,
      mindMapId,
    },
  };
}

export async function getStaticPaths() {
  const { mindMapId: mindMapIdList } = await getAllMindMapId();
  const paths = [];

  if (mindMapIdList) {
    mindMapIdList.forEach(mindMapId => {
      paths.push({ params: { mindMapId } });
    });
  }

  return {
    paths,
    fallback: true,
  };
}

MindMapPage.propTypes = {
  title: PropTypes.string.isRequired,
  mindMapId: PropTypes.string.isRequired,
};
