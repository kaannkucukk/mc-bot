const mineflayer = require('mineflayer');
const http = require('http');

// Render sitesinin botu kapatmaması için gerekli mini web sunucusu
http.createServer((req, res) => {
    res.write("Bot PotatoPVP Sunucusunda 7/24 Aktif!");
    res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'PotatoPVP.playserver.pro', // Sunucunun IP adresi tam olarak bu
        port: 25565,                     // Standart port kalabilir
        username: 'AFK_Botu_724wadwadsadwad',         // Botun oyundaki ismi
        version: '1.21.11'               // Sunucunun tam sürümü
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


