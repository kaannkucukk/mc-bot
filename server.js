const mineflayer = require('mineflayer');
const http = require('http');

// Render sitesinin botu kapatmaması için gerekli mini web sunucusu
http.createServer((req, res) => {
    res.write("Bot PotatoPVP Sunucusunda 7/24 Aktif!");
    res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'potatopvp.playserver.pro', // Sunucunun IP adresi
        port: 33911,                       // SENİN GERÇEK PORT NUMARAN!
        username: 'iIAFK_Botu_724Ii',          // Botun oyundaki ismi
        version: '1.21.11'                 // Sunucunun tam sürümü
    });

    bot.on('spawn', () => {
        console.log('Bot BAŞARIYLA PotatoPVP sunucusuna girdi! Koşma modu aktif.');
        
        // Robotun sürekli ileri doğru koşmasını sağlar
        bot.setControlState('forward', true);
        
        // Robotun her yarım saniyede bir zıplamasını sağlar (engellere takılmasın diye)
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 100);
        }, 500);
    });

    bot.on('end', () => {
        console.log('Bağlantı kesildi, 10 saniye sonra tekrar deneniyor...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Hata oluştu: ', err));
}

createBot();
