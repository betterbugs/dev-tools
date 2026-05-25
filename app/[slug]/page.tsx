import { DEVELOPMENTTOOLS } from '@/app/libs/developmentToolsConstant';
import PageClient from './PageClient';

export async function generateStaticParams() {
  return Object.keys(DEVELOPMENTTOOLS).map((slug) => ({ slug }));
}

const Page = ({ params: { slug } }: { params: { slug: string } }) => {
  return <PageClient slug={slug} />;
};

export default Page;
