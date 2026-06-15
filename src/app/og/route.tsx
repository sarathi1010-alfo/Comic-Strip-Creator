import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Comic Strip Creator';
    const description = searchParams.get('description');
    const type = searchParams.get('type') || 'website';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F172A',
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 80px',
            background: 'rgba(15, 23, 42, 0.8)',
            border: '2px solid #6D28D9',
            borderRadius: '24px',
            maxWidth: '900px',
            textAlign: 'center',
          }}>
            <div style={{
              color: '#F97316',
              fontSize: 32,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '20px'
            }}>
              {type}
            </div>
            <div style={{
              fontSize: 64,
              fontWeight: 900,
              marginBottom: description ? '30px' : '0',
              lineHeight: 1.2
            }}>
              {title}
            </div>
            {description && (
              <div style={{ fontSize: 32, color: '#94A3B8', lineHeight: 1.4 }}>
                {description}
              </div>
            )}
          </div>

          <div style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#E2E8F0',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#6D28D9',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              C
            </div>
            ComicFlow / alfo.online
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
        },
      }
    );
  } catch (e: unknown) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
