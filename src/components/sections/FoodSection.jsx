import React, { useState, useEffect } from "react";

const FoodSection = () => {
  // 🟢 State หลัก (ค้นหาและมุมมอง)
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(6);

  // 🟢 State สำหรับ Modal (ป๊อปอัป)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedShopForReviews, setSelectedShopForReviews] = useState(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);

  // ✅ 1. เพิ่ม State สำหรับระบบตัวกรอง (Filters) & เรียงลำดับ (Sort)
  const [activeBudget, setActiveBudget] = useState(null); // ตัวกรองงบประมาณ
  const [statusFilter, setStatusFilter] = useState({ openNow: false, lateNight: false }); // ตัวกรองสถานะร้าน
  const [activeZones, setActiveZones] = useState([]); // ตัวกรองโซน
  const [sortBy, setSortBy] = useState("recommended"); // การเรียงลำดับ

  const filters = {
    budgets: ["≤ 40฿", "≤ 50฿", "≤ 60฿"],
    status: [
      { id: "open", label: "เปิดตอนนี้ (Open Now)", checked: false },
      { id: "late", label: "เปิดดึก (Late Night)", icon: "dark_mode" }
    ],
    zones: ["เกกี (Geki) 1-4", "โรงวิศวะ (Engineer)", "โรงพระเทพ (Phra Thep)", "ซอย RNP"]
  };

  const [shops, setShops] = useState([
    {
      id: 1, name: "ป้าทอย กะเพราถาด", price: "฿40-60", location: "โรงอาหารวิศวะ (Engineer)",
      tags: ["อาหารตามสั่ง", "ให้เยอะ"], rating: 4.8, reviews: 120, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyE3op9rJM1U4Jxz5-eR6KSVG1Duntop1d4cmPIDCfPndiM-wuTb1EFgOCcjHiJYdvsZKIiGI6JkM-qFdVwvPdFJ3s9iCprSvpb6an2cnBnbhTEgn1w5rvogzGGzOPDDsubLCwCxZV-qx6MZAZ260lMecemaN6VU4C0-2n6AZirM25oRGrEIi5APwRF5Q0vWb6h-zGBXsBYcWPGiSgXt0V0hFhOXt6Z_1FTXiJpoU6-zI-or-KtNflDXh7aHKShr0FlloBgXZ3iS0",
      badge: "เปิดอยู่", openTime: "08:00 - 16:00",
      reviewList: Array(10).fill({ user: "รุ่นพี่วิศวะ", comment: "ได้เยอะมาก คุ้มราคา อร่อยด้วยครับ", stars: 5, date: "1 วันที่แล้ว" })
    },
    {
      id: 2, name: "Sleepless Cafe", price: "฿60-120", location: "เกกีงาม ซอย 2",
      tags: ["คาเฟ่", "อ่านหนังสือ"], rating: 4.5, reviews: 45, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmd8v_-9akz2fJvlQRSmdadrodLTSxa0kVSjkye3ZHtNbxIAZFJLtTQC-CxS9T1xxXptFNf1xK2mxwCQ8GvBqLvLeuo62k_SZb7IKw5MgC5kwsnSUvNpjINOrarF6BJled4t5T0jEgz6YE888iJEjUFaUse7hqno9p7WfBdeV5-1LSHkGMtg-VjxaPNrOHlmf6RNFCt0rx_x7AJpb_rVPOKBnWHKTcG9XsvoMSahTonSOf9qH5IW5g7AuMNY6Ou4Qi140bzLaiLiA",
      night: "เปิดดึก (ถึง 02:00)", openTime: "10:00 - 02:00",
      reviewList: [{ user: "น้องปี 1", comment: "กาแฟดีมากค่ะ นั่งอ่านหนังสือได้ยาวๆ", stars: 4, date: "3 วันที่แล้ว" }]
    },
    {
      id: 3, name: "ติ่มซำ หอใน", price: "฿30-50", location: "หอพักนักศึกษา (Dorm)",
      tags: ["ติ่มซำ", "ราคาประหยัด"], rating: 4.2, reviews: 8, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC_s8x83PWNeSb2kccygA7C9xrfgQVvg249A0YF6CIoyLxHlFrhIAhLLkj3Q4UNudr8HlIjyPNvbFZC9ZR3jebVtq-WaimDcpxSk28aKW4vrn6f5rr6EUyB2dJYFscKJbiO4eXI6eFHtWfms-EAm8ubsqIqHDCUBPJJGTkTlDl3AtZ1hTEMyf0REHFpCj--zQ9CXOcR3TyHPPvqcy1lZh82QO731YEr8qgbNYHVuePSkPXFp0eZVztUAP7hR1j-45AOlKo1TrOF3o",
      isClosed: true, openTime: "07:00 - 13:00", reviewList: []
    },
    {
      id: 4, name: "ก๋วยเตี๋ยวเรือลุงดำ", price: "฿35-45", location: "โรงพระเทพ (Phra Thep)",
      tags: ["ก๋วยเตี๋ยว", "ขายดี"], rating: 4.9, reviews: 210, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9TjW-ZtqmLjRO6BS34rmd2UaddHhpnya7CYh85GfFs8IU9jEUkbetfNoCMNj1rcEgV1wfMyxbAmvzfHcbu-2QgMxN-cc7PGwWpZ1-8PsNLgrnllnC2MboyfIeVO0Z14XlbXCtxERb0bM7l8FbDGEx0mRBkwiBrpJ7xEKVKtxzVGXOyzoGl2oP4hpXTmECa5lwaisO14pGvovY0s6C6Xa81noBZMrGWQTf1iYrS2Bw2Q4q85Bc84xa5Pz-TBHMArSN7t-hMnHwAnw",
      badge: "เปิดอยู่", openTime: "09:00 - 15:00", reviewList: []
    },
    {
      id: 5, name: "Burger Loft", price: "฿80-150", location: "RNP Soi 1",
      tags: ["อินเตอร์", "สังสรรค์"], rating: 4.3, reviews: 56, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_-g1CN1-NiJL4_KO_UKplAaRJqYytvQoVlBa8VwaYndDgdNyW2hTLp79NM3og7Q9rHzxR9FugD7F4RNVwZnTjXP5xVSMqdujiZt_eFP7N-rrqfx7nOOt3l0DgqsB7YZVajrpkKryS0-5atHTB8wu-CW7c_n1hVjeMDiK0ZVowsdTXEmBR6K21qYVt201d_R3g4PGbLKim7wus4CJ0G9BcrEKWxwj9S9TUB1esun3qvj-GXxzu_pnPTqPmpT2HdCrIel8laZYjsAY",
      night: "เปิดดึก (ถึง 00:00)", openTime: "16:00 - 00:00", reviewList: []
    },
    {
      id: 6, name: "ข้าวแกงปักษ์ใต้", price: "฿35-50", location: "เกกี 4",
      tags: ["ข้าวแกง", "รสจัด"], rating: 4.6, reviews: 89, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYViTSL-AhVl5MuqBmw0XUUPSmpqT31Uus4Dd2Rx6sCG6_CaMK49B1eEBwFKOCXb7jRplsZgvJPQqFz4q-QTChBIBrSaCyv4pYlr8PRZ9Wd4AF7rnauDaHOx1QNPAq6HDE6oj1h1j3_j27udLn65_tx7ub_0heXCc-8h5aE60pNgxgAQ848spvGNcPHOHsPQ3lVEBMbp0PNO1r5juDOW3Gp7Ctr7PkfJGN_LJa3W8L2dswNUd5l8qN04IaOnDIWFQsMBOwO_FyY54",
      badge: "เปิดอยู่", openTime: "07:00 - 14:00", reviewList: []
    },
    {
      id: 7, name: "ชาบูอินดี้ ลาดกระบัง", price: "฿219", location: "ซอย RNP",
      tags: ["บุฟเฟต์", "ชาบู"], rating: 4.7, reviews: 340, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd344MO3mWtetOMnNFYsXMLR7Pkqo1t_sXHHv4ZAyg8d3PT8Y-fzdpdU0qmdKokZ8Y1x_8-JoJbn7zBXfVZs4udId7oQJ1sIvMWgLYxt5ZGjw3g6eGXrnXsMvlpwVKyuxttJ6_ioJfjZrz4oomAkhCisXYUyPTZLsxm_4HfgGboWbthYUwhG-8lZV77r80Iy10ZG1FKHGH6yIiuKsGSq8GS3jZ6F1TBHQAIyLAvyO6nXtyh5XoNylQJA7MFQ6d6cykSjLPUdAloD0",
      night: "เปิดดึก (ถึง 23:00)", openTime: "16:00 - 23:00", reviewList: []
    },
    {
      id: 8, name: "เครปบุฟเฟต์ ป้าณี", price: "฿45", location: "เกกีงาม ซอย 1",
      tags: ["ของหวาน", "คิวยาว"], rating: 4.4, reviews: 75, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAA6WvO5wAdAu2CR8soPwO6_O7ulhCUzrwzG13MG2n0YN6czZLuS2oRDjBGdJ2Jy52-kJPcHC6BIaNTtx1Q5vbBfp1T-rm10KEMbg_i6xpTtLGR9bXf8Iegi8FHoo8d_I16N5RchNMjnfWFrRLheTo-PThT7sVajnRezoyc0a0oLvCItlKFBg27F8wT6k08mA9iWTqWXFXfHBWqjW_uF_54Kku3Dc0U7OclelCl2vaLTv5NrcD34J7lwXLwTAu_lAgxBLN00iOvSCA",
      badge: "เปิดอยู่", openTime: "12:00 - 21:00", reviewList: []
    },
    {
      id: 9, name: "ข้าวมันไก่ ยกซด", price: "฿40-50", location: "โรงพระเทพ (Phra Thep)",
      tags: ["ข้าวมันไก่", "น้ำซุปอร่อย"], rating: 4.5, reviews: 112, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qApl2ztVNOqDM28qGsubWhMJwhkQuMP-N5gKVWXIdQMxHFPhj4iKDcjC0k24atXi977HXUsMQB9rLogEyrc-rU7WkT4xSeAg4viTY2W0GiJCAdbXWvxGYzdCZXLDNWTRz7eTjSvIjDgerxqFje-iJUCleyWguwh5XjW0ktGZWBUYaZz09z1aVX4iiemJwDqMr9hdiIcQmrJAe27UJLqxQpzqt8pSEcJgIVBoMWdU3onuGFQ7ET036eqX35kD2LZQ5nxLDa2CHDM",
      isClosed: true, openTime: "06:00 - 14:00", reviewList: []
    }
  ]);

  // รีเซ็ตปุ่มโหลดเพิ่มเติมเมื่อมีการเปลี่ยนฟิลเตอร์ใดๆ
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, activeBudget, statusFilter.openNow, statusFilter.lateNight, activeZones.length, sortBy]);

  // ✅ 2. ฟังก์ชันหลักสำหรับล้างค่าฟิลเตอร์ทั้งหมด
  const clearFilters = () => {
    setSearchQuery("");
    setActiveBudget(null);
    setStatusFilter({ openNow: false, lateNight: false });
    setActiveZones([]);
    setSortBy("recommended");
  };

  // ✅ 3. Logic การกรองและเรียงลำดับ (Filter & Sort Engine)
  let filteredShops = shops.filter(shop => {
    // กรองด้วยคำค้นหา
    const matchSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        shop.location.toLowerCase().includes(searchQuery.toLowerCase());

    // กรองด้วยงบประมาณ (ดึงเฉพาะตัวเลขจาก string ราคา)
    let matchBudget = true;
    if (activeBudget) {
      const match = shop.price.match(/\d+/);
      const minPrice = match ? parseInt(match[0]) : 0;
      if (activeBudget === "≤ 40฿") matchBudget = minPrice <= 40;
      else if (activeBudget === "≤ 50฿") matchBudget = minPrice <= 50;
      else if (activeBudget === "≤ 60฿") matchBudget = minPrice <= 60;
    }

    // กรองด้วยสถานะ (เปิดอยู่, เปิดดึก)
    let matchStatus = true;
    if (statusFilter.openNow && shop.isClosed) matchStatus = false;
    if (statusFilter.lateNight && !shop.night) matchStatus = false;

    // กรองด้วยโซนที่ตั้ง
    let matchZone = true;
    if (activeZones.length > 0) {
      matchZone = activeZones.some(zone => {
        if (zone.includes("เกกี")) return shop.location.includes("เกกี");
        if (zone.includes("วิศวะ")) return shop.location.includes("วิศวะ");
        if (zone.includes("พระเทพ")) return shop.location.includes("พระเทพ");
        if (zone.includes("RNP")) return shop.location.includes("RNP");
        return false;
      });
    }

    return matchSearch && matchBudget && matchStatus && matchZone;
  });

  // ระบบเรียงลำดับ
  if (sortBy === "rating") {
    filteredShops.sort((a, b) => b.rating - a.rating); // เรตติ้งสูงไปต่ำ
  } else if (sortBy === "price") {
    filteredShops.sort((a, b) => {
      const priceA = parseInt((a.price.match(/\d+/) || [0])[0]);
      const priceB = parseInt((b.price.match(/\d+/) || [0])[0]);
      return priceA - priceB; // ราคาต่ำไปสูง
    });
  }

  const displayedShops = filteredShops.slice(0, visibleCount);

  // ฟังก์ชันเพิ่มร้านและรีวิว
  const handleAddNewShop = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("shopImage");
    const imageUrl = file && file.size > 0 ? URL.createObjectURL(file) : "https://lh3.googleusercontent.com/aida-public/AB6AXuCGOBRw8LCKU_6ZojHXy-MrnJ_aj8cjjhUAtW4TgJONjhZ2ZQqVKv37oTeDkGkUX6LvFTVUTvQqoECBCa1t36CNc9uvxMXE1ecfh7VUmU8JAOGFWlHDEVR0YGsCb4-CdvmsTkKu3usHyh68AW5ZSfKIYjcErmdGMakIFbDQK7Nxqzef43G9NhgSpE_PYSY822c312s5Jw0OFuxnu8A5fWz--UmcoRxP5Jp_3P0TkGgGdHF5gAMTdVviBF5NMgcgm44wswA4laaIq7I";

    const newShop = {
      id: Date.now(),
      name: formData.get("shopName"),
      price: formData.get("shopPrice"),
      location: formData.get("shopLocation"),
      openTime: formData.get("shopHours"),
      tags: ["ร้านใหม่"],
      rating: 0, reviews: 0,
      img: imageUrl,
      reviewList: []
    };
    setShops([newShop, ...shops]);
    setIsAddModalOpen(false);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const newComment = e.target.comment.value;
    const newReview = { user: "เพื่อนใหม่ (คุณ)", comment: newComment, stars: rating, date: "เมื่อสักครู่" };

    const updatedShops = shops.map(shop => {
      if (selectedShopForReviews && shop.id === selectedShopForReviews.id) {
        const updatedReviewList = [newReview, ...shop.reviewList];
        const newReviewsCount = shop.reviews + 1;
        const totalStars = updatedReviewList.reduce((sum, rev) => sum + rev.stars, 0);
        const newRating = (totalStars / newReviewsCount).toFixed(1);
        const updatedShop = { ...shop, reviewList: updatedReviewList, reviews: newReviewsCount, rating: parseFloat(newRating) };
        setSelectedShopForReviews(updatedShop);
        return updatedShop;
      }
      return shop;
    });

    setShops(updatedShops);
    alert("ขอบคุณสำหรับรีวิวครับ ระบบได้บันทึกข้อมูลแล้ว");
    setIsWriteReviewOpen(false);
    setRating(5);
  };

  return (
    <div className="bg-base text-text-base antialiased min-h-screen flex flex-col transition-colors duration-300">
      
      {/* ================= MODALS ================= */}
      {/* 🟢 Modal: แนะนำร้านใหม่ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-[420px] rounded-2xl shadow-2xl border border-border-card overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center border-b border-border-card/50">
              <h3 className="font-bold text-lg flex items-center gap-2"><span className="text-xl">✨</span> แนะนำร้านอาหารใหม่</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="material-symbols-outlined text-text-base opacity-60 hover:opacity-100 transition-opacity">close</button>
            </div>
            <form onSubmit={handleAddNewShop} className="p-6 space-y-5 max-h-[85vh] overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-bold mb-2">อัปโหลดรูปภาพร้าน (PNG, JPEG)</label>
                <div className="border border-dashed border-border-card rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-base/30 hover:bg-base/50 transition-colors">
                  <span className="material-symbols-outlined text-3xl opacity-40">image</span>
                  <input required name="shopImage" type="file" accept=".png, .jpeg, .jpg" className="block w-full text-sm text-text-base opacity-80 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 file:cursor-pointer" />
                </div>
              </div>
              <div className="space-y-4">
                <input required name="shopName" className="w-full bg-base border border-border-card p-3.5 rounded-lg outline-none focus:border-primary transition-colors text-sm placeholder:opacity-50" placeholder="ชื่อร้าน" />
                <input required name="shopLocation" className="w-full bg-base border border-border-card p-3.5 rounded-lg outline-none focus:border-primary transition-colors text-sm placeholder:opacity-50" placeholder="พิกัด/โซน" />
                <div className="grid grid-cols-2 gap-4">
                  <input required name="shopPrice" className="w-full bg-base border border-border-card p-3.5 rounded-lg outline-none focus:border-primary transition-colors text-sm placeholder:opacity-50" placeholder="ราคา (เช่น 40-50฿)" />
                  <input required name="shopHours" className="w-full bg-base border border-border-card p-3.5 rounded-lg outline-none focus:border-primary transition-colors text-sm placeholder:opacity-50" placeholder="เวลา (เช่น 08:00-18:00)" />
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:brightness-90 transition shadow-lg mt-2">บันทึกข้อมูลร้าน</button>
            </form>
          </div>
        </div>
      )}

      {/* 🟢 Modal: อ่านรีวิว */}
      {selectedShopForReviews && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-xl border border-border-card flex flex-col max-h-[80vh]">
            <div className="p-5 border-b border-border-card flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xl">{selectedShopForReviews.name}</h3>
                <p className="text-xs opacity-70 mt-1">⭐ {selectedShopForReviews.rating} ({selectedShopForReviews.reviews} รีวิว)</p>
              </div>
              <button onClick={() => setSelectedShopForReviews(null)} className="material-symbols-outlined hover:text-red-500">close</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {selectedShopForReviews.reviewList.length > 0 ? (
                selectedShopForReviews.reviewList.map((rev, i) => (
                  <div key={i} className="bg-base p-4 rounded-xl border border-border-card">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-sm text-primary">{rev.user}</span>
                      <div className="flex text-yellow-500">{Array(rev.stars).fill().map((_, s) => <span key={s} className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}</div>
                    </div>
                    <p className="text-sm opacity-80">{rev.comment}</p>
                    <span className="text-[10px] opacity-40 mt-2 block">{rev.date}</span>
                  </div>
                ))
              ) : (<p className="text-center opacity-50 py-10">ยังไม่มีรีวิวสำหรับร้านนี้ เป็นคนแรกที่รีวิวสิ!</p>)}
            </div>
            <div className="p-4 border-t border-border-card">
              <button onClick={() => setIsWriteReviewOpen(true)} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:brightness-90 transition">✏️ เขียนรีวิวของคุณ</button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 Modal: เขียนรีวิว */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-sm rounded-2xl p-6 border border-border-card shadow-2xl">
            <h3 className="font-bold text-center mb-4 text-lg">ให้คะแนนร้านนี้</h3>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <button 
                  key={num} type="button" onClick={() => setRating(num)} 
                  className={`material-symbols-outlined text-4xl transition-colors ${rating >= num ? 'text-yellow-500' : 'text-border-card'}`}
                  style={{ fontVariationSettings: rating >= num ? "'FILL' 1" : "'FILL' 0" }}
                >star</button>
              ))}
            </div>
            <form onSubmit={handleSubmitReview}>
              <textarea name="comment" required className="w-full bg-base border border-border-card p-3 rounded-lg mb-4 text-sm outline-none focus:ring-2 focus:ring-primary" rows="4" placeholder="พิมพ์รีวิวของคุณที่นี่..."></textarea>
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsWriteReviewOpen(false)} className="flex-1 py-2 rounded-lg border border-border-card font-bold hover:bg-base">ยกเลิก</button>
                <button type="submit" className="flex-1 py-2 rounded-lg bg-primary text-white font-bold hover:brightness-90">ส่งรีวิว</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ================= END MODALS ================= */}

      {/* --- ส่วนดีไซน์หลัก --- */}
      <section className="relative w-full">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-6">
          <div
            className="rounded-2xl overflow-hidden relative min-h-[320px] flex items-center justify-center text-center p-6 sm:p-12 shadow-sm"
            style={{
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGOBRw8LCKU_6ZojHXy-MrnJ_aj8cjjhUAtW4TgJONjhZ2ZQqVKv37oTeDkGkUX6LvFTVUTvQqoECBCa1t36CNc9uvxMXE1ecfh7VUmU8JAOGFWlHDEVR0YGsCb4-CdvmsTkKu3usHyh68AW5ZSfKIYjcErmdGMakIFbDQK7Nxqzef43G9NhgSpE_PYSY822c312s5Jw0OFuxnu8A5fWz--UmcoRxP5Jp_3P0TkGgGdHF5gAMTdVviBF5NMgcgm44wswA4laaIq7I')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/30">
                <span className="material-symbols-outlined text-[16px]">school</span> Survival Guide for Freshmen
              </span>
              
              <h1 className="!text-white dark:text-white text-3xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
                วันนี้กินอะไรดี? <br /> คิดไม่ออกบอก KMITL Eats
              </h1>
              <p className="text-gray-200 text-sm md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
                รวมร้านเด็ดรอบรั้ว สจล. โซนเกกี โรงอาหารพระเทพฯ และหอใน ค้นหาง่ายตามงบประมาณ พร้อมรีวิวจริงจากรุ่นพี่
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <button onClick={() => setIsAddModalOpen(true)} className="h-12 px-6 rounded-xl bg-green-600 hover:brightness-90 text-white text-base font-bold shadow-lg flex items-center gap-2 transition-transform active:scale-95">
                  <span className="material-symbols-outlined text-[20px]">add_circle</span> แนะนำร้านใหม่
                </button>
                <button className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-base font-bold flex items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">map</span> ดูแผนที่โซน
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-6 flex flex-col lg:flex-row gap-8">
        
        {/* 🟢 Sidebar (แผงตัวกรอง) */}
        <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
          <div className="bg-card rounded-xl p-5 shadow-sm border border-border-card sticky top-24 transition-colors duration-300">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)} className="text-lg font-bold flex items-center gap-2 text-text-base transition-colors duration-300">
                <span className="material-symbols-outlined text-primary">tune</span> ตัวกรองค้นหา
                <span className="material-symbols-outlined lg:hidden">{isMobileFilterOpen ? "expand_less" : "expand_more"}</span>
              </button>
              {/* ปุ่มล้างค่า */}
              <button onClick={clearFilters} className="text-xs text-text-base opacity-60 hover:opacity-100 hover:text-primary underline transition-colors duration-300">ล้างค่า</button>
            </div>
            
            <div className={`${isMobileFilterOpen ? "block" : "hidden"} lg:block`}>
              
              {/* 🟢 กรองงบประมาณ */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3 text-text-base transition-colors duration-300">งบประมาณ</p>
                <div className="flex flex-wrap gap-2">
                  {filters.budgets.map((budget, i) => (
                    <label key={i} className="cursor-pointer">
                      <input 
                        checked={activeBudget === budget} 
                        onChange={() => setActiveBudget(activeBudget === budget ? null : budget)} 
                        className="peer sr-only" type="checkbox" 
                      />
                      <div className="px-3 py-1.5 rounded-lg bg-base text-sm font-medium text-text-base opacity-70 peer-checked:opacity-100 peer-checked:bg-primary peer-checked:text-white transition-colors duration-300 shadow-sm border border-border-card peer-checked:border-primary">
                        {budget}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 🟢 กรองสถานะ */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3 text-text-base transition-colors duration-300">สถานะร้าน</p>
                <div className="flex flex-col gap-3">
                  {filters.status.map((item, i) => {
                    const isChecked = item.id === "open" ? statusFilter.openNow : statusFilter.lateNight;
                    return (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input 
                            checked={isChecked} 
                            onChange={(e) => setStatusFilter(prev => ({ ...prev, [item.id === "open" ? "openNow" : "lateNight"]: e.target.checked }))} 
                            className="peer sr-only" type="checkbox" 
                          />
                          <div className="w-10 h-6 bg-border-card rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors duration-300"></div>
                        </div>
                        <span className="text-sm text-text-base opacity-70 group-hover:opacity-100 group-hover:text-primary transition-colors flex items-center gap-1">
                          {item.label} {item.icon && <span className="material-symbols-outlined text-sm text-indigo-500">{item.icon}</span>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 🟢 กรองโซน */}
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3 text-text-base transition-colors duration-300">โซนที่ตั้ง</p>
                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                  {filters.zones.map((zone, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        checked={activeZones.includes(zone)} 
                        onChange={(e) => {
                          if (e.target.checked) setActiveZones(prev => [...prev, zone]);
                          else setActiveZones(prev => prev.filter(z => z !== zone));
                        }}
                        className="rounded border-border-card text-primary focus:ring-primary h-4 w-4 cursor-pointer" type="checkbox" 
                      />
                      <span className="text-sm text-text-base opacity-80 group-hover:opacity-100 transition-colors duration-300">{zone}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </aside>

        {/* 🟢 ส่วนแสดงรายการร้านอาหาร */}
        <section className="flex-1">
          <div className="mb-6 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 opacity-50">search</span>
            <input
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาร้านอาหาร, โซน..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border-card rounded-xl text-text-base shadow-sm focus:ring-2 focus:ring-primary outline-none transition-colors duration-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-text-base transition-colors duration-300">ร้านอาหารแนะนำ 🍱</h2>
              <p className="text-sm text-text-base opacity-60 transition-colors duration-300">ค้นพบ {filteredShops.length} ร้านค้าที่ตรงกับตัวกรองของคุณ</p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-end">
              <div className="flex gap-1 bg-base p-1 rounded-lg border border-border-card transition-colors duration-300">
                <button onClick={() => setViewMode("grid")} className={`rounded-md p-1.5 transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary shadow-sm" : "text-text-base hover:bg-card opacity-50 hover:opacity-100"}`}>
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: viewMode === "grid" ? "'FILL' 1" : "'FILL' 0" }}>grid_view</span>
                </button>
                <button onClick={() => setViewMode("list")} className={`rounded-md p-1.5 transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary shadow-sm" : "text-text-base hover:bg-card opacity-50 hover:opacity-100"}`}>
                  <span className="material-symbols-outlined text-[20px]">list</span>
                </button>
              </div>

              {/* 🟢 ตัวเลือกการเรียงลำดับ */}
              <span className="text-sm text-text-base opacity-60 hidden sm:block transition-colors duration-300">เรียงตาม:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card border border-border-card text-sm font-bold rounded-lg py-2.5 pl-3 pr-8 focus:ring-1 focus:ring-primary shadow-sm text-text-base outline-none transition-colors duration-300 cursor-pointer"
              >
                <option value="recommended">แนะนำ (Recommended)</option>
                <option value="rating">เรตติ้งสูงสุด</option>
                <option value="price">ราคาถูกที่สุด</option>
              </select>
            </div>
          </div>

          {filteredShops.length > 0 ? (
            <>
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"}`}>
                {displayedShops.map((shop) => (
                  <div key={shop.id} className={`group bg-card rounded-xl overflow-hidden border border-border-card hover:shadow-lg transition-all duration-300 flex ${viewMode === "list" ? "flex-row min-h-[160px]" : "flex-col h-full"} ${shop.isClosed ? "opacity-70 hover:opacity-100" : ""}`}>
                    
                    <div className={`relative overflow-hidden shrink-0 ${viewMode === "list" ? "w-[40%] sm:w-1/3" : "h-48 w-full"} ${shop.isClosed ? "grayscale group-hover:grayscale-0 transition-all" : ""}`}>
                      <img alt={shop.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-80" src={shop.img} />
                      {shop.isClosed && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="px-3 py-1 bg-gray-800 text-white text-xs font-bold rounded-full">ปิดแล้ว</span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-card/90 backdrop-blur px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold shadow-sm text-text-base transition-colors duration-300">
                        <span className="material-symbols-outlined text-yellow-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {shop.rating}
                      </div>
                      {shop.badge && viewMode === "grid" && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">{shop.badge}</div>
                      )}
                      {shop.night && viewMode === "grid" && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <span className="inline-flex items-center gap-1 text-xs text-indigo-300 font-medium">
                            <span className="material-symbols-outlined text-sm">nightlight</span> {shop.night}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-bold text-base sm:text-lg text-text-base line-clamp-1 transition-colors duration-300">{shop.name}</h3>
                        {shop.badge && viewMode === "list" && (
                          <span className="bg-green-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0">{shop.badge}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm mb-3 flex items-center gap-1 transition-colors duration-300">
                        <span className="material-symbols-outlined text-[14px] text-red-500 drop-shadow-sm shrink-0">location_on</span> 
                        <span className="text-text-base opacity-80 line-clamp-1">{shop.location}</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {shop.tags.map((tag, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-base text-text-base opacity-80 transition-colors duration-300 whitespace-nowrap">{tag}</span>
                        ))}
                      </div>

                      <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border-card transition-colors duration-300">
                        <div className="flex items-center gap-1.5 opacity-80">
                          <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                          <span className="text-[10px] sm:text-xs font-medium text-text-base transition-colors duration-300">{shop.openTime}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm font-bold text-primary whitespace-nowrap">{shop.price}</span>
                          <button onClick={() => setSelectedShopForReviews(shop)} className="text-[10px] sm:text-xs text-text-base opacity-60 hover:opacity-100 font-bold hover:text-primary transition-colors cursor-pointer whitespace-nowrap">
                            ({shop.reviews} รีวิว)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < filteredShops.length && (
                <div className="mt-10 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="flex items-center gap-2 rounded-full border border-border-card bg-card px-6 py-3 text-sm font-bold text-text-base shadow-sm hover:bg-base hover:text-primary transition-all duration-300 group"
                  >
                    <span className="material-symbols-outlined transition-transform duration-300 group-hover:animate-spin">sync</span>
                    โหลดเพิ่มเติม ({filteredShops.length - visibleCount} ร้าน)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-dashed border-border-card text-text-base transition-colors duration-300">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-20">restaurant_menu</span>
              <p className="opacity-60">ไม่พบร้านอาหารที่ตรงกับการค้นหา</p>
            </div>
          )}

        </section>
      </main>
    </div>
  );
};

export default FoodSection; 