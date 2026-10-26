import ComingSoon from '@/views/ComingSoon';
import { PROCEDURES_VISIBLE } from '@/data/procedures';

export const metadata = {
  title: 'Procedure Details',
  robots: { index: false, follow: true },
};

// The same guard the library article routes use. A procedure's own page is
// still a placeholder, but the route used to answer 200 for any slug at all —
// /procedures/12345 included — an unbounded set of soft 404s for crawlers to
// find. Only real procedure ids are routes now; anything else is a real 404.
// Calling notFound() in the body is not enough on its own: by the time the
// component throws, the streamed shell has already gone out with a 200.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROCEDURES_VISIBLE.map((procedure) => ({ slug: procedure.procedure_id }));
}

export default function ProcedureDetailPage() {
  return <ComingSoon />;
}
