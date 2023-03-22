import dynamic from 'next/dynamic';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

type PathParams = {
  slug: string;
};

type Props = {
  slug: string;
};

export const pages = {
  helloTriangle: dynamic(() => import('../sample/helloTriangle/main')),
};

function Page({ slug }: Props): JSX.Element {
  const PageComponent = pages[slug];
  return (
    <main>
      <Head>
        <title>{slug}</title>
      </Head>
      <PageComponent />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  return {
    paths: Object.keys(pages).map((p) => {
      return { params: { slug: p } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, PathParams> = async ({
  params,
}) => {
  return {
    props: {
      ...params!,
    },
  };
};

export default Page;
