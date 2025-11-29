import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constant";
import "../styles/Login.css";

const LoginPage = () => {
  // Değişken ismini 'email' yerine 'username' olarak düşünelim ama 
  // mevcut kodunu bozmamak için state ismini değiştirmedim, sadece kutuyu düzelttim.
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post("/api/token/", { 
        username: email,  // Backend 'username' istiyor, biz kutuya ne yazılırsa onu gönderiyoruz
        password
      });

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      console.log("Giriş başarılı:", res.data);
      navigate("/dashboard");
    } catch (error) {
      alert("Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      await api.post("/api/user/register/", { 
        username: regEmail, // Kayıtta da kullanıcı adı olarak gönderiyoruz
        password: regPassword
      });
      
      setIsRegister(false);
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
    } catch (error) {
      alert("Kayıt başarısız! Bu kullanıcı adı alınmış olabilir.");
    }
  };

  return (
    <div className="login-container">
      {/* LOGIN PANEL */}
      {!isRegister && (
        <div className="login-card">
          <h2>Hoşgeldiniz 👋</h2>
          <p className="subtitle">Görevlerinize erişmek için giriş yapın</p>

          <form onSubmit={handleLogin}>
            {/* DÜZELTME 1: Label değişti */}
            <label>Kullanıcı Adı</label> 
            <input
              type="text" // DÜZELTME 2: 'email' yerine 'text' yaptık. Artık @ sormayacak.
              placeholder="Kullanıcı Adı" // DÜZELTME 3: Placeholder güncellendi
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Şifre</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">Giriş Yap</button>
          </form>

          <p className="login-footer">
            Hesabınız yok mu?{" "}
            <span className="register-link" onClick={() => setIsRegister(true)}>
              Kayıt Ol
            </span>
          </p>
        </div>
      )}

      {/* REGISTER PANEL */}
      {isRegister && (
        <div className="login-card">
          <h2>Hesabınızı oluşturalım</h2>
          <p className="subtitle">Devam etmek için kayıt olun</p>

          <form onSubmit={handleRegister}>
            {/* Not: Backend sadece username ve password alıyor, Name şimdilik süs */}
            <label>İsim Soyisim</label>
            <input
              type="text"
              placeholder="Adınız Soyadınız"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              required
            />

            {/* DÜZELTME 4: Kayıt olurken de text yaptık ki isteyen 'hasan' diye kayıt olabilsin */}
            <label>Kullanıcı Adı</label>
            <input
              type="text" 
              placeholder="Kullanıcı Adı Belirleyin"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />

            <label>Şifre</label>
            <input
              type="password"
              placeholder="••••••••"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-btn">Kayıt Ol</button>
          </form>

          <p className="login-footer">
            Zaten hesabınız var mı?{" "}
            <span className="register-link" onClick={() => setIsRegister(false)}>
              Giriş Yap
            </span>
          </p>
        </div>
      )}

      {/* SAĞ TARAF */}
      <div className="login-side">
        <h1>Görev Yönetimi</h1>
        <p>Şirketinizi tek bir platformdan kontrol edin 📈</p>
        <p>Her tıklamada düzen, her adımda ilerleme</p>
      </div>
    </div>
  );
};

export default LoginPage;