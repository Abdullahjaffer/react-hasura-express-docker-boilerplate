import { stringify } from 'querystring';
import { history, useModel } from 'umi';

export default (props: any) => {
  const { isAuthenticated } = useModel('user', (model) => ({
    isAuthenticated: model.isAuthenticated,
  }));

  const { query = {}, search, pathname } = history.location;
  const { redirect } = query;

  if (isAuthenticated) {
    return props.children;
  } else {
    if (window.location.pathname !== '/join' && !redirect) {
      history.replace({
        pathname: '/join',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
    return <></>;
  }
};
