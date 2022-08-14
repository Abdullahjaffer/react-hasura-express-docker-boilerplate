import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import React from 'react';
import { useIntl } from 'umi';

const LoginFormFields: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <ProFormText
        label="Email"
        name="email"
        fieldProps={{
          size: 'large',
          prefix: <MailOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.email.placeholder',
          defaultMessage: 'Email',
        })}
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          },
        ]}
      />
      <ProFormText.Password
        label="Password"
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.password.placeholder',
          defaultMessage: '密码: ant.design',
        })}
        rules={[
          {
            required: true,
          },
          {
            min: 8,
            max: 32,
          },
        ]}
      />
    </>
  );
};

export default LoginFormFields;
