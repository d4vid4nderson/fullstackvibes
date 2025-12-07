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
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.12) 0%, transparent 50%)',
          padding: '40px',
        }}
      >
        {/* Terminal Window with gradient border */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '1004px',
            padding: '2px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6, #a855f7)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              backgroundColor: '#1a1a1a',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
          {/* Terminal Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#2a2a2a',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              gap: '8px',
            }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
            <span style={{ marginLeft: '12px', fontSize: '14px', color: '#9ca3af', fontFamily: 'monospace' }}>
              david@fullstackvibes:~
            </span>
          </div>

          {/* Terminal Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 32px',
              gap: '8px',
            }}
          >
            {/* whoami command */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#06b6d4', fontSize: '20px', fontFamily: 'monospace' }}>$</span>
              <span style={{ color: '#d1d5db', fontSize: '20px', fontFamily: 'monospace' }}>whoami</span>
            </div>

            {/* Name */}
            <div style={{ display: 'flex', marginTop: '4px', marginBottom: '4px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>
                David Anderson
              </span>
            </div>

            {/* Title */}
            <div style={{ display: 'flex' }}>
              <span style={{ fontSize: '24px', color: '#06b6d4', fontFamily: 'monospace' }}>
                Full Stack Developer & AI Engineer
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '16px 0' }} />

            {/* Bio command */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#06b6d4', fontSize: '18px', fontFamily: 'monospace' }}>$</span>
              <span style={{ color: '#6b7280', fontSize: '18px', fontFamily: 'monospace' }}>--bio</span>
              <span style={{ color: '#9ca3af', fontSize: '18px', fontFamily: 'monospace' }}>→</span>
              <span style={{ color: '#d1d5db', fontSize: '18px', fontFamily: 'monospace' }}>
                I build AI-powered tools that solve real workflow problems
              </span>
            </div>

            {/* Stack command */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#06b6d4', fontSize: '18px', fontFamily: 'monospace' }}>$</span>
              <span style={{ color: '#6b7280', fontSize: '18px', fontFamily: 'monospace' }}>--stack</span>
              <span style={{ color: '#9ca3af', fontSize: '18px', fontFamily: 'monospace' }}>→</span>
              <span style={{ color: '#d1d5db', fontSize: '18px', fontFamily: 'monospace' }}>
                go, python, typescript, react, next.js, fastapi
              </span>
            </div>

            {/* AI command */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#06b6d4', fontSize: '18px', fontFamily: 'monospace' }}>$</span>
              <span style={{ color: '#6b7280', fontSize: '18px', fontFamily: 'monospace' }}>--ai</span>
              <span style={{ color: '#9ca3af', fontSize: '18px', fontFamily: 'monospace' }}>→</span>
              <span style={{ color: '#d1d5db', fontSize: '18px', fontFamily: 'monospace' }}>
                claude, gpt-4, azure-openai, prompt-engineering
              </span>
            </div>

            {/* Divider */}
            <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '16px 0' }} />

            {/* Command prompt */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: '#06b6d4', fontSize: '20px', fontFamily: 'monospace' }}>&gt;</span>
              <span style={{ color: '#6b7280', fontSize: '18px', fontFamily: 'monospace' }}>
                fullstackvibes.io
              </span>
              <span style={{
                width: '12px',
                height: '24px',
                backgroundColor: '#06b6d4',
                marginLeft: '4px',
              }} />
            </div>
          </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
