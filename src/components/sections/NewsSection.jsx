import React, { useState, useMemo } from 'react';

// =========================================
// 1. DATA: ข้อมูลจำลองสำหรับวนลูป
// =========================================
const CATEGORIES = [
  { id: 1, icon: 'grid_view', label: 'ข่าวทั้งหมด' },
  { id: 2, icon: 'campaign', label: 'กิจกรรมมหาวิทยาลัย' },
  { id: 3, icon: 'priority_high', label: 'ประกาศสำคัญ' },
  { id: 4, icon: 'payments', label: 'ทุนการศึกษา', isExternal: true, url: 'https://scholarship.kmitl.ac.th/' }, 
];

const NEWS_LIST = [
  {
    id: 3, category: 'ประกาศสำคัญ', catColor: 'text-red-500', date: '12 ต.ค. 2567', dateValue: '2024-10-12',
    title: 'แจ้งปรับปรุงระบบเครือข่ายอินเทอร์เน็ตภายในมหาวิทยาลัย (KMITL-WiFi) วันที่ 20 ต.ค. นี้',
    desc: 'เพื่อเพิ่มประสิทธิภาพการใช้งาน สำนักบริการคอมพิวเตอร์จะทำการอัปเกรดระบบหลักในช่วงเวลา 00:00 - 05:00 น. ขออภัยในความไม่สะดวก...',
    content: 'สำนักบริการคอมพิวเตอร์ (สำนักคอมฯ) แจ้งกำหนดการปิดปรับปรุงระบบเครือข่ายหลักของสถาบัน เพื่อขยายช่องสัญญาณและติดตั้งอุปกรณ์กระจายสัญญาณเพิ่มเติม ส่งผลให้ในวันที่ 20 ตุลาคม ตั้งแต่เวลาเที่ยงคืน ถึงตีห้า ระบบ KMITL-WiFi จะไม่สามารถใช้งานได้ชั่วคราว',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBMWjMlzhedeQ4afH7xgMaV1fthGosqrXM9uFgSXpzsA3yM0I4OrS7BpqjGaJY3xlf4RnGZEJul11IlGdxWHpIfw40tcckIqVrl18R-mHZSqPp3xhxevxBetdPo_VCxNh9tCSvgla7QOf_Y1SN4EzFID1ienGpkd0vO0u-k_oxYv-nq4QPDMC6Bo4n67R2A9Scho1YZog4xuVbOucv0d450IFJrekSSlGgpE3pJZ_MhH9mqzW23ESzkJHv_QdStOh6Ns5dLihynIQ',
  },
  {
    id: 4, category: 'กิจกรรมมหาวิทยาลัย', catColor: 'text-green-500', date: '10 ต.ค. 2567', dateValue: '2024-10-10',
    title: 'ประมวลภาพบรรยากาศงานรับน้องก้าวใหม่ 2567 สุดอบอุ่น',
    desc: 'ภาพบรรยากาศความสนุกสนานและรอยยิ้มของน้องๆ ปี 1 ในงานรับน้องรวมของสถาบันประจำปีนี้...',
    content: 'จบลงไปแล้วอย่างสวยงามกับงาน "ก้าวใหม่ พระจอมเกล้าลาดกระบัง 2567" ที่เต็มไปด้วยความอบอุ่นและมิตรภาพจากรุ่นพี่สู่รุ่นน้อง ภายในงานมีกิจกรรมสันทนาการ คอนเสิร์ต และการแนะนำชมรมต่างๆ มากมาย',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuJ4YH6jsvMPfYwdCrA0-GbEqCXxQB2myIy_T5oZ1t9VCPV72if-yBPFbiuEOVF6olVcqcuuPC1KlaKG2zXQrQ39BWRXB7Q5ztDUNeLowvZ4RPX411rWZ7dlEIreq5h9WK2BQCMWALMtShJDJohXagD-YGMB9ycCD1BRS9UtIXIYkwgwcvsZ0KvkRSARhSh5v5KW4royxhpVqRgYaoUzgZjuFOFPqfYnIqowVJuQ5kjaYIF6baqt7OGDAwMmGiwtYNP6eyu8_3qZY',
  },
  {
    id: 6, category: 'กิจกรรมมหาวิทยาลัย', catColor: 'text-green-500', date: '5 ต.ค. 2567', dateValue: '2024-10-05',
    title: 'โครงการแลกเปลี่ยนนักศึกษา (Exchange Student) ณ ประเทศญี่ปุ่น ประจำเทอม Spring 2025',
    desc: 'เปิดรับสมัครนักศึกษาทุกคณะเข้าร่วมโครงการแลกเปลี่ยน ณ มหาวิทยาลัยเครือข่ายในประเทศญี่ปุ่น พร้อมทุนสนับสนุนการเดินทาง...',
    content: 'กองวิเทศสัมพันธ์เปิดรับสมัครนักศึกษาเข้าร่วมโครงการแลกเปลี่ยน 1 ภาคการศึกษา ณ มหาวิทยาลัยโตเกียว (Tokyo Tech) ผู้ผ่านการคัดเลือกจะได้รับทุนสนับสนุนค่าตั๋วเครื่องบินและค่าที่พักบางส่วน',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK8qe_Sl-p5vbLKtT09I7f-d8tASPDNSoUL_X49DzBd55GOZrQzn8ksG4r54s9uuMlJ2pVZnSKiJhWleRU_A6sEzSXtI4CofNn5Q9KMjCiqHg6AXnx3bg7tCNwd5beJdQu7iJfyzq71PYCR3ylDJECPhMAao4370v7DK0ICDDda8QOp_xv86WVvSg1_wefLU4jkOMoAYtOFmkpSfmnpvnAhV5u6yh15bXfZrwiTAjNuCwOYL0KQCj_OY4y2AldrkkinJaWSxdMLV4',
  },
  {
    id: 7, category: 'ประกาศสำคัญ', catColor: 'text-red-500', date: '1 ต.ค. 2567', dateValue: '2024-10-01',
    title: 'กำหนดการลงทะเบียนเรียน ภาคเรียนที่ 2/2567',
    desc: 'นักศึกษาสามารถตรวจสอบตารางลงทะเบียนเรียน และเตรียมตัวลงทะเบียนผ่านระบบสำนักทะเบียนได้ตามกำหนดการ...',
    content: 'สำนักทะเบียนและประมวลผล แจ้งกำหนดการลงทะเบียนเรียนสำหรับนักศึกษาทุกชั้นปีในภาคเรียนที่ 2 ประจำปีการศึกษา 2567 โดยจะเปิดระบบให้นักศึกษาเข้ามาจัดตารางเรียนได้ตั้งแต่วันที่ 1-5 พฤศจิกายน 2567',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk1Wn0AZY7R9NcmRZNkdcSn_WF_qT6QZgESKqJ_CwPLtbZK80jcpOUG83NfQgUkOd-R7GtY4XPw0HMjzfXC0b1ma708G0yaTQI6XGeLjwzzoF-48jY9Tx1Ar70kNKBGZE6l6IWzCi2ztnt92TVkueT760TJKJA5hGfYmyJPQ5RR2vWEB6dzuwRLvmhtSmp9s_lA_V_pmnqIjL0RiVZcVadOnUzXdKfYnT5DniNcw8VoSJ2awRxx_eZ1XJ_G-_YWRnaJquTK9tS2kM',
  }
];

// =========================================
// 2. MAIN COMPONENT
// =========================================
const NewsSection = () => {
  // --- States ---
  const [activeCategory, setActiveCategory] = useState('ข่าวทั้งหมด');
  const [selectedNews, setSelectedNews] = useState(null); 
  const [sortOrder, setSortOrder] = useState('newest');
  
  const ITEMS_PER_LOAD = 3;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD); 

  // --- Logic การนับหมวดหมู่ ---
  const getCategoryCount = (categoryName) => {
    if (categoryName === 'ข่าวทั้งหมด') return NEWS_LIST.length;
    return NEWS_LIST.filter(news => news.category === categoryName).length;
  };

  // --- Logic การกรองและเรียงข่าว ---
  const filteredAndSortedNews = useMemo(() => {
    // 1. กรองตามหมวดหมู่
    let filtered = activeCategory === 'ข่าวทั้งหมด' 
      ? NEWS_LIST 
      : NEWS_LIST.filter(news => news.category === activeCategory);
    
    // 2. เรียงลำดับตามวันที่
    return filtered.sort((a, b) => {
      const dateA = new Date(a.dateValue).getTime();
      const dateB = new Date(b.dateValue).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [activeCategory, sortOrder]);

  const displayedNews = filteredAndSortedNews.slice(0, visibleCount);

  // เมื่อเปลี่ยนหมวดหมู่ ให้รีเซ็ตจำนวนการแสดงผลกลับไปเริ่มต้น
  const handleCategoryChange = (categoryLabel) => {
    setActiveCategory(categoryLabel);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  // ฟังก์ชันสลับการเรียงลำดับ ให้รีเซ็ตจำนวนการแสดงผลกลับไปเริ่มต้น
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
    setVisibleCount(ITEMS_PER_LOAD);
  };

  return (
    <div className="bg-base text-text-base min-h-screen font-sans transition-colors duration-300 relative">
      
      {/* 🔴 Modal สำหรับอ่านข่าวเต็มๆ */}
      {selectedNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden">
          <div className="bg-card w-full max-w-3xl rounded-2xl shadow-2xl border border-border-card overflow-hidden flex flex-col max-h-[90vh] text-text-base">
            
            {/* Header Image */}
            <div className="relative h-48 sm:h-64 w-full shrink-0">
              <img src={selectedNews.img} alt={selectedNews.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              <button onClick={() => setSelectedNews(null)} className="absolute top-3 right-3 bg-black/50 text-white rounded-full size-9 flex items-center justify-center hover:bg-red-500 transition-colors">
                <span className="material-symbols-outlined block text-[20px]">close</span>
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-1 rounded bg-primary text-white">{selectedNews.category}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug drop-shadow-md">{selectedNews.title}</h3>
              </div>
            </div>
            
            {/* Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 pb-10">
              <div className="flex items-center justify-start gap-4 mb-6 pb-4 border-b border-border-card text-sm opacity-60">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_today</span> {selectedNews.date}</span>
              </div>
              
              <p className="text-[0.875rem] sm:text-[1rem] leading-relaxed opacity-90 whitespace-pre-line">
                {selectedNews.content}
              </p>
            </div>
            
          </div>
        </div>
      )}

      <main className="pt-10 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        
        {/* Featured News (Bento Style) */}
        <section className="mb-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-text-base">ข่าวเด่นประจำสัปดาห์</h2>
            <div className="h-1 w-24 bg-primary rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
            {/* Main Featured */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl shadow-lg bg-card ring-1 ring-border-card transition-colors duration-300 min-h-[350px] md:min-h-0 cursor-pointer" onClick={() => setSelectedNews(NEWS_LIST.find(n => n.id === 4))}>
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="KMITL Open House" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuJ4YH6jsvMPfYwdCrA0-GbEqCXxQB2myIy_T5oZ1t9VCPV72if-yBPFbiuEOVF6olVcqcuuPC1KlaKG2zXQrQ39BWRXB7Q5ztDUNeLowvZ4RPX411rWZ7dlEIreq5h9WK2BQCMWALMtShJDJohXagD-YGMB9ycCD1BRS9UtIXIYkwgwcvsZ0KvkRSARhSh5v5KW4royxhpVqRgYaoUzgZjuFOFPqfYnIqowVJuQ5kjaYIF6baqt7OGDAwMmGiwtYNP6eyu8_3qZY" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 p-8 text-white w-full">
                <span className="inline-block px-3 py-1 bg-primary rounded-lg text-[10px] font-bold uppercase tracking-wider mb-4 shadow-sm">กิจกรรมมหาวิทยาลัย</span>
                <h3 className="text-3xl font-bold mb-3 leading-tight text-white group-hover:underline decoration-primary underline-offset-4 drop-shadow-md">เตรียมพบกับ KMITL Open House 2024 เปิดรั้วชงโคต้อนรับนักนวัตกรรมหน้าใหม่</h3>
                <p className="text-white/90 line-clamp-2 font-light max-w-2xl drop-shadow-md">สัมผัสบรรยากาศการเรียนรู้จริงจากรุ่นพี่ทั้ง 11 คณะ 5 วิทยาลัย พร้อมกิจกรรม Workshop สุดพิเศษที่หาไม่ได้จากที่ไหน</p>
              </div>
            </div>

            {/* Secondary Featured */}
            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 grid-rows-1 md:grid-rows-2 gap-6">
              {[NEWS_LIST.find(n => n.id === 3), NEWS_LIST.find(n => n.id === 6)].map((news, idx) => (
                <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg ring-1 ring-border-card transition-colors duration-300 min-h-[250px] md:min-h-0 cursor-pointer" onClick={() => setSelectedNews(news)}>
                  <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={news.title} src={news.img} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 p-6 text-white w-full">
                    <span className={`inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase mb-2 ${news.category === 'ประกาศสำคัญ' ? 'bg-red-500/80' : 'bg-primary/80'}`}>{news.category}</span>
                    <h4 className="text-lg font-bold leading-snug drop-shadow-md text-white group-hover:text-primary transition-colors">{news.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News Categories & List */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4 border-l-4 border-primary pl-3">หมวดหมู่ข่าวสาร</h3>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => {
                          if (cat.isExternal) {
                            window.open(cat.url, '_blank');
                          } else {
                            handleCategoryChange(cat.label);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg font-semibold transition-all duration-300 ${
                          activeCategory === cat.label && !cat.isExternal
                            ? 'bg-primary/10 text-primary' 
                            : 'text-text-base opacity-70 hover:opacity-100 hover:bg-card'
                        }`}>
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                          {cat.label}
                          {cat.isExternal && <span className="material-symbols-outlined text-[14px] opacity-60">open_in_new</span>}
                        </span>
                        {!cat.isExternal && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.label ? 'bg-primary/20 text-primary' : 'bg-border-card text-text-base'}`}>
                            {getCategoryCount(cat.label)}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 rounded-xl bg-primary text-white shadow-lg overflow-hidden relative transition-colors duration-300">
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12">auto_awesome</span>
                <h4 className="font-bold mb-2">ไม่พลาดทุกการเคลื่อนไหว</h4>
                <p className="text-xs text-white/80 mb-4">สมัครรับข่าวสารผ่าน LINE Official ของ สจล. ได้เลยวันนี้</p>
                <button className="w-full py-2 bg-base text-primary rounded-lg text-sm font-bold shadow-sm hover:brightness-95 transition-all">@kmitlofficial</button>
              </div>
            </div>
          </aside>

          {/* Main News List */}
          <section className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8 overflow-x-auto gap-4 custom-scrollbar pb-2 flex-wrap sm:flex-nowrap">
              <h2 className="text-2xl font-bold tracking-tight text-text-base whitespace-nowrap">{activeCategory}</h2>
              
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={toggleSortOrder} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border-card hover:bg-base transition-colors text-text-base text-sm font-semibold shadow-sm"
                  title="สลับการเรียงลำดับ"
                >
                  <span className="material-symbols-outlined text-[18px] transition-transform duration-300">
                    {sortOrder === 'newest' ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                  เรียง: {sortOrder === 'newest' ? 'ใหม่สุดไปเก่าสุด' : 'เก่าสุดไปใหม่สุด'}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {displayedNews.length > 0 ? displayedNews.map((news) => (
                <article key={news.id} className="group flex flex-col md:flex-row gap-6 p-4 rounded-xl bg-card border border-transparent hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                  <div className="w-full md:w-64 h-48 md:h-44 overflow-hidden rounded-lg flex-shrink-0 bg-base">
                    <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 dark:opacity-80" alt="News Thumbnail" src={news.img} />
                  </div>
                  <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                    <div>
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`text-xs font-bold uppercase tracking-wide ${news.catColor}`}>{news.category}</span>
                        <span className="text-xs text-text-base opacity-60 flex items-center gap-1 transition-colors duration-300">
                          <span className="material-symbols-outlined text-[14px]">calendar_today</span> {news.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-text-base group-hover:text-primary transition-colors duration-300 cursor-pointer line-clamp-2" onClick={() => setSelectedNews(news)}>{news.title}</h3>
                      <p className="text-text-base opacity-70 text-sm line-clamp-2 transition-colors duration-300">{news.desc}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-end gap-4">
                      <button onClick={() => setSelectedNews(news)} className="text-sm font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">อ่านเพิ่มเติม <span className="material-symbols-outlined text-lg">arrow_forward</span></button>
                    </div>
                  </div>
                </article>
              )) : (
                <div className="py-20 text-center bg-card rounded-2xl border border-dashed border-border-card opacity-60 text-text-base">
                  <p>ไม่มีข่าวในหมวดหมู่นี้</p>
                </div>
              )}
            </div>

            {/* ✅ ปุ่ม Load More ก๊อปปี้สไตล์มาจากหน้า Dormitory เป๊ะๆ */}
            {visibleCount < filteredAndSortedNews.length && (
              <div className="mt-10 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_LOAD)}
                  className="flex items-center gap-2 rounded-full border border-border-card bg-card px-6 py-3 text-sm font-bold text-text-base shadow-sm hover:bg-base hover:text-primary transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined transition-transform duration-300 group-hover:animate-spin">sync</span>
                  โหลดเพิ่มเติม ({filteredAndSortedNews.length - visibleCount} ข่าว)
                </button>
              </div>
            )}

          </section>

        </div>
      </main>
    </div>
  );
};

export default NewsSection;