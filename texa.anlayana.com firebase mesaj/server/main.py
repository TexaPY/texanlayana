import firebase_admin
from firebase_admin import messaging, credentials, firestore
import time
from datetime import datetime

# Firebase admin SDK'yı başlatın
cred = credentials.Certificate("auth/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

# Firestore veritabanına erişim
db = firestore.client()


def tokensay(dongu_numarasi):
    """
    Firestore'dan token'ları sayar ve her token için sadece 1 bildirim gönderir.
    Aynı tokene yalnızca bir kez bildirim gönderilir.
    Ayrıca, döngü loglarını tutar.
    """
    tokens_ref = db.collection("tokens")
    docs = tokens_ref.stream()

    token_set = set()
    basarili_mesajlar = 0
    basarisiz_mesajlar = 0

    for doc in docs:
        token = doc.to_dict().get("token")  # Token alanını al
        if token:
            token_set.add(token)  # Token'i küme'ye ekle (tekrarlar engellenir)

    for token in token_set:
        success, error = send_notification(token)
        if success:
            basarili_mesajlar += 1
        else:
            basarisiz_mesajlar += 1

    # Log verisini oluştur
    log_data = {
        "dongu_numarasi": dongu_numarasi,
        "basarili_mesajlar": basarili_mesajlar,
        "basarisiz_mesajlar": basarisiz_mesajlar,
        "timestamp": datetime.now(),
    }

    # Log koleksiyonuna logu ekle
    log_ref = db.collection("Log").document(f"Döngü{dongu_numarasi}")
    log_ref.set(log_data)
    print(
        f"Döngü {dongu_numarasi}: Başarıyla {basarili_mesajlar} mesaj gönderildi, {basarisiz_mesajlar} başarısız mesaj"
    )


def send_notification(token):
    """
    Firebase üzerinden bildirim gönderir.
    :param token: Kullanıcının FCM token'ı
    :return: (başarı durumu, hata durumu)
    """
    # Bildirim başlığı ve açıklaması
    notification_title = "Bugüne Özel Şarkını dinledin mi?"
    notification_body = "Opa'nın Gigi için seçtiği günün şarkısını dinledin mi?"
    notification_image = "assets\kedy.png"

    # Mesaj içeriği (bildirim tıklandığında yönlendirilecek URL de eklenir)
    message = messaging.Message(
        token=token,
        notification=messaging.Notification(
            title=notification_title,
            body=notification_body,
            image=notification_image,
        ),
        data={
            "url": "https://texa.anlayana.com/gigi"  # Bildirime tıklandığında yönlendirilmek istenen URL
        },
    )

    try:
        # Firebase Cloud Messaging API ile bildirimi gönder
        response = messaging.send(message)
        return True, None  # Başarılı
    except Exception as e:
        return False, e  # Hata oluştu


def countdown_and_send():
    """
    24 saat geri sayımı yaptıktan sonra token'ları sayar ve bildirim gönderir.
    Bu döngü sürekli devam eder.
    Her döngüde log tutar.
    """
    dongu_numarasi = 1
    while True:
        print(f"\nDöngü {dongu_numarasi} başlatılıyor...")

        # tokensay fonksiyonunu çalıştır ve logları tut
        tokensay(dongu_numarasi)

        # 24 saat geri sayımı (86400 saniye)
        print("24 saat geri sayılıyor...")
        for remaining in range(86400, 0, -1):
            print(
                f"\rGeriye kalan süre: {remaining // 3600} saat {remaining % 3600 // 60} dakika {remaining % 60} saniye",
                end="",
            )
            time.sleep(1)

        print(f"\nDöngü {dongu_numarasi} tamamlandı.")
        dongu_numarasi += 1


# Ana fonksiyon
if __name__ == "__main__":
    # Döngüye başla ve sürekli olarak işlem yap
    countdown_and_send()
