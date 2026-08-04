import { buildCategoryMetadata, buildCategorySchemas } from '@/lib/libraryPages';
import LibraryCategory from '@/views/LibraryCategory';
import JsonLd from '@/components/JsonLd';

const CATEGORY_SLUG = 'costs-and-planning';

export const metadata = buildCategoryMetadata(CATEGORY_SLUG);

const schemas = buildCategorySchemas(CATEGORY_SLUG);

export default function CostsAndPlanningPage() {
  return (
    <>
      <JsonLd data={schemas} />
      <LibraryCategory categorySlug={CATEGORY_SLUG} />
    </>
  );
}
