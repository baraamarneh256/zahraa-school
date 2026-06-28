/*
 * Vercel Serverless Function — وسيط (proxy) لنتائج امتحانات وزارة النقل.
 * الاستخدام:  GET /api/exam-result?type=theory|practical&id=<رقم الهوية>
 * المنطق الفعلي في api/_examLogic.js (مشترك مع خادم Vite للتطوير).
 */
import { getExamResult } from './_examLogic.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()

  const type = String(req.query.type || '')
  const id = String(req.query.id || '').trim()
  const { status, body } = await getExamResult(type, id)
  return res.status(status).json(body)
}
