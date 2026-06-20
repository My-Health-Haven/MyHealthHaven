'use client';
import Link from 'next/link';

const LinkNav = ({ text }) => {
  if (!text) return null;
  const regex = /(Health Navigators?™)/g;
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <Link
            key={i}
            href='/navigators'
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {part}
          </Link>
        ) : (
          part
        )
      )}
    </>
  );
};

export default LinkNav;
