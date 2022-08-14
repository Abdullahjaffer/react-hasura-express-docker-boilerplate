import SwitchComponent from '@/components/Helpers/SwitchComponent';
import LoginFormFields from '@/components/Pages/Authentication/LoginFormFields';
import RegisterFormFields from '@/components/Pages/Authentication/RegisterFormFields';
import { LoginForm, ProFormCheckbox } from '@ant-design/pro-components';
import { Alert, Button, Tabs } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl, useModel } from 'umi';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('login');
  const { login, register, loading, loginError, registerError } = useModel('user', (model) => ({
    login: model.login,
    register: model.register,
    loading: model.loginState.loading || model.registerState.loading,
    loginError: model.loginState.error?.message,
    registerError: model.registerState.error?.message,
  }));
  const intl = useIntl();
  const handleSubmit = async (values: any) => {
    if (type === 'login') {
      login({
        email: values.email!!,
        password: values.password!!,
        autoLogin: values.autoLogin,
      });
    } else {
      register({
        email: values.email!!,
        password: values.password!!,
        autoLogin: values.autoLogin,
        name: values.name,
      });
    }
  };

  return (
    <div>
      <LoginForm
        logo={<img alt="logo" src="/pro_icon.svg" />}
        title="HEHE"
        subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
        initialValues={{
          autoLogin: true,
        }}
        actions={[]}
        onFinish={async (values) => {
          await handleSubmit(values);
        }}
        submitter={{
          render: ({ form }) => {
            return (
              <Button
                type="primary"
                block
                loading={loading}
                onClick={() => {
                  form?.submit();
                }}
              >
                <SwitchComponent
                  trueCase={type}
                  componentMap={{
                    register: <>Sign Up</>,
                    login: <>Log In</>,
                  }}
                />
              </Button>
            );
          },
        }}
        message={
          <SwitchComponent
            trueCase={type}
            componentMap={{
              login: loginError ? <Alert type="error" message={loginError} /> : null,
              register: registerError ? <Alert type="error" message={registerError} /> : null,
            }}
          />
        }
        validateTrigger={['onBlur', 'onChange']}
      >
        <Tabs activeKey={type} onChange={setType} destroyInactiveTabPane>
          <Tabs.TabPane
            key="login"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
            })}
          >
            <LoginFormFields />
          </Tabs.TabPane>
          <Tabs.TabPane
            key="register"
            tab={intl.formatMessage({
              id: 'pages.login.register.tab',
            })}
          >
            <RegisterFormFields />
          </Tabs.TabPane>
        </Tabs>
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
          </ProFormCheckbox>
        </div>
      </LoginForm>
    </div>
  );
};

export default Login;
