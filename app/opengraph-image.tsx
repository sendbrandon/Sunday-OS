import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sunday';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SKY = '#00B7C3';
const INK = '#000000';

export default async function OpenGraphImage() {
  // Tinos is a Times-metric-compatible Apache-licensed serif —
  // bundled locally so the OG render is true Times, not @vercel/og's sans.
  const tinosBold = await fetch(
    new URL('./fonts/Tinos-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const fontSize = 280;
  const circleSize = Math.round(fontSize * 0.62);
  const dotSize = Math.round(circleSize * 0.14);

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Tinos',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <span
            style={{
              fontSize,
              fontWeight: 700,
              color: INK,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            SUN
          </span>
          <div
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: '50%',
              background: SKY,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -10,
              marginRight: -10,
            }}
          >
            <div
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                background: INK,
              }}
            />
          </div>
          <span
            style={{
              fontSize,
              fontWeight: 700,
              color: INK,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            DAY
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Tinos',
          data: tinosBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
