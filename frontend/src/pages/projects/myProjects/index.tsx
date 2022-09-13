import GridWrapper from '@/components/Grid/cardWrapperGrid';
import LoadingCards from '@/components/Loadings/loadingCards';
import Conditional from '@/components/Utils/conditional';
import React from 'react';
import { useModel } from 'umi';
import ProjectCard from './components/projectCard';

const StartNewProject: React.FC = () => {
  const { data, loading } = useModel('project', (model) => ({
    data: model.projects.data,
    loading: model.projects.loading,
  }));

  return (
    <>
      <Conditional condition={!loading} fallback={<LoadingCards />}>
        <GridWrapper
          data={data}
          Renderer={(d) => <ProjectCard name={''} description={''} {...d} />}
        />
      </Conditional>
    </>
  );
};

export default StartNewProject;
