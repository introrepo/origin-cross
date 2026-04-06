const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// استقبال البيانات بجميع الصيغ (JSON, Text, URL Encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

// تقديم الصفحة الرئيسية للمستخدم
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// المسار (Endpoint) الذي سيستقبل الردود من السيرفرات الخارجية
app.all('/webhook', (req, res) => {
    const data = {
        time: new Date().toLocaleTimeString(),
        method: req.method,
        headers: req.headers,
        body: req.body,
        query: req.query
    };

    console.log("إشارة جديدة مستلمة!");
    
    // إرسال البيانات فوراً إلى صفحة المتصفح عبر Socket.io
    io.emit('new_webhook', data);

    res.status(200).send('Received!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`السيرفر يعمل على الرابط: http://localhost:${PORT}`);
    console.log(`رابط الاستقبال الخاص بك هو: http://localhost:${PORT}/webhook`);
});
