import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ==========================================
// 1. DATA: ข้อมูลสำหรับวนลูป
// ==========================================

const DORM_SPOTS = [
  { id: 1, name: "RNP Residence", loc: "Zone: RNP", price: "฿5,200", rating: "4.2", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qApl2ztVNOqDM28qGsubWhMJwhkQuMP-N5gKVWXIdQMxHFPhj4iKDcjC0k24atXi977HXUsMQB9rLogEyrc-rU7WkT4xSeAg4viTY2W0GiJCAdbXWvxGYzdCZXLDNWTRz7eTjSvIjDgerxqFje-iJUCleyWguwh5XjW0ktGZWBUYaZz09z1aVX4iiemJwDqMr9hdiIcQmrJAe27UJLqxQpzqt8pSEcJgIVBoMWdU3onuGFQ7ET036eqX35kD2LZQ5nxLDa2CHDM", desc: "ปลอดภัย, สะอาด" },
  { id: 2, name: "College View", loc: "Zone: College Town", price: "฿3,800", rating: "3.8", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK8qe_Sl-p5vbLKtT09I7f-d8tASPDNSoUL_X49DzBd55GOZrQzn8ksG4r54s9uuMlJ2pVZnSKiJhWleRU_A6sEzSXtI4CofNn5Q9KMjCiqHg6AXnx3bg7tCNwd5beJdQu7iJfyzq71PYCR3ylDJECPhMAao4370v7DK0ICDDda8QOp_xv86WVvSg1_wefLU4jkOMoAYtOFmkpSfmnpvnAhV5u6yh15bXfZrwiTAjNuCwOYL0KQCj_OY4y2AldrkkinJaWSxdMLV4", desc: "เน็ตแรง | มีรายงานหักเงินประกัน" },
  { id: 3, name: "The Loft FBT", loc: "Zone: FBT", price: "฿6,500", rating: "4.9", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKUOWwa892ObsZiIDV33oWK2vj0-5HtNX5RYafoZO2hoGBkxyn_8faiGmIlxL88zu2TSQKCwPo646HsKq0ZYAsbLdz1ooij1UxxifC3Ce3YuG5ZH7QAC5LMcCRYeEhzgeAVwIoFhtVysC8wuukLUruXicULbY3_8eTffLgItOSQv6F27y7LFSePGzo6_Kd_ploltAI3IGXxbgejc01lV_bkXVGFgYlbGrau1JdN7bRItfZhHi63EJmSc7ziVIUW-o4t1zWgQrGNQ0", desc: "คุ้มค่าที่สุด | Gym, Pool" },
  { id: 4, name: "Baan Suan", loc: "Zone: เกกี", price: "฿3,200", rating: "3.5", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIbe8GczvRJ9GMblObB5HGNmFoasiVJv82KByq1UAX4uWd5U05GDk8JwXQxVmWZ4tHXQPKK780IokvgnIQTK4aVmPbwAUrsOiUY5U2WU7GqTwyUTNBNA3u5E4sztdh1csIZrVVvki_JW6GDR31Rd_rZqHxa-zelLAOupG8OAW4sHyWvbKKbN-tC8yBsMtdEbA85ntxtDP3QOy0g_XK9gMtMSfuBIU6SJzRYcKwUQsVmo05vhOd0L3BahEd6TfM0ucensRgW3B9iLE", desc: "ราคาประหยัด, เลี้ยงสัตว์ได้" },
  { id: 5, name: "Jinda Residence", loc: "Zone: เกกี", price: "฿4,500", rating: "4.8", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA6WvO5wAdAu2CR8soPwO6_O7ulhCUzrwzG13MG2n0YN6czZLuS2oRDjBGdJ2Jy52-kJPcHC6BIaNTtx1Q5vbBfp1T-rm10KEMbg_i6xpTtLGR9bXf8Iegi8FHoo8d_I16N5RchNMjnfWFrRLheTo-PThT7sVajnRezoyc0a0oLvCItlKFBg27F8wT6k08mA9iWTqWXFXfHBWqjW_uF_54Kku3Dc0U7OclelCl2vaLTv5NrcD34J7lwXLwTAu_lAgxBLN00iOvSCA", desc: "เพิ่งรีโนเวท, ใกล้คณะ" },
  { id: 6, name: "KMITL Dorm", loc: "Zone: หอใน", price: "฿2,500", rating: "4.0", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd344MO3mWtetOMnNFYsXMLR7Pkqo1t_sXHHv4ZAyg8d3PT8Y-fzdpdU0qmdKokZ8Y1x_8-JoJbn7zBXfVZs4udId7oQJ1sIvMWgLYxt5ZGjw3g6eGXrnXsMvlpwVKyuxttJ6_ioJfjZrz4oomAkhCisXYUyPTZLsxm_4HfgGboWbthYUwhG-8lZV77r80Iy10ZG1FKHGH6yIiuKsGSq8GS3jZ6F1TBHQAIyLAvyO6nXtyh5XoNylQJA7MFQ6d6cykSjLPUdAloD0", desc: "ใกล้สุดๆ ในสถาบัน" },
  { id: 7, name: "Sky View Apartment", loc: "Zone: FBT", price: "฿5,800", rating: "4.5", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qApl2ztVNOqDM28qGsubWhMJwhkQuMP-N5gKVWXIdQMxHFPhj4iKDcjC0k24atXi977HXUsMQB9rLogEyrc-rU7WkT4xSeAg4viTY2W0GiJCAdbXWvxGYzdCZXLDNWTRz7eTjSvIjDgerxqFje-iJUCleyWguwh5XjW0ktGZWBUYaZz09z1aVX4iiemJwDqMr9hdiIcQmrJAe27UJLqxQpzqt8pSEcJgIVBoMWdU3onuGFQ7ET036eqX35kD2LZQ5nxLDa2CHDM", desc: "วิวสวย" }
];

// ✅ แก้ไขลิงก์รูปภาพให้เป็นลิงก์ที่เสถียรและโหลดติดแน่นอน 100%
const FOOD_SPOTS = [
  { id: 1, name: 'ป้าเฉื่อย เกกี 2', desc: 'กะเพราหมูกรอบไข่ดาวไม่สุกในตำนาน', loc: 'เกกีงาม 2', price: '฿40-60', rating: '4.8', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', isOpen: true },
  { id: 2, name: 'Sushi Box', desc: 'ซูชิคำโต ราคานักศึกษา เริ่มต้นคำละ 10 บาท', loc: 'College Town', price: '฿10+', rating: '4.5', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80', isOpen: true },
  { id: 3, name: 'Green Space Salad', desc: 'สายคลีนต้องโดน สลัดผักออร์แกนิค', loc: 'ตึกพระเทพฯ', price: '฿50-80', rating: '4.2', img: 'https://images.unsplash.com/photo-1484723091791-c0d7f5471c6c?auto=format&fit=crop&w=500&q=80', isOpen: false },
  { id: 4, name: 'สเต็กเด็กแนว', desc: 'คุ้มค่า ราคานักศึกษา จานใหญ่สะใจ', loc: 'ซอยจินดา', price: '฿69-150', rating: '4.3', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80', isOpen: true },
  { id: 5, name: 'ตำยำยั่ว', desc: 'อาหารอีสานรสเด็ด แซ่บถึงใจ', loc: 'เกกีงาม 1', price: '฿50-200', rating: '4.6', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80', isOpen: true },
  { id: 6, name: 'ข้าวมันไก่ ป้าณี', desc: 'ไก่เนื้อนุ่ม น้ำจิ้มรสเด็ด พร้อมน้ำซุปร้อนๆ', loc: 'โรงอาหาร A', price: '฿35-45', rating: '4.4', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=500&q=80', isOpen: true },
  { id: 7, name: 'เครปเย็น เกกี 3', desc: 'ของหวานยอดฮิต ไส้ทะลัก แป้งนุ่ม', loc: 'เกกีงาม 3', price: '฿30-50', rating: '4.7', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80', isOpen: true }
];

const QUICK_LINKS = [
  { id: 1, icon: 'calendar_month', label: 'ปฏิทินศึกษา' }, 
  { id: 2, icon: 'book', label: 'สำนักหอสมุด' },
  { id: 3, icon: 'wifi', label: 'WiFi สถาบัน' },
  { id: 4, icon: 'forum', label: 'Webboard' },
];

const LATEST_NEWS = [
  { id: 1, category: 'ทุนการศึกษา', catColor: 'text-primary', date: '18 ต.ค. 2567', title: 'เปิดรับสมัครทุน "เยาวชนไทยก้าวไกล" สำหรับนักศึกษา...', desc: 'สจล. เปิดโอกาสให้ผู้มีความสามารถเข้าถึงการศึกษาที่มีคุณภาพ ผ่านทุนเต็มจำนวน...', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk1Wn0AZY7R9NcmRZNkdcSn_WF_qT6QZgESKqJ_CwPLtbZK80jcpOUG83NfQgUkOd-R7GtY4XPw0HMjzfXC0b1ma708G0yaTQI6XGeLjwzzoF-48jY9Tx1Ar70kNKBGZE6l6IWzCi2ztnt92TVkueT760TJKJA5hGfYmyJPQ5RR2vWEB6dzuwRLvmhtSmp9s_lA_V_pmnqIjL0RiVZcVadOnUzXdKfYnT5DniNcw8VoSJ2awRxx_eZ1XJ_G-_YWRnaJquTK9tS2kM' },
  { id: 2, category: 'รับสมัครฝึกงาน', catColor: 'text-blue-500', date: '15 ต.ค. 2567', title: 'Tech Startup Hub ประกาศรับสมัคร Intern ตำแหน่ง Full-stack...', desc: 'ร่วมเป็นส่วนหนึ่งของทีมพัฒนา Innovation Sandbox เรียนรู้การทำงานแบบ Agile...', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_TGaATNMtZDjz7ADTLYU--tjTlLHCSHsHGY654yq5Ygh7-citnZO4fSwjWbRgCsfFuhlhXwQV82W6zBBXAdxjwKfshaAI1QYqD1mHIGklC2GEzTmchyStPzzeyRKwwf6BEUly8soZhyDxr53oKv2BHfDITMAyFIEhGOCVefIgLNdr67JQrF64GLOr62nKiwPU_wBZZoG7rvwWJ1DV3GMznG0OI6QcnaxSkdzq__2SJ5At3jy0rKUFvqighKzX_Js4_FaTZj1bLfY' },
  { id: 3, category: 'ประกาศสำคัญ', catColor: 'text-red-500', date: '12 ต.ค. 2567', title: 'แจ้งปรับปรุงระบบเครือข่ายอินเทอร์เน็ตภายในมหาวิทยาลัย...', desc: 'เพื่อเพิ่มประสิทธิภาพการใช้งาน สำนักบริการคอมพิวเตอร์จะทำการอัปเกรดระบบ...', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBMWjMlzhedeQ4afH7xgMaV1fthGosqrXM9uFgSXpzsA3yM0I4OrS7BpqjGaJY3xlf4RnGZEJul11IlGdxWHpIfw40tcckIqVrl18R-mHZSqPp3xhxevxBetdPo_VCxNh9tCSvgla7QOf_Y1SN4EzFID1ienGpkd0vO0u-k_oxYv-nq4QPDMC6Bo4n67R2A9Scho1YZog4xuVbOucv0d450IFJrekSSlGgpE3pJZ_MhH9mqzW23ESzkJHv_QdStOh6Ns5dLihynIQ' },
];

// ==========================================
// 2. COMPONENTS: แยกส่วน UI ย่อยๆ
// ==========================================

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); 
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="p-4 md:px-10 lg:px-40 py-6">
      <div className="flex min-h-[400px] md:min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-6 md:p-10 relative overflow-hidden group shadow-lg" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8cuqIBGKdz6Xv2eI86SDqmeQO7QwGaNujiumjS0ucKTJCZjHjknUzZhj-RuSnz0ljC4BlBX5OKKPBsmrIyrNcIk_rPtRojnN_CcGE5qgzP9XyvFrF_Hzx1rt0VqjtYBTjC4ftKRTHhoafvsrrqGzYl-WekCpjnLzkSRGRPjv-KNs9s0VIT6UgEHkGQ7CF2b0vIT7WDHiSQegpZHZOcfB7R3X7qqsRFP5HR03dqgJsQDfZhkIfOr3UyDIdOeXwYloGlHVppS6WhHQ")' }}>
        <div className="relative z-10 flex flex-col gap-3 text-center max-w-3xl">
          <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold w-fit mx-auto mb-2 uppercase tracking-wide">For KMITL Freshmen</span>
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
            สวัสดีเฟรชชี่! ยินดีต้อนรับสู่รั้วพระจอมเกล้าฯ
          </h1>
          <h2 className="text-gray-200 text-sm md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            คู่มือเอาตัวรอดในลาดกระบัง ค้นหาตึกเรียน ร้านข้าวเด็ดๆ และพื้นที่ทำงานแบบครบจบ
          </h2>
        </div>
        
        <form onSubmit={handleSearch} className="relative z-10 flex flex-col w-full max-w-[560px] h-14 md:h-16 mt-4 shadow-xl">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full overflow-hidden ring-4 ring-border-card/50 transition-all duration-300">
            <div className="text-text-base opacity-70 flex border-0 bg-card items-center justify-center pl-4 pr-2 transition-colors duration-300">
              <span className="material-symbols-outlined">search</span>
            </div>
            
            <input 
              className="form-input flex w-full min-w-0 flex-1 resize-none border-0 bg-card focus:ring-0 h-full px-2 text-sm md:text-base font-normal leading-normal transition-colors duration-300 placeholder:opacity-50" 
              style={{ color: 'inherit' }} 
              placeholder="ค้นหา หอพัก ร้านอาหาร ข่าวกิจกรรม co-working..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className="flex items-center justify-center bg-card pr-2 pl-2 transition-colors duration-300">
              <button 
                type="submit"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 md:h-12 px-6 bg-primary text-white text-sm md:text-base font-bold leading-normal tracking-[0.015em] hover:brightness-90 transition-all shadow-md"
              >
                <span className="truncate">ค้นหา</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const AlertBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg flex items-start gap-4 mx-4 md:mx-0 shadow-sm transition-colors duration-300 relative">
      <div className="text-primary bg-card p-2 rounded-full transition-colors duration-300">
        <span className="material-symbols-outlined">campaign</span>
      </div>
      <div className="pr-8 md:pr-0">
        <h3 className="font-bold text-text-base transition-colors duration-300">ช่วงสอบกลางภาคใกล้เข้ามาแล้ว!</h3>
        <p className="text-sm text-text-base opacity-80 mt-1 transition-colors duration-300">อย่าลืมดูแลสุขภาพและพักผ่อนให้เพียงพอ ห้องสมุดเปิดให้บริการ 24 ชั่วโมงในช่วงนี้</p>
      </div>
      
      <div className="ml-auto flex flex-col items-end gap-2 absolute top-4 right-4 md:static">
        <button onClick={() => setIsVisible(false)} className="text-text-base opacity-50 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
        <button className="text-sm font-bold text-primary hover:underline mt-auto hidden md:block">ดูปฏิทิน</button>
      </div>
    </div>
  );
};

const LatestNewsSection = () => (
  <section id="news" className="px-4 md:px-0">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 w-10 h-10 rounded-xl text-primary flex items-center justify-center transition-colors duration-300">
          <span className="material-symbols-outlined text-[22px]">campaign</span>
        </div>
        <h2 className="text-[22px] md:text-2xl font-bold text-text-base transition-colors duration-300">ข่าวประชาสัมพันธ์ล่าสุด</h2>
      </div>
      <Link to="/news" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 transition-all">
        ดูทั้งหมด <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </Link>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {LATEST_NEWS.map((news) => (
        <Link to="/news" key={news.id} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border-card hover:shadow-md transition-all duration-300 group cursor-pointer block">
          <div className="h-[180px] overflow-hidden p-2 pb-0">
            <img 
              src={news.img} 
              alt={news.title} 
              loading="lazy" 
              className="w-full h-full object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3 text-[11px] font-bold tracking-wide">
              <span className={news.catColor}>{news.category}</span>
              <span className="text-text-base opacity-60 font-medium transition-colors duration-300">{news.date}</span>
            </div>
            <h3 className="text-[16px] font-bold text-text-base mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
              {news.title}
            </h3>
            <p className="text-text-base opacity-70 text-sm line-clamp-2 leading-relaxed transition-colors duration-300">
              {news.desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

const DormitorySectionHome = () => {
  const [randomDorms, setRandomDorms] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const shuffled = [...DORM_SPOTS].sort(() => 0.5 - Math.random());
    setRandomDorms(shuffled.slice(0, 5));
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (randomDorms.length === 0) return null;

  return (
    <section id="dorm-spots">
      <div className="flex items-center justify-between px-4 md:px-0 mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-primary/20 text-primary p-2 rounded-lg material-symbols-outlined transition-colors duration-300">home_work</span>
          <h2 className="text-text-base text-[22px] md:text-2xl font-bold leading-tight transition-colors duration-300">หอพักแนะนำรอบรั้ว</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/dormitory" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 transition-all">
            ดูทั้งหมด <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-border-card hover:bg-primary/10 hover:text-primary text-text-base transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-border-card hover:bg-primary/10 hover:text-primary text-text-base transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 px-4 md:px-0 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {randomDorms.map((dorm) => (
          <Link 
            to="/dormitory"
            key={dorm.id} 
            className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] flex-shrink-0 snap-start flex flex-col rounded-xl overflow-hidden border border-border-card bg-card shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="h-48 bg-border-card relative overflow-hidden transition-colors duration-300">
              <img 
                alt={dorm.name} 
                loading="lazy" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={dorm.img} 
              />
              <div className="absolute bottom-3 right-3 bg-card px-2 py-1 rounded-md flex items-center gap-1 shadow-sm transition-colors duration-300">
                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                <span className="text-xs font-bold text-text-base transition-colors duration-300">{dorm.rating}</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg text-text-base line-clamp-1 transition-colors duration-300">{dorm.name}</h3>
              <p className="text-sm text-text-base opacity-70 line-clamp-2 transition-colors duration-300">{dorm.desc}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-text-base opacity-60 flex items-center gap-1 transition-colors duration-300">
                  <span className="material-symbols-outlined text-sm">location_on</span> {dorm.loc}
                </span>
                <span className="text-primary text-sm font-bold">{dorm.price} <span className="text-[10px] text-text-base opacity-50 font-normal">/เดือน</span></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const FoodSectionHome = () => {
  const [randomFood, setRandomFood] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const shuffled = [...FOOD_SPOTS].sort(() => 0.5 - Math.random());
    setRandomFood(shuffled.slice(0, 5));
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (randomFood.length === 0) return null;

  return (
    <section id="food-spots">
      <div className="flex items-center justify-between px-4 md:px-0 mb-6">
        <div className="flex items-center gap-3">
          <span className="bg-primary/20 text-primary p-2 rounded-lg material-symbols-outlined transition-colors duration-300">restaurant</span>
          <h2 className="text-text-base text-[22px] md:text-2xl font-bold leading-tight transition-colors duration-300">ร้านเด็ดรอบรั้ววันนี้</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/food" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 transition-all">
            ดูทั้งหมด <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-border-card hover:bg-primary/10 hover:text-primary text-text-base transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-border-card hover:bg-primary/10 hover:text-primary text-text-base transition-all duration-300"
            >
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-6 px-4 md:px-0 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>

        {randomFood.map((food) => (
          <Link 
            to="/food"
            key={food.id} 
            className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] flex-shrink-0 snap-start flex flex-col rounded-xl overflow-hidden border border-border-card bg-card shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="h-48 bg-border-card relative overflow-hidden transition-colors duration-300">
              <img 
                alt={food.name} 
                loading="lazy" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                src={food.img} 
              />
              <div className={`absolute top-3 left-3 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm ${food.isOpen ? 'bg-green-500' : 'bg-gray-500'}`}>
                {food.isOpen ? 'เปิดอยู่' : 'ปิดแล้ว'}
              </div>
              <div className="absolute bottom-3 right-3 bg-card px-2 py-1 rounded-md flex items-center gap-1 shadow-sm transition-colors duration-300">
                <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                <span className="text-xs font-bold text-text-base transition-colors duration-300">{food.rating}</span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg text-text-base line-clamp-1 transition-colors duration-300">{food.name}</h3>
              <p className="text-sm text-text-base opacity-70 line-clamp-2 transition-colors duration-300">{food.desc}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-text-base opacity-60 flex items-center gap-1 transition-colors duration-300">
                  <span className="material-symbols-outlined text-sm">location_on</span> {food.loc}
                </span>
                <span className="text-primary text-sm font-bold">{food.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const MapAndLinksSection = () => (
  <section id="campus-map" className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-0">
    <div className="lg:col-span-2 rounded-xl overflow-hidden border border-border-card bg-card shadow-sm flex flex-col transition-all duration-300">
      <div className="p-5 border-b border-border-card flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center gap-3">
          <span className="bg-primary/20 text-primary p-2 rounded-lg material-symbols-outlined">map</span>
          <h3 className="font-bold text-lg text-text-base transition-colors duration-300">แผนที่ภายในสถาบัน</h3>
        </div>
        <button className="text-sm font-bold text-primary hover:underline">เปิดเต็มจอ</button>
      </div>
      <div className="flex-1 min-h-[300px] bg-base relative group overflow-hidden transition-colors duration-300">
        <img 
          alt="Map of KMITL campus area" 
          loading="lazy"
          className="w-full h-full object-cover opacity-90 dark:opacity-70 transition-opacity" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBLXgI-OzaVQNZyUD30uFZG5NFrJd05gMj0PZgNRREPWC2eHiLWKrXo5cdq03xF6EK5NluozuvsuX5LGYp9QOp8_nMjglu9cdCU0BOy4zuV-yH9TLEdV09Ww7kOyJ8kZr1CHffQZ6nxLC_a1T7VdWJQCD_oyzF_IxQqFAK9quKXs-10XhvQFIIwbGLkQOATti-4cvrTjaO2pPmppNlG8AABSK9OWfVmxrnGGoTxa1m-VEzTCMzVVRNM-aeJKo9IJsdnk21z0egOQE" 
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          {['school', 'restaurant', 'print'].map((icon, idx) => {
            const labels = ['คณะ', 'โรงอาหาร', 'ร้านถ่ายเอกสาร'];
            return (
              <button key={icon} className="bg-card px-3 py-2 rounded-lg shadow-md text-xs font-bold text-text-base hover:bg-base transition-all duration-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">{icon}</span> {labels[idx]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
    
    <div className="flex flex-col gap-4">
      <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/20 transition-colors duration-300">
        <h3 className="font-bold text-red-500 mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined">emergency</span> เบอร์ฉุกเฉิน
        </h3>
        <ul className="space-y-3">
          <li className="flex justify-between items-center text-sm">
            <span className="text-text-base opacity-80 transition-colors duration-300">พยาบาล พระจอมฯ</span>
            <span className="font-mono font-bold bg-card px-2 py-1 rounded text-red-500 select-all transition-colors duration-300">02-329-8000</span>
          </li>
          <li className="flex justify-between items-center text-sm">
            <span className="text-text-base opacity-80 transition-colors duration-300">รปภ. ส่วนกลาง</span>
            <span className="font-mono font-bold bg-card px-2 py-1 rounded text-red-500 select-all transition-colors duration-300">02-329-8123</span>
          </li>
        </ul>
      </div>

      <div className="bg-card rounded-xl p-5 border border-border-card flex-1 transition-all duration-300">
        <h3 className="font-bold text-text-base mb-4 flex items-center gap-2 transition-colors duration-300">
          <span className="material-symbols-outlined text-primary">link</span> ลิงก์ด่วน
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map(link => (
            <a key={link.id} className="flex flex-col items-center justify-center p-3 rounded-lg bg-base hover:bg-primary/10 transition-colors duration-300 text-center gap-2 group" href="#">
              <span className="material-symbols-outlined text-text-base opacity-60 group-hover:text-primary transition-colors duration-300">{link.icon}</span>
              <span className="text-xs font-medium text-text-base transition-colors duration-300">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-base text-text-base transition-colors duration-300">
      <main className="flex-1">
        <div className="@container">
          <HeroSection />
        </div>

        <div className="px-4 md:px-10 lg:px-40 pb-12">
          <div className="layout-content-container flex flex-col max-w-[1200px] mx-auto flex-1 gap-12">
            <AlertBanner />
            <LatestNewsSection />
            <DormitorySectionHome />
            <FoodSectionHome />
            <MapAndLinksSection />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;