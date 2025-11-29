import os
from django.core.wsgi import get_wsgi_application
from django.contrib.auth import get_user_model
import django

# 1. Ayarları yükle
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'giga_backend.settings')

# 2. Django'yu manuel olarak hazırla (Veritabanına erişmek için gerekli)
django.setup()

# 3. OTOMATİK KULLANICI OLUŞTURMA KISMI
try:
    User = get_user_model()
    # Eğer 'hasan' kullanıcısı yoksa oluştur
    if not User.objects.filter(username='hasan').exists():
        User.objects.create_superuser('hasan', 'hasan@example.com', '123123')
        print("✅ OTOMATIK SUPERUSER OLUŞTURULDU: hasan / 123123")
    else:
        print("ℹ️ Kullanıcı zaten var.")
except Exception as e:
    print(f"❌ HATA: {e}")

# 4. Uygulamayı başlat (Eski dosyanın yaptığı asıl iş burası)
application = get_wsgi_application()