import ComingSoon from '@/views/ComingSoon';

export const metadata = {
  title: 'Procedure Details',
  robots: { index: false, follow: true },
};

export default async function ProcedureDetailPage({ params }) {
  const { slug } = await params;
  return <ComingSoon slug={slug} />;
}
