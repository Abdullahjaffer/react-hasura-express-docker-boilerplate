import { ProForm, ProFormCheckbox, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';
import { useModel } from 'umi';

const StartNewProject: React.FC = () => {
  const { createProject } = useModel('project');

  return (
    <Card>
      <ProForm
        initialValues={{
          isPrivate: true,
        }}
        onFinish={createProject}
      >
        <ProFormText
          label="Project Name"
          name={'name'}
          rules={[
            {
              required: true,
            },
            {
              min: 1,
              max: 60,
            },
          ]}
        />
        <ProFormTextArea
          label="Project Description"
          name={'description'}
          rules={[
            {
              required: true,
            },
            {
              min: 1,
              max: 700,
            },
          ]}
        />
        <ProFormCheckbox name={'isPrivate'}>Is Private</ProFormCheckbox>
      </ProForm>
    </Card>
  );
};

export default StartNewProject;
