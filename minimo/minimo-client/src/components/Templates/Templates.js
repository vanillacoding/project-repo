import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import templates from './templateData';
import ProjectViewer from '../shared/ProjectViewer';
import { ProjectContext } from '../../contexts/ProjectContext';
import { AuthContext } from '../../contexts/AuthContext';

export default function Templates() {
  const { userId } = useContext(AuthContext);
  const { setProject } = useContext(ProjectContext);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  function onChange(e) {
    const { value } = e.target;

    setSelectedTemplate(value);

    const templateData = templates.find((each) => each.concept === value);

    setProject((prev) => ({
      ...prev,
      ...JSON.parse(JSON.stringify(templateData)),
      creatorId: userId,
    }));
  }

  return (
    <>
      <TemplatesContainer>
        {templates.map((template) => (
          <Template
            key={template.concept}
          >
            <Header>
              <Radio
                type='radio'
                value={template.concept}
                onChange={onChange}
                checked={(selectedTemplate === template.concept)}
              />
              <Title>{template.concept}</Title>
            </Header>
            <ProjectWrapper>
              <ProjectViewer
                project={template}
              />
            </ProjectWrapper>
          </Template>
        ))}
      </TemplatesContainer>
    </>
  );
}

const Title = styled.span`
  text-align: center;
  font-size: 1.5em;
`;

const TemplatesContainer = styled.div`
  width: 800px;
  margin: auto;
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Template = styled.div`
  width: fit-content;
  border-radius: 50px;
  background: #f5f5f5;
  padding: 1rem .5rem;
  border: 2px solid #f5f5f5;
`;

const ProjectWrapper = styled.div`
  height: 300px;
  width: fit-content;
  overflow-y: auto;
  border-radius: 30px;
`;

const Radio = styled.input``;

const Header = styled.header`
  width: fit-content;
  margin: auto;
  color: #5a5a5a;
  font-weight: 500;
  margin-bottom: 1rem;
`;
