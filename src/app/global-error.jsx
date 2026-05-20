'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          padding: '4rem',
          textAlign: 'center',
          margin: 0,
        }}
      >
        <h1>Application error</h1>
        <p>A critical error occurred. Please reload the page.</p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1.4rem',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Reload
        </button>
        {process.env.NODE_ENV !== 'production' && (
          <pre style={{ marginTop: '2rem', textAlign: 'left', fontSize: '0.8rem', color: '#c00' }}>
            {error?.message}
          </pre>
        )}
      </body>
    </html>
  );
}
