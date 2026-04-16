const JsonLd = ({ data }) => {
  if (!data) return null;
  const schemas = Array.isArray(data) ? data.filter(Boolean) : [data];
  if (schemas.length === 0) return null;

  return schemas.map((schema, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
      }}
    />
  ));
};

export default JsonLd;
