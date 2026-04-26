import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sunday — every day is sunday.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#00B7C3',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Times New Roman", Times, serif',
        }}
      >
        <div
          style={{
            fontSize: 220,
            fontWeight: 900,
            letterSpacing: '-0.027em',
            color: '#000',
            lineHeight: 0.9,
          }}
        >
          SUNDAY
        </div>
        <div
          style={{
            fontSize: 26,
            fontStyle: 'italic',
            color: '#000',
            opacity: 0.65,
            marginTop: 18,
            letterSpacing: '0.02em',
          }}
        >
          — every day is sunday.
        </div>
      </div>
    ),
    { ...size }
  );
}
