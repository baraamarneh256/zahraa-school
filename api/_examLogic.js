/*
 * منطق مشترك لجلب نتائج امتحانات وزارة النقل الفلسطينية.
 * يستخدمه: دالة Vercel (api/exam-result.js) وخادم Vite للتطوير (vite.config.js).
 *
 * لماذا؟
 *   - خادم الوزارة لا يرسل ترويسات CORS، فلا يستطيع المتصفح استدعاء الـ API مباشرة.
 *   - النموذج الرسمي محميّ بـ CSRF token مرتبط بكوكي الجلسة.
 *
 * ملاحظة TLS: شهادة خادم الوزارة ناقصة السلسلة (intermediate)، لذا نوقف التحقق
 * من الشهادة لهذا النداء فقط. الوجهة ثابتة وموثوقة (mot.gov.ps).
 */

const BASE = 'https://www.mot.gov.ps'

const ENDPOINTS = {
  theory:    { page: '/theoretical-exam', search: '/theoretical-exam/search', nameKey: 'citizenName' },
  practical: { page: '/practical-exam',   search: '/practical-exam/search',   nameKey: 'studentName' },
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

/** يستخرج قيمة _token من صفحة HTML. */
function extractToken(html) {
  const m =
    html.match(/name="_token"[^>]*value="([^"]+)"/i) ||
    html.match(/<meta name="csrf-token" content="([^"]+)"/i)
  return m ? m[1] : null
}

/** يبني سلسلة Cookie من ترويسات set-cookie لاستجابة fetch. */
function buildCookieHeader(res) {
  const list =
    typeof res.headers.getSetCookie === 'function'
      ? res.headers.getSetCookie()
      : [res.headers.get('set-cookie')].filter(Boolean)
  return list.map(c => c.split(';')[0]).join('; ')
}

/**
 * يجلب نتيجة امتحان واحد ويعيد { status, body } جاهزَين للإرسال.
 * @param {string} type  'theory' | 'practical'
 * @param {string} id    رقم الهوية
 */
export async function getExamResult(type, id) {
  const cfg = ENDPOINTS[type]
  if (!cfg) return { status: 400, body: { error: 'نوع امتحان غير صالح (theory | practical)' } }
  if (!/^\d{5,}$/.test(id)) return { status: 400, body: { error: 'رقم هوية غير صالح' } }

  // شهادة الوزارة ناقصة السلسلة — أوقف التحقق لهذا النداء فقط
  const prevTLS = process.env.NODE_TLS_REJECT_UNAUTHORIZED
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  try {
    // 1) اجلب الصفحة للحصول على التوكن + الكوكي
    const pageRes = await fetch(BASE + cfg.page, { headers: { 'User-Agent': UA } })
    const html = await pageRes.text()
    const token = extractToken(html)
    const cookie = buildCookieHeader(pageRes)
    if (!token) return { status: 502, body: { error: 'تعذّر الحصول على رمز الجلسة من الوزارة' } }

    // 2) نفّذ البحث
    const searchRes = await fetch(BASE + cfg.search, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': UA,
        ...(cookie ? { Cookie: cookie } : {}),
        Referer: BASE + cfg.page,
      },
      body: JSON.stringify({ exam_id: id }),
    })

    const payload = await searchRes.json().catch(() => null)
    const data = payload && payload.data

    // 3) طبّع النتيجة
    const rawResult = data ? (data.result ?? data.rawResult) : null
    const notFound =
      !payload || !payload.success || !data ||
      data.found === false ||
      rawResult === null || rawResult === 'null' ||
      data[cfg.nameKey] === null || data[cfg.nameKey] === 'null'

    if (notFound) {
      return {
        status: 200,
        body: { found: false, type, message: (data && data.message) || 'لا يوجد امتحان بهذا الرقم' },
      }
    }

    return {
      status: 200,
      body: {
        found: true,
        type,
        name: data[cfg.nameKey] || '',
        date: data.examDate || '',
        result: rawResult === 'Pass' ? 'pass' : 'fail',
        details: data, // كل الحقول الأصلية كما وردت من الوزارة
      },
    }
  } catch (err) {
    return { status: 502, body: { error: 'تعذّر الوصول إلى خادم الوزارة', detail: String((err && err.message) || err) } }
  } finally {
    if (prevTLS === undefined) delete process.env.NODE_TLS_REJECT_UNAUTHORIZED
    else process.env.NODE_TLS_REJECT_UNAUTHORIZED = prevTLS
  }
}