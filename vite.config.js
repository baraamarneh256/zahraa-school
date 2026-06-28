import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getExamResult } from './api/_examLogic.js'

/* يحاكي دالة Vercel أثناء `npm run dev` حتى يعمل /api/exam-result محلياً. */
function examApiPlugin() {
  return {
    name: 'exam-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/exam-result', async (req, res) => {
        try {
          const url = new URL(req.url, 'http://localhost')
          const type = url.searchParams.get('type') || ''
          const id = (url.searchParams.get('id') || '').trim()
          const { status, body } = await getExamResult(type, id)
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(body))
        } catch (err) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'خطأ داخلي', detail: String((err && err.message) || err) }))
        }
      })
    },
  }
}

export default defineConfig(() => ({
  // GitHub Pages يخدم الموقع تحت مسار فرعي باسم المستودع، أما Vercel/التطوير فعلى الجذر
  base: process.env.GITHUB_ACTIONS ? '/zahraa-school/' : '/',
  plugins: [react(), examApiPlugin()],
}))
