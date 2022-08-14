import { FORM_RULES } from '@/utils/rules';
import { IdcardOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-components';
import React from 'react';
import { useIntl } from 'umi';

const RegisterFormFields: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <ProFormText
        label="Name"
        name="name"
        fieldProps={{
          size: 'large',
          prefix: <IdcardOutlined />,
        }}
        placeholder={intl.formatMessage({
          id: 'pages.login.name.placeholder',
        })}
        rules={[
          {
            required: true,
          },
          {
            min: 4,
          },
          {
            max: 128,
          },
          FORM_RULES.ONLY_ALPHA,
        ]}
      />
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
      <ProFormText.Password
        label="Confirm Password"
        name="confirmPassword"
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
          FORM_RULES.MATCH_WITH('password'),
        ]}
      />
    </>
  );
};

export default RegisterFormFields;
