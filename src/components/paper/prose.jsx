import Link from 'next/link';

/*
 * react-markdown components for reading pages (wrap the output in .hp-prose).
 * Lists become role=list divs: the site theme paints any hovered <li> inside
 * <main> solid teal (theme.js 'main ul li:hover', layered !important).
 * Internal links use next/link; external ones open in a new tab.
 */
export const proseComponents = {
  // eslint-disable-next-line no-unused-vars
  ul: ({ node, ...props }) => <div role='list' {...props} />,
  // eslint-disable-next-line no-unused-vars
  ol: ({ node, ...props }) => <div role='list' data-ordered='' {...props} />,
  // eslint-disable-next-line no-unused-vars
  li: ({ node, ...props }) => <div role='listitem' {...props} />,
  // eslint-disable-next-line no-unused-vars
  a: ({ node, href = '', ...props }) =>
    href.startsWith('/') ? <Link href={href} {...props} /> : <a href={href} target='_blank' rel='noopener noreferrer' {...props} />,
};
