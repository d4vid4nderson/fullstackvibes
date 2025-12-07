import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'David Anderson - Full Stack Developer & AI Engineer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
          backgroundColor: '#0f0f0f',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)',
        }}
      >
        {/* Main content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          {/* Logo/Brand - matching favicon_text.svg style */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '30px',
              padding: '16px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
            }}
          >
            <span
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: 'white',
                fontFamily: 'monospace',
                letterSpacing: '2px',
                lineHeight: 1.2,
              }}
            >
              FULL STACK VIBES
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 20px 0',
              textAlign: 'center',
            }}
          >
            David Anderson
          </h1>

          {/* Title */}
          <p
            style={{
              fontSize: '36px',
              background: 'linear-gradient(135deg, #06b6d4, #14b8a6, #0891b2)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '0 0 30px 0',
              textAlign: 'center',
            }}
          >
            Full Stack Developer & AI Engineer
          </p>

          {/* Tech stack */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '800px',
            }}
          >
            {['Go', 'Python', 'TypeScript', 'React', 'Next.js', 'AI/ML'].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  border: '2px solid #06b6d4',
                  color: '#06b6d4',
                  fontSize: '20px',
                  fontFamily: 'monospace',
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* URL */}
          <p
            style={{
              fontSize: '24px',
              color: '#9ca3af',
              marginTop: '40px',
              fontFamily: 'monospace',
            }}
          >
            fullstackvibes.io
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
