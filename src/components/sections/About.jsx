import React from 'react';

// 👈 1. นำเข้ารูปภาพ Yuli.png จากโฟลเดอร์ assets
import yuliImage from '../../assets/Yuli.png'; 

const About = () => {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-12 md:py-20 flex-1 w-full transition-colors duration-300">
      
      {/* เปลี่ยน bg-white เป็น bg-card และปรับ border */}
      <div className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border-card text-center flex flex-col items-center relative overflow-hidden transition-colors duration-300">
        
        {/* Background ตกแต่งด้านบน ปรับให้ใช้ primary color แบบโปร่งแสง */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/10 to-transparent opacity-80"></div>

        {/* รูปโปรไฟล์ ปรับ border และพื้นหลังให้ใช้สีของธีม */}
        <div className="w-64 h-64 md:w-[320px] md:h-[320px] rounded-3xl overflow-hidden border-4 border-base shadow-xl mb-8 relative z-10 bg-base transition-colors duration-300">
          <img 
            src={yuliImage} 
            alt="Yuli - Developer Profile" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* ข้อความแนะนำตัว */}
        <div className="relative z-10 w-full">
          {/* เปลี่ยนสีตัวอักษรเป็น text-text-base ให้เปลี่ยนตามโหมด */}
          <h1 className="text-2xl md:text-3xl font-black text-text-base mb-2 transition-colors">สวัสดีครับ ผม อภิวิชญ์ พรหมลา ชื่อเล่น "ยูลิ"</h1>
          <h2 className="text-primary font-bold text-lg mb-2 transition-colors">ผู้จัดทำเว็บ KMITL Survival Guide</h2>
          
          <p className="text-text-base opacity-70 font-medium mb-6 flex items-center justify-center gap-2 transition-colors">
            <span className="material-symbols-outlined text-[20px]">school</span>
            คณะวิทยาศาสตร์ สาขาฟิสิกส์อุตสาหกรรม 
          </p>
          
          <p className="text-text-base opacity-70 mb-8 max-w-lg leading-relaxed mx-auto transition-colors">
            ผมทำเว็บนี้ขึ้นมาเพราะตอนปี 1 เคยหลงทางในมอมาก่อน (และหาร้านข้าวกินยากมาก 555) 
            เลยอยากรวบรวมข้อมูลทั้งหมดที่เฟรชชี่ควรต้องรู้มาไว้ที่เดียว หวังว่าเว็บนี้จะเป็นประโยชน์กับน้องๆ ทุกคนนะครับ! 
            ถ้าเจอข้อมูลผิดพลาดตรงไหน หรืออยากให้เพิ่มเติมอะไรให้กับเว็บ ทักมาบอกได้เลยครับ ขอสุภาพหน่อยนะอิอิ
          </p>

          {/* ช่องทางการติดต่อ */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-xl mx-auto mb-10">
            {/* ปุ่ม IG ใช้สีเดิมเพราะเป็น Gradient เฉพาะตัว */}
            <a 
              href="https://instagram.com/your_ig" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white px-5 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md flex-1 min-w-[120px] justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">photo_camera</span> IG
            </a>
            
            {/* ปุ่ม Email ปรับมาใช้สี primary */}
            <a 
              href="mailto:your_email@gmail.com" 
              className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md flex-1 min-w-[120px] justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span> Email
            </a>

            {/* ปุ่ม GitHub ปรับสีให้ดูทันสมัยและเข้ากับทุกโหมด */}
            <a 
              href="https://github.com/your_github" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-neutral-800 dark:bg-neutral-700 text-white px-5 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md flex-1 min-w-[120px] justify-center"
            >
              <span className="material-symbols-outlined text-[20px]">code</span> GitHub
            </a>
          </div>

          {/* ☕️ โซน Support / Buy me a coffee */}
          <div className="pt-8 border-t border-border-card w-full max-w-md mx-auto transition-colors">
            <p className="text-sm text-text-base opacity-70 mb-4 font-medium transition-colors">ถ้าเว็บนี้มีประโยชน์ เลี้ยงกาแฟคนทำเว็บได้นะครับ 🥺</p>
            <a 
              href="#" 
              target="_blank" 
              rel="noreferrer"
              /* เปลี่ยนไปใช้โทนสี primary แบบโปร่งแสง */
              className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/20 hover:scale-105 transition-all mx-auto w-full max-w-[250px] border border-primary/20"
            >
              <span className="material-symbols-outlined">local_cafe</span> เลี้ยงกาแฟ 1 แก้ว
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;