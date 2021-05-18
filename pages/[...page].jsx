import { builder, BuilderComponent } from '@builder.io/react';
import FourOFour from '../components/404';
import Header from '../components/Header';
import Footer from '../components/Footer';

builder.init('bpk-4b69c57b01ca4a729839d378e8db662a');

export default function MyComponent(props) {
  return (
    <>
      <Header />
      {props.content ?
        <BuilderComponent
          content={props.content}
          model="page" />
       : <FourOFour />}
      <Footer />
    </>
  )
} 

// Get page data
// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps = async (context) => {
  const content = await builder.get('page', { url: context.resolvedUrl }).promise();

  return { 
    props: { content }, 
    revalidate: true,
    notFound: !content
  }
}

// List all Builder pages
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async () => {
  const results = await builder.getAll('page', {
    fields: 'data.url',
    key: 'all-pages',
    limit: 200,
    options: {
      noTargeting: true,
    },
  });

  return {
    paths: results.map((item) => ({
      params: {
        page: item.data.url.substr(1) // Remove preceeding slash
      },
    })),
    fallback: true,
  };
};