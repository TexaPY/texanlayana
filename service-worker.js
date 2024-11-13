// Push eventi al ve bildirim göster
self.addEventListener('push', function(event) {
    const options = {
        body: event.data.text(),
        icon: 'https://texa.anlayana.com/assets/images/keeddi.png',  // Bildirim simgesi
        badge: 'https://texa.anlayana.com/assets/images/keeddi.png', // Bildirim rozeti
    };

    // Bildirimi göster
    event.waitUntil(
        self.registration.showNotification('Günlük Mesajınız', options)
    );
});
