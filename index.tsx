/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Veri Örnekleri ---
const heroSlides = [
    {
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Endüstriyel Kalıp Sistemleri',
        subtitle: 'Büyük ölçekli projeleriniz için dayanıklı ve verimli endüstriyel kalıp çözümleri.'
    },
    {
        image: 'https://images.unsplash.com/photo-1581094369322-2a0d1f39f893?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Tünel Kalıp Sistemleri',
        subtitle: 'Hızlı, ekonomik ve seri yapılar için modern tünel kalıp teknolojileri.'
    },
    {
        image: 'https://images.unsplash.com/photo-1519799215313-3813a3a41857?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Özelleştirilmiş Çözümler',
        subtitle: 'Projenizin özel ihtiyaçlarına göre tasarlanmış, esnek ve yenilikçi kalıp sistemleri.'
    }
];

const statsData = [
    { end: 150, label: 'Tamamlanan Proje' },
    { end: 25, label: 'Yıllık Tecrübe' },
    { end: 120, label: 'Mutlu Müşteri' },
    { end: 45, label: 'Uzman Kadro' }
];

const referencesData = [
    {
        image: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Konut Projesi - İstanbul",
        description: "Modern tünel kalıp sistemlerimizle 2000 konutluk projenin kaba inşaatını rekor sürede tamamladık."
    },
    {
        image: "https://images.pexels.com/photos/1216556/pexels-photo-1216556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "AVM İnşaatı - Ankara",
        description: "Geniş açıklıklı ve yüksek katlı alışveriş merkezi projesinde endüstriyel kalıp çözümlerimiz tercih edildi."
    },
    {
        image: "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        title: "Viyadük İnşaatı - İzmir",
        description: "Otoyol viyadük inşaatında projenin gereksinimlerine özel tasarlanan kalıp sistemlerimizle güvenli ve hızlı ilerleme sağlandı."
    }
];


// --- Bileşenler (Components) ---

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState('');

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
    
    const handleDropdownToggle = (menuName) => {
        if (window.innerWidth <= 768) {
             setOpenDropdown(openDropdown === menuName ? '' : menuName);
        }
    }

    return (
        <header className="header">
            <a href="#home" className="logo">YAPI<span>İNŞAAT</span></a>
            <nav className="nav">
                <div className={`mobile-toggle`} onClick={toggleMobileMenu}>
                    <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={`nav-list ${isMobileMenuOpen ? 'open' : ''}`}>
                    <li className={`nav-item ${openDropdown === 'kalip' ? 'open' : ''}`}
                        onClick={() => handleDropdownToggle('kalip')}
                    >
                        <a href="#kalip-sistemleri" className="nav-link">
                            Kalıp Sistemleri <i className="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><a href="#">Endüstriyel Kalıp</a></li>
                            <li className="dropdown-item"><a href="#">Tünel Kalıp</a></li>
                            <li className="dropdown-item"><a href="#">Ahşap Kalıp</a></li>
                            <li className="dropdown-item"><a href="#">Özel Kalıplar</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#referanslar" className="nav-link">Referanslarımız</a>
                    </li>
                     <li className="nav-item">
                        <a href="#haberler" className="nav-link">Haberler</a>
                    </li>
                    <li className={`nav-item ${openDropdown === 'kurumsal' ? 'open' : ''}`}
                         onClick={() => handleDropdownToggle('kurumsal')}
                    >
                        <a href="#kurumsal" className="nav-link">
                            Kurumsal <i className="fas fa-chevron-down dropdown-icon"></i>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="dropdown-item"><a href="#">Hakkımızda</a></li>
                            <li className="dropdown-item"><a href="#">Tarihçe</a></li>
                            <li className="dropdown-item"><a href="#">Kalite Politikamız</a></li>
                            <li className="dropdown-item"><a href="#">Dokümanlar</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#iletisim" className="nav-link">İletişim</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + heroSlides.length) % heroSlides.length);
    };
    
    useEffect(() => {
        const timer = setTimeout(nextSlide, 7000);
        return () => clearTimeout(timer);
    }, [currentIndex]);


    return (
        <section id="home" className="hero">
            <div className="slider">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="slide-content">
                            <h2>{slide.title}</h2>
                            <p>{slide.subtitle}</p>
                        </div>
                    </div>
                ))}
                 <div className="slider-nav">
                    <button onClick={prevSlide} aria-label="Önceki Slayt"><i className="fas fa-chevron-left"></i></button>
                    <button onClick={nextSlide} aria-label="Sonraki Slayt"><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
        </section>
    );
};

// Fix: Explicitly type the props for StatCounter as a React.FC to correctly handle props like 'key'.
const StatCounter: React.FC<{ end: number, label: string }> = ({ end, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const duration = 2000; // 2 saniye

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const startTime = Date.now();
                    const step = () => {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const currentCount = Math.floor(progress * end);
                        setCount(currentCount);
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            setCount(end);
                        }
                    };
                    requestAnimationFrame(step);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [end]);


    return (
        <div className="stat-item" ref={ref}>
            <div className="stat-number">{count}+</div>
            <div className="stat-label">{label}</div>
        </div>
    );
};


const StatsSection = () => (
    <section id="stats" className="section stats-section">
        <div className="container">
            <h2 className="section-title">Başarılarımız</h2>
            <p className="section-subtitle">Rakamlarla Projelerimiz ve Deneyimimiz</p>
            <div className="stats-grid">
                {statsData.map((stat, index) => (
                    <StatCounter key={index} end={stat.end} label={stat.label} />
                ))}
            </div>
        </div>
    </section>
);


const ReferencesSection = () => (
    <section id="referanslar" className="section">
        <div className="container">
             <h2 className="section-title">Referanslarımız</h2>
            <p className="section-subtitle">Güven ve Kaliteyle Tamamladığımız Projeler</p>
            <div className="references-grid">
                {referencesData.map((ref, index) => (
                    <div className="reference-card" key={index}>
                        <img src={ref.image} alt={ref.title} />
                        <div className="reference-content">
                            <h3>{ref.title}</h3>
                            <p>{ref.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ContactSection = () => (
    <section id="iletisim" className="section contact-section">
        <div className="container">
            <h2 className="section-title">İletişim</h2>
            <p className="section-subtitle">Bizimle İletişime Geçin, Projelerinizi Birlikte Hayata Geçirelim</p>
            <div className="contact-wrapper">
                <div className="contact-info">
                    <h3>İletişim Bilgilerimiz</h3>
                    <div className="contact-info-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>Örnek Mah. İnşaat Sk. No:123, 34700 İstanbul, Türkiye</span>
                    </div>
                    <div className="contact-info-item">
                        <i className="fas fa-phone"></i>
                        <span>+90 216 123 45 67</span>
                    </div>
                    <div className="contact-info-item">
                        <i className="fas fa-envelope"></i>
                        <span>info@yapiinsaat.com.tr</span>
                    </div>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.395466487053!2d29.02219731538357!3d41.01633597929994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e894553d7b%3A0x29c99e924a2c9c28!2s%C3%9Csk%C3%BCdar%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1620998900000!5m2!1str!2str"
                            allowFullScreen="" loading="lazy" title="Konum">
                        </iframe>
                    </div>
                </div>
                <div className="contact-form">
                     <h3>Mesaj Gönderin</h3>
                     <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <input type="text" placeholder="Adınız Soyadınız" required />
                        </div>
                         <div className="form-group">
                            <input type="email" placeholder="E-posta Adresiniz" required />
                        </div>
                         <div className="form-group">
                            <input type="text" placeholder="Konu" required />
                        </div>
                         <div className="form-group">
                            <textarea placeholder="Mesajınız" required></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Gönder</button>
                     </form>
                </div>
            </div>
        </div>
    </section>
);


const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-col">
                    <h4>YAPIİNŞAAT</h4>
                    <p>İnşaat sektöründe yenilikçi kalıp sistemleri ile projelerinize değer katıyoruz. Kalite ve güvenden ödün vermeden hizmetinizdeyiz.</p>
                     <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="footer-col">
                    <h4>Hızlı Menü</h4>
                    <ul>
                        <li><a href="#home">Ana Sayfa</a></li>
                        <li><a href="#referanslar">Referanslar</a></li>
                        <li><a href="#kurumsal">Kurumsal</a></li>
                        <li><a href="#iletisim">İletişim</a></li>
                    </ul>
                </div>
                 <div className="footer-col">
                    <h4>Kalıp Sistemleri</h4>
                    <ul>
                        <li><a href="#">Endüstriyel Kalıp</a></li>
                        <li><a href="#">Tünel Kalıp</a></li>
                        <li><a href="#">Ahşap Kalıp</a></li>
                        <li><a href="#">Özel Kalıplar</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>İletişim</h4>
                     <p><i className="fas fa-map-marker-alt"></i> Örnek Mah. No:123, İstanbul</p>
                     <p><i className="fas fa-phone"></i> +90 216 123 45 67</p>
                     <p><i className="fas fa-envelope"></i> info@yapiinsaat.com.tr</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Yapı İnşaat Kalıp Sistemleri. Tüm Hakları Saklıdır.</p>
            </div>
        </div>
    </footer>
);


const App = () => {
    return (
        <>
            <Header />
            <main>
                <HeroSlider />
                <StatsSection />
                <ReferencesSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
