import React, { useState, useMemo } from "react";

// =========================================
// 1. DATA: รายชื่อคณะและโซนทั้งหมดใน สจล.
// =========================================
const ZONES = [
  "ทั้งหมด",
  "KLLC (สำนักหอสมุด)",
  "คณะวิศวกรรมศาสตร์",
  "คณะสถาปัตยกรรม ศิลปะและการออกแบบ",
  "คณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี",
  "คณะเทคโนโลยีการเกษตร",
  "คณะวิทยาศาสตร์",
  "คณะเทคโนโลยีสารสนเทศ",
  "คณะอุตสาหกรรมอาหาร",
  "คณะบริหารธุรกิจ",
  "คณะศิลปศาสตร์",
  "คณะแพทยศาสตร์",
  "คณะทันตแพทยศาสตร์",
  "คณะพยาบาลศาสตร์",
  "คณะเทคโนโลยีนวัตกรรมบูรณาการ"
];

const COWORKING_SPACES = [
  {
    id: 1,
    name: "KLLC ชั้น 1 (โซนอ่านหนังสือ 24 ชม.)",
    zone: "KLLC (สำนักหอสมุด)",
    openHours: "เปิดตลอด 24 ชั่วโมง",
    status: "เปิดอยู่",
    statusColor: "bg-green-500",
    desc: "โซนยอดฮิตของชาวลาดกระบัง แอร์เย็นฉ่ำ มีปลั๊กไฟบริการทุกโต๊ะ เหมาะสำหรับมาโต้รุ่งช่วงสอบ",
    features: ["ปลั๊กไฟทุกโต๊ะ", "แอร์เย็นมาก", "คุยงานได้", "ใกล้คาเฟ่"],
    img: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "IT Co-working Space (ตึกคณะไอที)",
    zone: "คณะเทคโนโลยีสารสนเทศ",
    openHours: "08:00 - 18:00 น.",
    status: "เปิดอยู่",
    statusColor: "bg-green-500",
    desc: "พื้นที่ทำงานสำหรับชาวไอทีและนักศึกษาทั่วไป มีโต๊ะสำหรับประชุมกลุ่มและกระดานไวท์บอร์ด เน็ตแรงมาก",
    features: ["Wi-Fi แรง", "โต๊ะกลุ่ม", "กระดานไวท์บอร์ด", "คุยงานได้"],
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "HM Building (โถงชั้น 1)",
    zone: "คณะวิศวกรรมศาสตร์",
    openHours: "07:00 - 22:00 น.",
    status: "เปิดอยู่",
    statusColor: "bg-green-500",
    desc: "จุดรวมพลเด็กวิศวะ โต๊ะไม้ตัวใหญ่เยอะมาก เหมาะกับการนั่งทำโปรเจกต์ หรือกินข้าวไปทำงานไป",
    features: ["โต๊ะใหญ่", "คุยเสียงดังได้", "ใกล้อาหาร", "ไม่มีแอร์"],
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Archi Workspace",
    zone: "คณะสถาปัตยกรรม ศิลปะและการออกแบบ",
    openHours: "เปิดตลอด 24 ชั่วโมง",
    status: "เปิดอยู่",
    statusColor: "bg-green-500",
    desc: "สเปซสุดอาร์ตใต้คณะสถาปัตย์ โต๊ะกว้างเหมาะสำหรับตัดโมเดล วาดรูป หรือทำงานคราฟต์ บรรยากาศร่มรื่น",
    features: ["โต๊ะตัดโมเดล", "บรรยากาศดี", "คุยงานได้", "เปิด 24 ชม."],
    img: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=800&q=80"
  }
  // สามารถเพิ่มข้อมูลสถานที่ของคณะอื่นๆ ได้ที่นี่
];

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const HeroSection = ({ onScroll }) => (
  <div className="w-full bg-base transition-colors duration-300">
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-[450px] sm:min-h-[500px] py-16 flex items-center justify-center group">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=1200&q=80" alt="Coworking Overview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
        </div>
        <div className="relative z-10 text-center px-6 sm:px-10 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black !text-white drop-shadow-lg mb-6 leading-snug">ค้นหาพิกัดที่นั่งทำงาน<br className="sm:hidden" /> และห้องสมุด สจล.</h1>
          <p className="text-gray-200 text-sm md:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-10">
              รวบรวมพิกัด Co-working Space, ห้องสมุด และมุมนั่งชิลในลาดกระบัง พร้อมเช็คเวลาเปิด-ปิด และสิ่งอำนวยความสะดวกครบจบในที่เดียว
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button onClick={onScroll} className="w-full sm:w-auto rounded-xl bg-primary px-8 py-4 text-sm font-bold !text-white shadow-lg hover:brightness-90 transition-all duration-300">
              Co-working Space ทั้งหมด
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// =========================================
// 3. MAIN COMPONENT
// =========================================
const CoworkingSection = () => {
  const [activeZone, setActiveZone] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  const ITEMS_PER_LOAD = 6;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const filteredSpaces = useMemo(() => {
    let filtered = COWORKING_SPACES;
    if (activeZone !== "ทั้งหมด") {
      filtered = filtered.filter((space) => space.zone === activeZone);
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (space) =>
          space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          space.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [activeZone, searchQuery]);

  const displayedSpaces = filteredSpaces.slice(0, visibleCount);

  const handleZoneChange = (zone) => {
    setActiveZone(zone);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  const scrollToSpaces = () => {
    const element = document.getElementById("coworking-list-section");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-base text-text-base antialiased transition-colors duration-300">
      
      {/* 🔴 Modal สำหรับดูรายละเอียด */}
      {selectedSpace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden">
          <div className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-border-card overflow-hidden flex flex-col max-h-[90vh] text-text-base">
            <div className="relative h-48 sm:h-64 w-full shrink-0">
              <img src={selectedSpace.img} alt={selectedSpace.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
              <button 
                onClick={() => setSelectedSpace(null)} 
                className="absolute top-3 right-3 bg-black/50 text-white rounded-full size-9 flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <span className="material-symbols-outlined block text-[20px]">close</span>
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded text-white mb-2 ${selectedSpace.statusColor}`}>
                  {selectedSpace.status}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug drop-shadow-md">{selectedSpace.name}</h3>
                <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-[16px]">location_on</span> {selectedSpace.zone}
                </p>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 pb-10">
              {/* ✅ ลบส่วนรีวิวออก เหลือแค่เวลาทำการ */}
              <div className="flex items-center gap-6 mb-6 pb-4 border-b border-border-card">
                <div className="flex flex-col">
                  <span className="text-xs opacity-60 uppercase font-bold tracking-wider mb-1">เวลาทำการ</span>
                  <span className="font-semibold text-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px] text-primary">schedule</span> {selectedSpace.openHours}
                  </span>
                </div>
              </div>
              
              <h4 className="font-bold text-lg mb-2">รายละเอียด</h4>
              <p className="text-[0.875rem] sm:text-[1rem] leading-relaxed opacity-80 mb-6">
                {selectedSpace.desc}
              </p>

              <h4 className="font-bold text-lg mb-3">สิ่งอำนวยความสะดวก</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSpace.features.map((feature, idx) => (
                  <span key={idx} className="bg-base border border-border-card px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 Main Content */}
      <main className="flex-1 flex flex-col items-center w-full pb-20">
        
        <HeroSection onScroll={scrollToSpaces} />

        <div id="coworking-list-section" className="w-full max-w-7xl px-4 pt-8 lg:px-8">
          
          <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-card p-4 rounded-2xl shadow-sm border border-border-card mb-8">
            
            <div className="relative w-full xl:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] opacity-40 pointer-events-none">filter_list</span>
              <select
                value={activeZone}
                onChange={(e) => handleZoneChange(e.target.value)}
                className="w-full appearance-none bg-base border border-border-card rounded-full py-2.5 pl-10 pr-10 text-sm font-bold text-text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer transition-all"
              >
                {ZONES.map((zone) => (
                  <option key={zone} value={zone} className="bg-card text-text-base">
                    {zone}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                expand_more
              </span>
            </div>

            <div className="flex flex-row items-center gap-2 sm:gap-4 w-full xl:w-auto">
              <div className="relative flex-1 min-w-0 xl:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-base opacity-40">search</span>
                <input
                  type="text"
                  placeholder="ค้นหาสถานที่..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full bg-base border border-border-card rounded-full py-2.5 pl-10 pr-4 text-sm text-text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex bg-base rounded-full p-1 border border-border-card shrink-0">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-1.5 rounded-full transition-all flex items-center justify-center ${viewMode === 'grid' ? 'bg-card shadow-sm text-primary' : 'text-text-base opacity-50 hover:opacity-100'}`}
                  title="Grid View"
                >
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-1.5 rounded-full transition-all flex items-center justify-center ${viewMode === 'list' ? 'bg-card shadow-sm text-primary' : 'text-text-base opacity-50 hover:opacity-100'}`}
                  title="List View"
                >
                  <span className="material-symbols-outlined text-[20px]">view_list</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 lg:px-8">
          
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-base">
              {activeZone === "ทั้งหมด" ? "รายการสถานที่ทั้งหมด" : `สถานที่ใน ${activeZone}`}
            </h2>
          </div>

          {displayedSpaces.length === 0 ? (
            <div className="py-20 text-center bg-card rounded-2xl border border-dashed border-border-card opacity-60">
              <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
              <p>ไม่พบสถานที่ในโซนนี้ที่ตรงกับการค้นหา</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "flex flex-col gap-4"
            }>
              {displayedSpaces.map((space) => (
                <div 
                  key={space.id} 
                  onClick={() => setSelectedSpace(space)}
                  className={`group bg-card border border-border-card overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer flex 
                    ${viewMode === 'grid' ? 'flex-col rounded-2xl' : 'flex-row rounded-xl items-stretch'}
                  `}
                >
                  <div className={`relative bg-base overflow-hidden shrink-0 ${viewMode === 'grid' ? 'h-48 w-full' : 'w-[120px] sm:w-64 xl:w-72'}`}>
                    <img 
                      src={space.img} 
                      alt={space.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-2 ${viewMode === 'list' ? 'hidden sm:flex' : 'flex'}`}>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm flex items-center gap-1 ${space.statusColor}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {space.status}
                      </span>
                    </div>
                  </div>

                  <div className={`flex flex-col flex-1 min-w-0 ${viewMode === 'list' ? 'justify-center p-3 sm:p-5' : 'p-5'}`}>
                    {/* ✅ ลบส่วนคะแนนรีวิวออกจากการ์ด */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-bold text-text-base leading-snug group-hover:text-primary transition-colors ${viewMode === 'list' ? 'text-base sm:text-lg line-clamp-2 sm:line-clamp-1' : 'text-lg line-clamp-1'}`}>
                        {space.name}
                      </h3>
                    </div>
                    
                    <p className={`text-sm text-text-base opacity-60 flex items-center gap-1 ${viewMode === 'list' ? 'mb-2 sm:mb-4 text-xs sm:text-sm' : 'mb-4'}`}>
                      <span className="material-symbols-outlined text-[14px] sm:text-[16px]">location_on</span> <span className="truncate">{space.zone}</span>
                    </p>

                    <div className={`flex-wrap gap-1.5 ${viewMode === 'grid' ? 'mb-4 mt-auto flex' : 'hidden sm:flex mb-4'}`}>
                      {space.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-[11px] font-semibold bg-base border border-border-card px-2 py-1 rounded-md text-text-base opacity-80">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 sm:pt-4 border-t border-border-card flex items-center justify-between mt-auto">
                      <span className="text-[10px] sm:text-xs font-semibold text-text-base opacity-70 flex items-center gap-1 truncate">
                        <span className="material-symbols-outlined text-[12px] sm:text-[14px]">schedule</span> {space.openHours}
                      </span>
                      <span className="text-primary text-[10px] sm:text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all shrink-0 ml-2">
                        ดูรายละเอียด <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {visibleCount < filteredSpaces.length && (
            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + ITEMS_PER_LOAD)}
                className="flex items-center gap-2 rounded-full border border-border-card bg-card px-6 py-3 text-sm font-bold text-text-base shadow-sm hover:bg-base hover:text-primary transition-all duration-300 group"
              >
                <span className="material-symbols-outlined transition-transform duration-300 group-hover:animate-spin">sync</span>
                โหลดเพิ่มเติม ({filteredSpaces.length - visibleCount} ที่)
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default CoworkingSection;