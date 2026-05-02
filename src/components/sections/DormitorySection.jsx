import React, { useState, useEffect } from "react";

// ==========================================
// 1. MOCK DATA 
// ==========================================
const MOCK_REVIEW_SCORES = [
  { label: "ความเงียบ", icon: "volume_off", score: "4.5", width: "90%", color: "bg-primary", textCol: "text-primary" },
  { label: "ความเร็วเน็ต", icon: "wifi", score: "3.2", width: "64%", color: "bg-yellow-400", textCol: "text-yellow-500", note: "Note: Slow during 8PM - 11PM" },
  { label: "ความปลอดภัย", icon: "shield", score: "5.0", width: "100%", color: "bg-primary", textCol: "text-primary" },
  { label: "เจ้าของหอ", icon: "support_agent", score: "4.8", width: "96%", color: "bg-primary", textCol: "text-primary" },
];

const INITIAL_DORMS = [
  {
    id: 1, name: "RNP Residence", zone: "Zone: RNP", rating: "4.2", price: "5200", 
    water: "18 บาท/หน่วย", elec: "8 บาท/หน่วย", contact: "081-xxx-xxxx", line: "@rnp.residence", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qApl2ztVNOqDM28qGsubWhMJwhkQuMP-N5gKVWXIdQMxHFPhj4iKDcjC0k24atXi977HXUsMQB9rLogEyrc-rU7WkT4xSeAg4viTY2W0GiJCAdbXWvxGYzdCZXLDNWTRz7eTjSvIjDgerxqFje-iJUCleyWguwh5XjW0ktGZWBUYaZz09z1aVX4iiemJwDqMr9hdiIcQmrJAe27UJLqxQpzqt8pSEcJgIVBoMWdU3onuGFQ7ET036eqX35kD2LZQ5nxLDa2CHDM",
    tags: [
      { text: "ปลอดภัย", style: "bg-orange-50 text-orange-700 ring-orange-600/20" },
      { text: "สะอาด", style: "bg-base text-text-base opacity-80 ring-border-card" }
    ],
    warning: "",
    reviewList: [{ user: "รุ่นพี่วิศวะ", stars: 4, comment: "ปลอดภัยมากครับ แต่เดินไกลนิดนึง", date: "2 วันที่แล้ว" }]
  },
  {
    id: 2, name: "College View", zone: "Zone: College Town", rating: "3.8", price: "3800", 
    water: "เหมาจ่าย 150 บาท", elec: "7 บาท/หน่วย", contact: "089-xxx-xxxx", line: "college_view", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAK8qe_Sl-p5vbLKtT09I7f-d8tASPDNSoUL_X49DzBd55GOZrQzn8ksG4r54s9uuMlJ2pVZnSKiJhWleRU_A6sEzSXtI4CofNn5Q9KMjCiqHg6AXnx3bg7tCNwd5beJdQu7iJfyzq71PYCR3ylDJECPhMAao4370v7DK0ICDDda8QOp_xv86WVvSg1_wefLU4jkOMoAYtOFmkpSfmnpvnAhV5u6yh15bXfZrwiTAjNuCwOYL0KQCj_OY4y2AldrkkinJaWSxdMLV4",
    tags: [{ text: "เน็ตแรง", style: "bg-orange-50 text-orange-700 ring-orange-600/20" }],
    warning: "พบรายงานปัญหาการหักเงินประกัน",
    reviewList: []
  },
  {
    id: 3, name: "The Loft FBT", zone: "Zone: FBT", rating: "4.9", price: "6500", 
    water: "20 บาท/หน่วย", elec: "8 บาท/หน่วย", contact: "02-xxx-xxxx", line: "@loftfbt", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKUOWwa892ObsZiIDV33oWK2vj0-5HtNX5RYafoZO2hoGBkxyn_8faiGmIlxL88zu2TSQKCwPo646HsKq0ZYAsbLdz1ooij1UxxifC3Ce3YuG5ZH7QAC5LMcCRYeEhzgeAVwIoFhtVysC8wuukLUruXicULbY3_8eTffLgItOSQv6F27y7LFSePGzo6_Kd_ploltAI3IGXxbgejc01lV_bkXVGFgYlbGrau1JdN7bRItfZhHi63EJmSc7ziVIUW-o4t1zWgQrGNQ0",
    badge: "คุ้มค่าที่สุด",
    tags: [
      { text: "Gym", style: "bg-base text-text-base opacity-80 ring-border-card" },
      { text: "Pool", style: "bg-base text-text-base opacity-80 ring-border-card" }
    ],
    warning: "",
    reviewList: [{ user: "น้องปี 1", stars: 5, comment: "ส่วนกลางดีมาก ห้องกว้าง คุ้มราคา", date: "1 สัปดาห์ที่แล้ว" }]
  },
  {
    id: 4, name: "Baan Suan", zone: "Zone: เกกี", rating: "3.5", price: "3200", 
    water: "17 บาท/หน่วย", elec: "8 บาท/หน่วย", contact: "083-xxx-xxxx", line: "baansuan_kmitl", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIbe8GczvRJ9GMblObB5HGNmFoasiVJv82KByq1UAX4uWd5U05GDk8JwXQxVmWZ4tHXQPKK780IokvgnIQTK4aVmPbwAUrsOiUY5U2WU7GqTwyUTNBNA3u5E4sztdh1csIZrVVvki_JW6GDR31Rd_rZqHxa-zelLAOupG8OAW4sHyWvbKKbN-tC8yBsMtdEbA85ntxtDP3QOy0g_XK9gMtMSfuBIU6SJzRYcKwUQsVmo05vhOd0L3BahEd6TfM0ucensRgW3B9iLE",
    tags: [
      { text: "ราคาประหยัด", style: "bg-base text-text-base opacity-80 ring-border-card" },
      { text: "เลี้ยงสัตว์ได้", style: "bg-base text-text-base opacity-80 ring-border-card" }
    ],
    warning: "",
    reviewList: []
  },
  {
    id: 5, name: "Jinda Residence", zone: "Zone: เกกี", rating: "4.8", price: "4500", 
    water: "18 บาท/หน่วย", elec: "8 บาท/หน่วย", contact: "085-xxx-xxxx", line: "@jindares", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA6WvO5wAdAu2CR8soPwO6_O7ulhCUzrwzG13MG2n0YN6czZLuS2oRDjBGdJ2Jy52-kJPcHC6BIaNTtx1Q5vbBfp1T-rm10KEMbg_i6xpTtLGR9bXf8Iegi8FHoo8d_I16N5RchNMjnfWFrRLheTo-PThT7sVajnRezoyc0a0oLvCItlKFBg27F8wT6k08mA9iWTqWXFXfHBWqjW_uF_54Kku3Dc0U7OclelCl2vaLTv5NrcD34J7lwXLwTAu_lAgxBLN00iOvSCA",
    tags: [
      { text: "เพิ่งรีโนเวท", style: "bg-orange-50 text-orange-700 ring-orange-600/20" },
      { text: "ใกล้คณะ", style: "bg-base text-text-base opacity-80 ring-border-card" }
    ],
    warning: "",
    reviewList: [{ user: "พี่ปี 4", stars: 5, comment: "เจ้าของใจดีมากครับ แอร์เย็นฉ่ำ", date: "3 วันที่แล้ว" }]
  },
  {
    id: 6, name: "KMITL Dorm", zone: "Zone: หอใน", rating: "4.0", price: "2500", 
    water: "เหมาจ่าย", elec: "ตามมิเตอร์หลวง", contact: "ติดต่อส่วนกลาง", line: "@kmitl.dorm", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd344MO3mWtetOMnNFYsXMLR7Pkqo1t_sXHHv4ZAyg8d3PT8Y-fzdpdU0qmdKokZ8Y1x_8-JoJbn7zBXfVZs4udId7oQJ1sIvMWgLYxt5ZGjw3g6eGXrnXsMvlpwVKyuxttJ6_ioJfjZrz4oomAkhCisXYUyPTZLsxm_4HfgGboWbthYUwhG-8lZV77r80Iy10ZG1FKHGH6yIiuKsGSq8GS3jZ6F1TBHQAIyLAvyO6nXtyh5XoNylQJA7MFQ6d6cykSjLPUdAloD0",
    tags: [{ text: "ใกล้สุดๆ", style: "bg-green-50 text-green-700 ring-green-600/20" }],
    warning: "",
    reviewList: []
  },
  {
    id: 7, name: "Sky View Apartment", zone: "Zone: FBT", rating: "4.5", price: "5800", 
    water: "18 บาท/หน่วย", elec: "8 บาท/หน่วย", contact: "080-xxx-xxxx", line: "skyview_fbt", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qApl2ztVNOqDM28qGsubWhMJwhkQuMP-N5gKVWXIdQMxHFPhj4iKDcjC0k24atXi977HXUsMQB9rLogEyrc-rU7WkT4xSeAg4viTY2W0GiJCAdbXWvxGYzdCZXLDNWTRz7eTjSvIjDgerxqFje-iJUCleyWguwh5XjW0ktGZWBUYaZz09z1aVX4iiemJwDqMr9hdiIcQmrJAe27UJLqxQpzqt8pSEcJgIVBoMWdU3onuGFQ7ET036eqX35kD2LZQ5nxLDa2CHDM",
    tags: [{ text: "วิวสวย", style: "bg-base text-text-base opacity-80 ring-border-card" }],
    warning: "",
    reviewList: []
  }
];

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

const HeroSection = ({ onScroll, onAddClick }) => (
  <div className="w-full bg-base transition-colors duration-300">
    <div className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-[450px] sm:min-h-[500px] py-16 flex items-center justify-center group">
        <div className="absolute inset-0">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd344MO3mWtetOMnNFYsXMLR7Pkqo1t_sXHHv4ZAyg8d3PT8Y-fzdpdU0qmdKokZ8Y1x_8-JoJbn7zBXfVZs4udId7oQJ1sIvMWgLYxt5ZGjw3g6eGXrnXsMvlpwVKyuxttJ6_ioJfjZrz4oomAkhCisXYUyPTZLsxm_4HfgGboWbthYUwhG-8lZV77r80Iy10ZG1FKHGH6yIiuKsGSq8GS3jZ6F1TBHQAIyLAvyO6nXtyh5XoNylQJA7MFQ6d6cykSjLPUdAloD0" alt="Dormitory Overview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
        </div>
        <div className="relative z-10 text-center px-6 sm:px-10 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black !text-white drop-shadow-lg mb-6 leading-snug">ค้นหาและรีวิวหอพัก<br className="sm:hidden" /> รอบ สจล.</h1>
          <p className="text-gray-200 text-sm md:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-10">
              รวบรวมข้อมูลหอพักโซนลาดกระบัง (เกกี, RNP, FBT, College Town) อ่านรีวิวจากรุ่นพี่ตัวจริง ครบทั้งเรื่องความปลอดภัย ราคาถูกและประหยัด
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button onClick={onScroll} className="w-full sm:w-auto rounded-xl bg-primary px-8 py-4 text-sm font-bold !text-white shadow-lg hover:brightness-90 transition-all duration-300">ดูหอพักทั้งหมด</button>
            <button onClick={onAddClick} className="w-full sm:w-auto rounded-xl bg-white/20 backdrop-blur-md px-8 py-4 text-sm font-bold !text-white shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"><span className="material-symbols-outlined text-[20px] !text-white">add_business</span> แนะนำหอพัก</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeaturedDorm = ({ dorm }) => {
  if (!dorm) return null;

  return (
    <>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-base">หอพักแนะนำ</h2>
          <p className="text-sm text-text-base opacity-60 mt-1">คัดมาให้แล้ว คะแนน 4.0+ รีวิวดีเยี่ยม</p>
        </div>
      </div>

      <div className="mb-12 overflow-hidden rounded-2xl bg-card shadow-lg ring-1 ring-border-card transition-colors duration-300">
        <div className="flex flex-col lg:flex-row">
          <div className="relative h-64 lg:h-auto lg:w-1/3">
            <img className="absolute inset-0 h-full w-full object-cover opacity-90 dark:opacity-80" alt={dorm.name} src={dorm.img} />
            <div className="absolute bottom-4 left-4 rounded-md bg-card/90 px-2 py-1 text-xs font-bold text-text-base backdrop-blur-sm flex items-center gap-1 drop-shadow-sm transition-colors duration-300">
              <span className="material-symbols-outlined text-red-500 text-[16px] drop-shadow-sm">location_on</span> {dorm.zone}
            </div>
            <div className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm">แนะนำ!</div>
          </div>
          <div className="flex flex-1 flex-col p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-text-base">{dorm.name}</h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-black text-primary">{dorm.rating}</span><span className="text-sm text-text-base opacity-60">/ 5</span>
                </div>
                <span className="text-xs text-text-base opacity-40 underline decoration-dotted">อิงจากรีวิวรุ่นพี่</span>
              </div>
            </div>
            <hr className="my-6 border-border-card" />
            
            <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-text-base opacity-50">จุดเด่นที่รุ่นพี่ชอบ</h4>
                <div className="flex flex-wrap gap-2">
                  {dorm.tags.map((tag, i) => (
                    <span key={i} className={`inline-flex items-center rounded-sm px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${tag.style}`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-text-base opacity-50 mb-4">ข้อมูลค่าใช้จ่าย</h4>
                  <div className="rounded-lg bg-base border border-border-card p-4 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-2"><span className="text-sm text-text-base opacity-80">ค่าเช่าเริ่มต้น</span><span className="text-base font-bold text-text-base">฿{parseInt(dorm.price).toLocaleString()} /เดือน</span></div>
                    <div className="flex justify-between items-center mb-2"><span className="text-sm text-text-base opacity-80">ค่าน้ำ</span><span className="text-sm font-medium text-text-base opacity-90">{dorm.water}</span></div>
                    <div className="flex justify-between items-center mb-3"><span className="text-sm text-text-base opacity-80">ค่าไฟ</span><span className="text-sm font-medium text-text-base opacity-90">{dorm.elec}</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg border border-border-card px-4 py-2 text-sm font-medium text-text-base hover:bg-base transition-colors"><span className="material-symbols-outlined text-[18px]">call</span> โทร {dorm.contact}</button>
                {/* ปุ่มแสดง LINE */}
                {dorm.line && (
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg bg-[#00B900]/10 border border-[#00B900]/20 px-4 py-2 text-sm font-bold text-[#00B900] hover:bg-[#00B900] hover:text-white transition-colors">
                    <span className="font-black text-[15px]">LINE</span> {dorm.line}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DormCard = ({ dorm, viewMode, onSelectDetails, onSelectReviews }) => (
  <div className={`group relative flex overflow-hidden rounded-xl border border-border-card bg-card shadow-sm hover:shadow-lg transition-all duration-300 ${viewMode === "list" ? "flex-row min-h-[160px]" : "flex-col h-full"}`}>
    <div className={`relative overflow-hidden bg-base shrink-0 ${viewMode === "list" ? "w-[40%] sm:w-1/3" : "aspect-[4/3] w-full"}`}>
      <img className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 dark:opacity-80" alt={dorm.name} src={dorm.img} />
      <div className="absolute right-2 top-2 rounded-md bg-card/90 px-1.5 py-0.5 text-xs font-bold text-text-base shadow-sm backdrop-blur-sm">{dorm.rating} ★</div>
      {dorm.badge && viewMode === "grid" && <div className="absolute top-2 left-2 rounded-md bg-primary px-2 py-1 text-[10px] uppercase font-black text-white tracking-wide shadow-sm">{dorm.badge}</div>}
    </div>
    <div className="flex flex-1 flex-col p-4">
      <div className="mb-2 flex justify-between items-start gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text-base line-clamp-1">{dorm.name}</h3>
          <p className="text-xs text-text-base opacity-70 mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-red-500 drop-shadow-sm">location_on</span>{dorm.zone}</p>
        </div>
        {dorm.badge && viewMode === "list" && <div className="shrink-0 rounded-md bg-primary px-2 py-1 text-[10px] uppercase font-black text-white shadow-sm">{dorm.badge}</div>}
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {dorm.tags.map((tag, i) => <span key={i} className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium ring-1 ring-inset ${tag.style}`}>{tag.text}</span>)}
      </div>
      {dorm.warning && (
        <div className="mb-2 rounded border border-red-500/30 bg-red-500/10 p-1.5 w-fit">
          <p className="text-[10px] text-red-500 font-medium flex items-center gap-1 line-clamp-1"><span className="material-symbols-outlined text-[12px] shrink-0">warning</span> {dorm.warning}</p>
        </div>
      )}
      <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-lg text-text-base">฿{parseInt(dorm.price).toLocaleString()}</span>
          <span className="text-[10px] sm:text-xs text-text-base opacity-50">/เดือน</span>
        </div>
        <div className="flex flex-1 shrink-0 justify-end gap-2">
          <button onClick={() => onSelectDetails(dorm)} className="flex-1 sm:flex-none rounded-lg bg-primary/10 px-4 py-2 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors text-center whitespace-nowrap">ดูรายละเอียด</button>
          <button onClick={() => onSelectReviews(dorm)} className="flex-1 sm:flex-none rounded-lg border border-border-card bg-card px-4 py-2 text-sm font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center gap-1 whitespace-nowrap"><span className="material-symbols-outlined text-[18px]">edit_note</span><span>รีวิว</span></button>
        </div>
      </div>
    </div>
  </div>
);

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const DormitorySection = () => {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [priceFilter, setPriceFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const [dormCards, setDormCards] = useState(INITIAL_DORMS);
  const [recommendedDorm, setRecommendedDorm] = useState(null);
  
  const [visibleCount, setVisibleCount] = useState(4); 
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDormDetails, setSelectedDormDetails] = useState(null);
  const [selectedDormReviews, setSelectedDormReviews] = useState(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);

  // --- Logic Functions ---
  useEffect(() => {
    const topDorms = dormCards.filter(dorm => parseFloat(dorm.rating) >= 4.0 && !dorm.warning);
    if (topDorms.length > 0) {
      const randomIndex = Math.floor(Math.random() * topDorms.length);
      setRecommendedDorm(topDorms[randomIndex]);
    } else {
      setRecommendedDorm(dormCards[0]);
    }
  }, [dormCards]);

  useEffect(() => {
    setVisibleCount(4);
  }, [searchQuery, priceFilter, zoneFilter, ratingFilter]);

  const filteredDorms = dormCards.filter(dorm => {
    const matchSearch = dorm.name.toLowerCase().includes(searchQuery.toLowerCase()) || dorm.zone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchZone = zoneFilter === "all" || dorm.zone.includes(zoneFilter);
    const rawPrice = parseInt(dorm.price);
    let matchPrice = true;
    if (priceFilter === "low") matchPrice = rawPrice < 4000;
    else if (priceFilter === "mid") matchPrice = rawPrice >= 4000 && rawPrice <= 6000;
    else if (priceFilter === "high") matchPrice = rawPrice > 6000;
    const matchRating = ratingFilter === "all" || parseFloat(dorm.rating) >= parseFloat(ratingFilter);
    return matchSearch && matchZone && matchPrice && matchRating;
  });

  const displayedDorms = filteredDorms.slice(0, visibleCount);

  const scrollToDorms = () => {
    const element = document.getElementById("dorm-list-section");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddNewDorm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("dormImage");
    const imageUrl = file && file.size > 0 ? URL.createObjectURL(file) : "https://lh3.googleusercontent.com/aida-public/AB6AXuDKUOWwa892ObsZiIDV33oWK2vj0-5HtNX5RYafoZO2hoGBkxyn_8faiGmIlxL88zu2TSQKCwPo646HsKq0ZYAsbLdz1ooij1UxxifC3Ce3YuG5ZH7QAC5LMcCRYeEhzgeAVwIoFhtVysC8wuukLUruXicULbY3_8eTffLgItOSQv6F27y7LFSePGzo6_Kd_ploltAI3IGXxbgejc01lV_bkXVGFgYlbGrau1JdN7bRItfZhHi63EJmSc7ziVIUW-o4t1zWgQrGNQ0";
    const newDorm = {
      id: Date.now(), name: formData.get("dormName"), zone: "Zone: " + formData.get("dormZone"), price: formData.get("dormPrice"),
      water: formData.get("dormWater"), elec: formData.get("dormElec"), contact: formData.get("dormContact"), line: formData.get("dormLine"), rating: "0.0", 
      img: imageUrl, tags: [{ text: "หอใหม่", style: "bg-green-100 text-green-700 ring-green-600/20" }], warning: "", reviewList: []
    };
    setDormCards([newDorm, ...dormCards]);
    setIsAddModalOpen(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newReview = { user: "รุ่นพี่ (คุณ)", stars: rating, comment: formData.get("comment"), date: "เมื่อสักครู่" };
    
    const updatedDorms = dormCards.map(dorm => {
      if (selectedDormReviews && dorm.id === selectedDormReviews.id) {
        const updatedReviewList = [newReview, ...dorm.reviewList];
        const newRating = (updatedReviewList.reduce((sum, rev) => sum + rev.stars, 0) / updatedReviewList.length).toFixed(1);
        let updatedTags = [...dorm.tags];
        let updatedWarning = dorm.warning;
        
        if (formData.get("newFeature")?.trim()) updatedTags.push({ text: formData.get("newFeature").trim(), style: "bg-blue-50 text-blue-700 ring-blue-600/20" });
        if (formData.get("newWarning")?.trim()) updatedWarning = updatedWarning ? `${updatedWarning} | ${formData.get("newWarning").trim()}` : formData.get("newWarning").trim();

        const updatedDorm = { ...dorm, reviewList: updatedReviewList, rating: newRating, tags: updatedTags, warning: updatedWarning };
        setSelectedDormReviews(updatedDorm);
        if (selectedDormDetails?.id === dorm.id) setSelectedDormDetails(updatedDorm);
        return updatedDorm;
      }
      return dorm;
    });

    setDormCards(updatedDorms);
    alert("ขอบคุณสำหรับรีวิวครับ!");
    setIsWriteReviewOpen(false);
    setRating(5);
  };

  // --- Render ---
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-base text-text-base antialiased transition-colors duration-300">
      
      {/* 🔴 Modals Section */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-[480px] rounded-2xl shadow-2xl border border-border-card overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center border-b border-border-card/50">
              <h3 className="font-bold text-lg flex items-center gap-2">🏢 แนะนำหอพักใหม่</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="material-symbols-outlined opacity-60 hover:opacity-100">close</button>
            </div>
            <form onSubmit={handleAddNewDorm} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-bold mb-2">อัปโหลดรูปภาพหอพัก (PNG, JPEG)</label>
                <div className="border border-dashed border-border-card rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-base/30 hover:bg-base/50 transition-colors">
                  <span className="material-symbols-outlined text-3xl opacity-40">add_photo_alternate</span>
                  <input name="dormImage" type="file" accept=".png, .jpeg, .jpg" className="block w-full text-xs text-text-base opacity-80 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-primary/20 file:text-primary hover:file:bg-primary/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required name="dormName" className="col-span-2 w-full bg-base border border-border-card p-3 rounded-lg outline-none focus:border-primary text-sm" placeholder="ชื่อหอพัก" />
                <input required name="dormZone" className="col-span-2 w-full bg-base border border-border-card p-3 rounded-lg outline-none focus:border-primary text-sm" placeholder="โซน (เช่น RNP, FBT, เกกี)" />
                <input required name="dormPrice" className="col-span-2 w-full bg-base border border-border-card p-3 rounded-lg outline-none focus:border-primary text-sm" placeholder="ราคาเริ่มต้น (เช่น 4500)" />
                <input required name="dormWater" className="w-full bg-base border border-border-card p-3 rounded-lg outline-none focus:border-primary text-sm" placeholder="ค่าน้ำ (เช่น 18 บ./หน่วย)" />
                <input required name="dormElec" className="w-full bg-base border border-border-card p-3 rounded-lg outline-none focus:border-primary text-sm" placeholder="ค่าไฟ (เช่น 8 บ./หน่วย)" />
                {/* เปลี่ยนเป็นรับเบอร์และไลน์ในแถวเดียวกัน */}
                <input required name="dormContact" className="col-span-1 w-full bg-base border border-border-card p-3 rounded-lg outline-none focus:border-primary text-sm" placeholder="เบอร์โทรติดต่อ" />
                <input name="dormLine" className="col-span-1 w-full bg-base border border-border-card p-3 rounded-lg outline-none focus:border-primary text-sm" placeholder="Line ID (ถ้ามี)" />
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:brightness-90 transition shadow-lg mt-2">บันทึกข้อมูลหอพัก</button>
            </form>
          </div>
        </div>
      )}

      {selectedDormDetails && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl border border-border-card flex flex-col max-h-[90vh] overflow-hidden">
            <div className="relative h-48 w-full shrink-0">
              <img src={selectedDormDetails.img} alt={selectedDormDetails.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedDormDetails(null)} className="absolute top-3 right-3 bg-black/50 text-white rounded-full p-1 material-symbols-outlined hover:bg-black/80 transition">close</button>
              <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold shadow-sm">⭐ {selectedDormDetails.rating}</div>
            </div>
            <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
              <div><h3 className="text-2xl font-black">{selectedDormDetails.name}</h3><p className="text-sm opacity-70 flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-[16px] text-red-500">location_on</span> {selectedDormDetails.zone}</p></div>
              <div className="flex flex-wrap gap-2">{selectedDormDetails.tags.map((tag, i) => (<span key={i} className={`inline-flex items-center rounded-sm px-2 py-1 text-[11px] font-bold ring-1 ring-inset ${tag.style}`}>{tag.text}</span>))}</div>
              {selectedDormDetails.warning && <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3"><p className="text-xs text-red-500 font-bold flex items-start gap-2"><span className="material-symbols-outlined text-[16px]">warning</span> {selectedDormDetails.warning}</p></div>}
              <div className="bg-base border border-border-card rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-sm"><span className="opacity-70 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">payments</span> ค่าเช่า</span> <span className="font-bold text-lg">฿{parseInt(selectedDormDetails.price).toLocaleString()}</span></div>
                <div className="flex justify-between items-center text-sm"><span className="opacity-70 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">water_drop</span> ค่าน้ำ</span> <span className="font-bold">{selectedDormDetails.water}</span></div>
                <div className="flex justify-between items-center text-sm"><span className="opacity-70 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">bolt</span> ค่าไฟ</span> <span className="font-bold">{selectedDormDetails.elec}</span></div>
                {/* ข้อมูลการติดต่อ */}
                <div className="flex justify-between items-center text-sm border-t border-border-card pt-3 mt-1"><span className="opacity-70 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">call</span> เบอร์โทร</span> <span className="font-bold text-primary">{selectedDormDetails.contact}</span></div>
                {selectedDormDetails.line && (
                  <div className="flex justify-between items-center text-sm"><span className="opacity-70 flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">forum</span> LINE ID</span> <span className="font-bold text-[#00B900]">{selectedDormDetails.line}</span></div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-border-card flex gap-3 shrink-0"><button onClick={() => { setSelectedDormDetails(null); setSelectedDormReviews(selectedDormDetails); }} className="flex-1 bg-primary/10 text-primary py-3 rounded-xl font-bold hover:bg-primary hover:text-white transition">อ่าน {selectedDormDetails.reviewList.length} รีวิว</button></div>
          </div>
        </div>
      )}

      {selectedDormReviews && !isWriteReviewOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-xl border border-border-card flex flex-col max-h-[80vh]">
            <div className="p-5 border-b border-border-card flex justify-between items-center">
              <div><h3 className="font-bold text-xl">{selectedDormReviews.name}</h3><p className="text-xs opacity-70 mt-1">⭐ {selectedDormReviews.rating} ({selectedDormReviews.reviewList.length} รีวิว)</p></div>
              <button onClick={() => setSelectedDormReviews(null)} className="material-symbols-outlined hover:text-red-500">close</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {selectedDormReviews.reviewList.length > 0 ? selectedDormReviews.reviewList.map((rev, i) => (
                  <div key={i} className="bg-base p-4 rounded-xl border border-border-card">
                    <div className="flex justify-between items-start mb-2"><span className="font-bold text-sm text-primary">{rev.user}</span><div className="flex text-yellow-500">{Array(rev.stars).fill().map((_, s) => <span key={s} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}</div></div>
                    <p className="text-sm opacity-80">{rev.comment}</p><span className="text-[10px] opacity-40 mt-2 block">{rev.date}</span>
                  </div>
                )) : (<p className="text-center opacity-50 py-10">ยังไม่มีรีวิวสำหรับหอนี้ เป็นคนแรกที่รีวิวสิ!</p>)}
            </div>
            <div className="p-4 border-t border-border-card"><button onClick={() => setIsWriteReviewOpen(true)} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:brightness-90 transition">✏️ เขียนรีวิวของคุณ</button></div>
          </div>
        </div>
      )}

      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-md rounded-2xl p-6 border border-border-card shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-bold text-center mb-1 text-lg">รีวิวหอพัก</h3>
            <p className="text-center text-xs text-primary mb-5 font-bold">{selectedDormReviews?.name}</p>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((num) => (<button key={num} type="button" onClick={() => setRating(num)} className={`material-symbols-outlined text-4xl transition-colors hover:scale-110 ${rating >= num ? 'text-yellow-500' : 'text-border-card'}`} style={{ fontVariationSettings: rating >= num ? "'FILL' 1" : "'FILL' 0" }}>star</button>))}
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div><label className="block text-xs font-bold mb-1 opacity-70">ประสบการณ์ของคุณ (บังคับ)</label><textarea required name="comment" className="w-full bg-base border border-border-card p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" rows="3" placeholder="เน็ตแรงไหม เจ้าของใจดีหรือเปล่า..."></textarea></div>
              <div className="pt-2 border-t border-border-card/50"><label className="block text-xs font-bold mb-1 text-primary">เพิ่มจุดเด่น (ถ้ามี)</label><input name="newFeature" className="w-full bg-base border border-primary/30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary" placeholder="เช่น มียิม, มีสระว่ายน้ำ" /></div>
              <div><label className="block text-xs font-bold mb-1 text-red-500">รายงานปัญหา (ถ้ามี)</label><input name="newWarning" className="w-full bg-red-500/5 border border-red-500/30 p-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-red-500 placeholder-red-500/50" placeholder="เช่น โกงมัดจำ, เสียงดังมาก" /></div>
              <div className="flex gap-2 pt-4"><button type="button" onClick={() => setIsWriteReviewOpen(false)} className="flex-1 py-3 rounded-xl border border-border-card font-bold hover:bg-base">ยกเลิก</button><button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:brightness-90 shadow-md">ส่งรีวิว</button></div>
            </form>
          </div>
        </div>
      )}

      {/* 🟢 Main Content */}
      <main className="flex-1 flex flex-col items-center w-full pb-20">
        
        <HeroSection onScroll={scrollToDorms} onAddClick={() => setIsAddModalOpen(true)} />

        <div id="dorm-list-section" className="w-full max-w-7xl px-4 pt-8 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-96 shrink-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="material-symbols-outlined text-text-base opacity-50">search</span></div>
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="block w-full rounded-lg border-0 bg-card py-3 pl-10 pr-4 text-text-base ring-1 ring-inset ring-border-card focus:ring-2 focus:ring-primary shadow-sm outline-none transition-colors duration-300" placeholder="ค้นหาชื่อหอ, โซน..." />
            </div>
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="appearance-none flex h-10 rounded-lg border border-border-card bg-card px-4 text-sm font-medium outline-none"><option value="all">ราคา: ทั้งหมด</option><option value="low">ต่ำกว่า 4,000</option><option value="mid">4,000 - 6,000</option><option value="high">มากกว่า 6,000</option></select>
              <select value={zoneFilter} onChange={(e) => setZoneFilter(e.target.value)} className="appearance-none flex h-10 rounded-lg border border-border-card bg-card px-4 text-sm font-medium outline-none"><option value="all">โซน: ทั้งหมด</option><option value="RNP">RNP</option><option value="FBT">FBT</option><option value="เกกี">เกกี</option><option value="College Town">College Town</option></select>
              <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="appearance-none flex h-10 rounded-lg border border-border-card bg-card px-4 text-sm font-medium outline-none"><option value="all">คะแนน: 4.0+</option><option value="4.0">4.0 ดาวขึ้นไป</option><option value="4.5">4.5 ดาวขึ้นไป</option></select>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-7xl px-4 lg:px-8">
          
          {searchQuery === "" && priceFilter === "all" && zoneFilter === "all" && ratingFilter === "all" && (
            <FeaturedDorm dorm={recommendedDorm} />
          )}

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-base">รีวิวและรายการล่าสุด</h2>
            <div className="flex gap-2">
              <button onClick={() => setViewMode("grid")} className={`rounded-md p-2 transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-text-base hover:bg-card opacity-50"}`}><span className="material-symbols-outlined" style={{ fontVariationSettings: viewMode === "grid" ? "'FILL' 1" : "'FILL' 0" }}>grid_view</span></button>
              <button onClick={() => setViewMode("list")} className={`rounded-md p-2 transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-text-base hover:bg-card opacity-50"}`}><span className="material-symbols-outlined">list</span></button>
            </div>
          </div>

          {filteredDorms.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border-card"><p className="opacity-60 mb-4">ไม่พบหอพักที่ตรงกับตัวกรอง</p></div>
          ) : (
            <>
              <div className={`grid gap-6 ${viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 lg:grid-cols-2"}`}>
                {displayedDorms.map((dorm) => (
                  <DormCard 
                    key={dorm.id} 
                    dorm={dorm} 
                    viewMode={viewMode} 
                    onSelectDetails={setSelectedDormDetails} 
                    onSelectReviews={setSelectedDormReviews} 
                  />
                ))}
              </div>

              {visibleCount < filteredDorms.length && (
                <div className="mt-10 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 4)}
                    className="flex items-center gap-2 rounded-full border border-border-card bg-card px-6 py-3 text-sm font-bold text-text-base shadow-sm hover:bg-base hover:text-primary transition-all duration-300 group"
                  >
                    <span className="material-symbols-outlined transition-transform duration-300 group-hover:animate-spin">sync</span>
                    โหลดเพิ่มเติม ({filteredDorms.length - visibleCount} หอพัก)
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </div>
  );
};

export default DormitorySection;