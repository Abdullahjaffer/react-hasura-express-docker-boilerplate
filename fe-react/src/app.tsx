import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import React, { Suspense } from 'react';
import type { RunTimeLayoutConfig } from 'umi';
import defaultSettings from '../config/defaultSettings';
import apolloClient from './apolloClient';
import validateMessages from './components/Errors/validateMessages';

// const isDev = process.env.NODE_ENV === 'development';

const CombinedProviders = ({ children, routes }: any) => {
  const newChildren = React.cloneElement(children, {
    ...children.props,
    routes,
  });

  return (
    <Suspense fallback={<PageLoading />}>
      <ConfigProvider
        form={{
          validateMessages: validateMessages,
          requiredMark: false,
        }}
        locale={{ locale: 'en-US' }}
      >
        <ApolloProvider client={apolloClient}>{newChildren}</ApolloProvider>
      </ConfigProvider>
    </Suspense>
  );
};

export const rootContainer = (container: JSX.Element) => {
  return React.createElement(CombinedProviders, null, container);
};

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  return {
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: true,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <div
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          >
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
              themeOnly
            />
          </div>
        </>
      );
    },
    ...initialState?.settings,
  };
};
