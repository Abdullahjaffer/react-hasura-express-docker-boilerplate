import { Space, Switch } from 'antd';
import React from 'react';
import { useModel } from 'umi';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Switch
        checked={navTheme === 'realDark'}
        onChange={(p) => {
          if (p) {
            setInitialState((pre) => ({
              ...pre,
              settings: {
                ...pre?.settings,
                navTheme: 'realDark',
              },
            }));
          } else {
            setInitialState((pre) => ({
              ...pre,
              settings: {
                ...pre?.settings,
                navTheme: 'light',
              },
            }));
          }
        }}
      />
      <Avatar />
    </Space>
  );
};
export default GlobalHeaderRight;
