import React, { useState } from 'react'; // 👈 1. เพิ่ม useState ตรงนี้
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; 

const Navbar = () => {
  // 👈 2. สร้าง State สำหรับควบคุมการเปิด/ปิดเมนูมือถือ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPath = (item) => {
    if (item === 'หน้าหลัก') return '/';
    if (item === 'แผนที่') return '/map'; 
    if (item === 'ร้านอาหาร') return '/food';
    if (item === 'หอพัก') return '/dormitory';
    if (item === 'Co-working Space') return '/coworking';
    if (item === 'ข่าวประชาสัมพันธ์') return '/news';
    return '#';
  };

  // ฟังก์ชันสำหรับสลับสถานะเมนู
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[999] flex flex-col w-full bg-card shadow-sm transition-colors duration-300">
      {/* --- ส่วนแถบ Navbar หลัก --- */}
      <div className="flex w-full items-center justify-between whitespace-nowrap border-b border-solid border-border-card px-4 py-3 md:px-10">
        
        {/* โลโก้ */}
        <div className="flex items-center gap-4">
          <div className="size-8 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px]">school</span>
          </div>
          <h2 className="text-text-base text-lg font-bold leading-tight tracking-[-0.015em] transition-colors duration-300">
            KMITL Survival Guide
          </h2>
        </div>
        
        {/* เมนูสำหรับ Desktop (ซ่อนในจอมือถือด้วย hidden md:flex) */}
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-6 lg:gap-9">
            {['หน้าหลัก', 'แผนที่', 'ร้านอาหาร', 'หอพัก', 'ข่าวประชาสัมพันธ์', 'Co-working Space'].map(item => (
              <Link 
                key={item} 
                to={getPath(item)}
                className="text-text-base text-sm font-medium leading-normal hover:text-primary transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex gap-2">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-90 transition-all">
                <span className="truncate">เข้าสู่ระบบ</span>
              </button>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-base text-text-base border border-border-card text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-95 transition-all duration-300">
                <span className="truncate">สมัครสมาชิก</span>
              </button>
            </div>
          </div>
        </div>

        {/* 👈 3. ปุ่ม Hamburger Menu สำหรับมือถือ (แสดงเฉพาะหน้าจอเล็ก) */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={toggleMobileMenu}
            className="text-text-base flex items-center justify-center p-1 rounded-md hover:bg-base transition-colors"
          >
            {/* สลับไอคอนระหว่างเมนู (menu) กับ กากบาท (close) */}
            <span className="material-symbols-outlined text-[28px]">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* 👈 4. ส่วน Dropdown Menu สำหรับมือถือ (กางออกเมื่อ isMobileMenuOpen เป็น true) */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col px-4 pt-2 pb-6 border-b border-border-card bg-card shadow-lg transition-colors duration-300">
          <nav className="flex flex-col gap-2 mb-6 mt-2">
            {['หน้าหลัก', 'แผนที่', 'ร้านอาหาร', 'หอพัก', 'ข่าวประชาสัมพันธ์', 'Coworking Space'].map(item => (
              <Link 
                key={item} 
                to={getPath(item)}
                // พอกดเมนูไหนแล้ว ให้ปิดแถบเมนูมือถือลงทันที
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-base text-base font-medium py-3 px-2 border-b border-border-card/50 hover:text-primary hover:bg-base/50 rounded-lg transition-all duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-text-base font-medium text-sm">โหมดหน้าจอ</span>
              <ThemeToggle />
            </div>
            
            <div className="flex gap-3 mt-2">
              <button className="flex-1 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-primary text-white text-base font-bold transition-all shadow-sm">
                เข้าสู่ระบบ
              </button>
              <button className="flex-1 flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-base text-text-base border border-border-card text-base font-bold hover:brightness-95 transition-all duration-300 shadow-sm">
                สมัครสมาชิก
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;