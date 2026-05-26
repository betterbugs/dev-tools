import { DEVELOPMENTTOOLS } from '@/app/libs/developmentToolsConstant';
import PageClient from './PageClient';

export async function generateStaticParams() {
  return Object.keys(DEVELOPMENTTOOLS).map(slug => ({ slug }));
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <PageClient slug={slug} />;
};

export default Page;
