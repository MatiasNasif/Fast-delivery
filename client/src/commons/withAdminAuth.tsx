import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';
import { ReactElement } from 'react';

interface User {
  fullName: string;
  status?: string | undefined;
  admin: boolean;
}

type PropsWithAdmin = { isAdmin: boolean };

const withAdminAuth = <P extends PropsWithAdmin>(
  WrappedComponent: NextPage<P>
): ((props: P) => ReactElement | null) => {
  const Wrapper = (props: P) => {
    const router = useRouter();

    let user: User | null = null;
    if (typeof window !== 'undefined') {
      const userLocalStorage: string | null = localStorage.getItem('user');
      user = userLocalStorage !== null ? JSON.parse(userLocalStorage) : null;
    }
    const isAdmin: boolean | undefined = user?.admin;

    if (!isAdmin) {
      if (typeof window !== 'undefined') {
        router.push('/');
        localStorage.removeItem('user');
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps };
  };

  return Wrapper;
};

export default withAdminAuth;
