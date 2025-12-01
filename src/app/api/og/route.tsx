import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge' // Usar Edge Runtime

export async function GET(request: NextRequest) {
  // Obtener los query params de la URL
  const { searchParams } = new URL(request.url)
  const book = searchParams.get('book') || 'Título por defecto'
  const chapter = searchParams.get('chapter') || 'Descripción por defecto'

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: '#0C0D15',
          width: '100%',
          height: '100%',
          display: 'flex',
          color:'#FECF0F',
          gap:'4px',
          fontWeight:'900',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1>{chapter}</h1>
        <p style={{ fontSize: 40,fontWeight:500 }}>{book}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
