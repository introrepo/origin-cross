// api/webhook.js
export default function handler(req, res) {
    if (req.method === 'POST' || req.method === 'GET') {
        // هنا يتم استقبال البيانات من Redz أو أي سيرفر خارجي
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);

        // ملاحظة: Vercel لا يدعم Socket.io بسهولة
        // يمكنك تخزين البيانات في قاعدة بيانات (مثل MongoDB أو Supabase) لعرضها لاحقاً
        
        return res.status(200).json({ status: 'success', message: 'Data received' });
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
