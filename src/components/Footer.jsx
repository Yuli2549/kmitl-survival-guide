import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // เปลี่ยน bg-white เป็น bg-card และปรับขอบเป็น border-border-card
  return (
    <footer className="bg-card border-t border-border-card py-8 px-4 md:px-10 w-full mt-auto transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* โลโก้ และ ข้อความแจ้งว่าเป็นโปรเจกต์ส่วนตัว */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
            <span className="material-symbols-outlined text-[28px]">school</span>
            {/* เปลี่ยนสีตัวหนังสือจาก text-background-dark เป็น text-text-base */}
            <span className="text-text-base text-lg font-bold leading-tight tracking-[-0.015em] transition-colors">KMITL Survival Guide</span>
          </div>
          {/* เปลี่ยนสีเทา text-gray-500 เป็น text-text-base แล้วลดความทึบลงเพื่อให้กลืนกับทุกโหมด */}
          <p className="text-xs text-text-base opacity-60 transition-colors">
            © 2026 KMITL Survival Guide. <br className="md:hidden" />
            จัดทำโดยนักศึกษารุ่นพี่เพื่อช่วยเหลือรุ่นน้อง (ไม่มีส่วนเกี่ยวข้องกับทางสถาบัน)
          </p>
        </div>

        {/* ปุ่มไปหน้า About Me */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <Link 
            to="/about" 
            className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            เกี่ยวกับผู้จัดทำ / ติดต่อ
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;