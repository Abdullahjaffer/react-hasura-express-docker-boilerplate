import apolloClient from '@/apolloClient';
import { eraseCookie, getCookie, setCookie } from '@/utils/shared';
import { gql, useMutation } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import { parse } from 'querystring';
import { useCallback, useEffect, useState } from 'react';
import { history } from 'umi';
import { COOKIE_NAMES } from './../constants/cookieNames';

interface IVars {
  email: string;
  password: string;
  autoLogin?: boolean;
  name?: string;
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      accessToken
    }
  }
`;

const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    userRegister(email: $email, password: $password, name: $name) {
      accessToken
    }
  }
`;

const getUserFormCookies = () => {
  const jwt = getCookie(COOKIE_NAMES.JWT);
  if (jwt) {
    const parsed: any = jwt_decode(jwt);
    if (Date.now() >= parsed.exp * 1000) {
      eraseCookie(COOKIE_NAMES.JWT);
      return {};
    } else {
      return {
        ...parsed.user,
        token: jwt,
      };
    }
  }
  return {};
};

export default function useUserModel() {
  const [login, loginState] = useMutation(LOGIN, {
    client: apolloClient,
  });
  const [register, registerState] = useMutation(REGISTER, {
    client: apolloClient,
  });
  const [user, setUser] = useState(getUserFormCookies());
  const loginRequest = useCallback(({ email, password, autoLogin }: IVars) => {
    login({
      variables: {
        email,
        password,
      },
    }).then(({ data }) => {
      if (autoLogin) {
        setCookie(COOKIE_NAMES.JWT, data.userLogin.accessToken, 3);
        setUser(getUserFormCookies());
        sessionStorage.setItem(COOKIE_NAMES.JWT, getUserFormCookies().token);
        const parsed = parse(history.location.search?.substring(1));
        if (parsed.redirect) {
          history.push(parsed.redirect as string);
        } else {
          history.push('/');
        }
      }
    });
  }, []);

  const registerRequest = useCallback(
    ({ email, password, autoLogin, name }: IVars) => {
      register({
        variables: {
          email,
          password,
          name,
        },
      }).then(({ data }) => {
        if (autoLogin) {
          setCookie(COOKIE_NAMES.JWT, data.userRegister.accessToken, 3);
          setUser(getUserFormCookies());
          sessionStorage.setItem(COOKIE_NAMES.JWT, getUserFormCookies().token);
          history.push('/');
        }
      });
    },
    [register],
  );

  useEffect(() => {
    sessionStorage.setItem(COOKIE_NAMES.JWT, user.token);
  }, [user]);

  const logout = async () => {
    eraseCookie(COOKIE_NAMES.JWT);
    setUser({});
    sessionStorage.removeItem(COOKIE_NAMES.JWT);
    await apolloClient.resetStore();
  };

  return {
    login: loginRequest,
    register: registerRequest,
    logout,
    loginState,
    registerState,
    user,
    isAuthenticated: !!getUserFormCookies()?.id,
  };
}
