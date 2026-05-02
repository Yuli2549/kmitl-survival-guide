import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ดึงไฟล์หน้าต่างๆ ของเราเข้ามา
import Home from './components/sections/Home';
import FoodSection from './components/sections/FoodSection';
import DormitorySection from './components/sections/DormitorySection';
import CoworkingSection from './components/sections/CoworkingSection';
import About from './components/sections/About';
import NewsSection from './components/sections/NewsSection'; 

// 👈 Import Navbar ของคุณ และ Footer
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-background-light">
        
        {/* 👈 เรียกใช้ Navbar ตรงนี้! มันจะลอยอยู่บนสุดของทุกหน้า */}
        <Navbar />

        {/* 👈 สำคัญมาก: เพิ่ม pt-[72px] (Padding Top) เข้าไป 
          เพื่อดันเนื้อหาทุกหน้าลงมา ไม่ให้มุดไปซ่อนอยู่ใต้ Navbar ของคุณ 
        */}
        <main className="flex-grow pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food" element={<FoodSection />} />
            <Route path="/dormitory" element={<DormitorySection />} />
            <Route path="/coworking" element={<CoworkingSection />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<NewsSection />} />
            {/* ถ้ามีหน้า News ก็เพิ่ม Route ตรงนี้ได้เลยนะครับ */}
          </Routes>
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;