'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Search, MapPin, TrendingDown, Filter, X } from 'lucide-react'

export default function EquipmentDashboard() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000000000 })
  const [loading, setLoading] = useState(false)

  // Mock data - معادل Divar + سایر منابع
  const mockDatabase = [
    {
      id: 1,
      title: 'بولدوزر Caterpillar D8N',
      model: 'CAT D8N',
      year: 2015,
      condition: 'خوب',
      price: 4500000000,
      source: 'divar',
      location: 'تهران، اسلامشهر',
      image: '🚜',
      seller: 'Veiseh Showroom',
      views: 342,
      date: '2 روز پیش'
    },
    {
      id: 2,
      title: 'لودر چرخی Doosan DL500',
      model: 'Doosan DL500',
      year: 2018,
      condition: 'فوق‌العاده',
      price: 2800000000,
      source: 'divar',
      location: 'تهران، چهاردانگه',
      image: '🔧',
      seller: 'نمایشگاه ویژه',
      views: 156,
      date: '1 روز پیش'
    },
    {
      id: 3,
      title: 'خودروی سنگین Volvo FH16 750',
      model: 'Volvo FH16',
      year: 2017,
      condition: 'خوب',
      price: 1200000000,
      source: 'sheypoor',
      location: 'تهران',
      image: '🚛',
      seller: 'فروشنده خصوصی',
      views: 89,
      date: '3 روز پیش'
    },
    {
      id: 4,
      title: 'حفار Komatsu PC220LC',
      model: 'Komatsu PC220',
      year: 2019,
      condition: 'عالی',
      price: 3200000000,
      source: 'divar',
      location: 'تهران، اسلامشهر',
      image: '⚙️',
      seller: 'Veiseh Showroom',
      views: 267,
      date: '4 ساعت پیش'
    },
    {
      id: 5,
      title: 'بیل مکانیکی Hyundai R220LC',
      model: 'Hyundai R220',
      year: 2016,
      condition: 'خوب',
      price: 2100000000,
      source: 'divar',
      location: 'تهران، شمیرانات',
      image: '🏗️',
      seller: 'تاجر تجهیزات',
      views: 203,
      date: '5 روز پیش'
    },
    {
      id: 6,
      title: 'لودر چرخی CAT 988H',
      model: 'CAT 988H',
      year: 2014,
      condition: 'نیاز به تعمیر',
      price: 1800000000,
      source: 'sheypoor',
      location: 'تهران، ری',
      image: '🚜',
      seller: 'فروش صادرات',
      views: 124,
      date: '1 هفته پیش'
    },
    {
      id: 7,
      title: 'ماشین سنگین Scania R580',
      model: 'Scania R580',
      year: 2020,
      condition: 'فوق‌العاده',
      price: 1500000000,
      source: 'divar',
      location: 'تهران',
      image: '🚛',
      seller: 'نمایشگاه بین‌المللی',
      views: 412,
      date: 'امروز'
    },
    {
      id: 8,
      title: 'تراکتور تاور LiuGong 956',
      model: 'LiuGong 956',
      year: 2018,
      condition: 'خوب',
      price: 1900000000,
      source: 'divar',
      location: 'تهران، اسلامشهر',
      image: '🚜',
      seller: 'Veiseh Showroom',
      views: 178,
      date: '6 ساعت پیش'
    }
  ]

  // جستجو
  const handleSearch = () => {
    setLoading(true)
    setTimeout(() => {
      const filtered = mockDatabase.filter(item => {
        const matchesQuery = query === '' || 
          item.title.includes(query) || 
          item.model.includes(query) ||
          item.seller.includes(query)
        
        const matchesPrice = item.price >= priceFilter.min && 
                            item.price <= priceFilter.max
        
        return matchesQuery && matchesPrice
      })
      
      setResults(filtered.sort((a, b) => b.views - a.views))
      setLoading(false)
    }, 300)
  }

  // Auto-search
  useEffect(() => {
    handleSearch()
  }, [priceFilter])

  // Toggle Favorite
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const displayData = showFavorites 
    ? results.filter(item => favorites.includes(item.id))
    : results

  const formatPrice = (price: number) => {
    if (price >= 1000000000) return `${(price / 1000000000).toFixed(1)}B`
    if (price >= 1000000) return `${(price / 1000000).toFixed(0)}M`
    return `${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDE6D6] via-[#F5F0EA] to-[#EDE6D6]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-[#1A2F5A] to-[#2A4070] shadow-xl">
        <div className="px-4 py-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🐺</span>
            <h1 className="text-white font-bold text-lg">Veiseh Finder</h1>
          </div>
          <p className="text-[#D4AF37] text-xs font-light">جایی که اعتماد ریشه می‌زند</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-[#1A2F5A] px-4 py-4 border-b-2 border-[#D4AF37]">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center bg-white rounded-lg px-3 py-2 shadow-md">
            <Search size={18} className="text-[#1A2F5A] mr-2" />
            <input
              type="text"
              placeholder="دستگاه، برند، مدل..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 outline-none text-sm text-right text-gray-800 placeholder-gray-400"
              dir="rtl"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-[#D4AF37] text-[#1A2F5A] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#E5C158] transition shadow-md"
          >
            جستجو
          </button>
        </div>

        {/* Price Filter */}
        <div className="bg-[#2A4070] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-[#D4AF37]" />
            <span className="text-white text-xs font-bold">بازه قیمتی</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000000000"
            value={priceFilter.max}
            onChange={(e) => setPriceFilter({...priceFilter, max: Number(e.target.value)})}
            className="w-full h-2 bg-[#1A2F5A] rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${(priceFilter.max / 5000000000) * 100}%, #1A2F5A ${(priceFilter.max / 5000000000) * 100}%, #1A2F5A 100%)`
            }}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-[#D4AF37] text-xs font-bold">
              تا {formatPrice(priceFilter.max)}
            </span>
            <span className="text-gray-300 text-xs">
              {results.length} نتیجه
            </span>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-4 py-3 flex gap-2 bg-white border-b border-gray-200">
        <button
          onClick={() => setShowFavorites(false)}
          className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition ${
            !showFavorites 
              ? 'bg-[#1A2F5A] text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          همه آگهی‌ها
        </button>
        <button
          onClick={() => setShowFavorites(true)}
          className={`flex-1 py-2 px-3 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${
            showFavorites 
              ? 'bg-[#D4AF37] text-[#1A2F5A]' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Heart size={16} fill={showFavorites ? 'currentColor' : 'none'} />
          علاقه‌مندی‌ها ({favorites.length})
        </button>
      </div>

      {/* Results */}
      <div className="px-4 py-4 pb-10">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-3 text-sm">در حال جستجو...</p>
          </div>
        ) : displayData.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-600 font-bold">هیچ نتیجه‌ای پیدا نشد</p>
            <p className="text-gray-500 text-sm mt-1">جستجو را تغییر دهید</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayData.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#D4AF37] overflow-hidden"
              >
                {/* Card Content */}
                <div className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{item.image}</span>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm text-[#1A2F5A]">{item.title}</h3>
                          <p className="text-xs text-gray-500">{item.model} • {item.year}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Heart
                        size={20}
                        className={favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                      />
                    </button>
                  </div>

                  {/* Price & Status */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gradient-to-r from-[#1A2F5A] to-[#2A4070] rounded-lg p-2">
                      <p className="text-[#D4AF37] font-bold text-lg">{formatPrice(item.price)}</p>
                      <p className="text-white text-xs">قیمت</p>
                    </div>
                    <div className={`rounded-lg p-2 ${
                      item.condition === 'عالی' ? 'bg-green-100' :
                      item.condition === 'فوق‌العاده' ? 'bg-blue-100' :
                      item.condition === 'خوب' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <p className={`font-bold text-xs ${
                        item.condition === 'عالی' ? 'text-green-700' :
                        item.condition === 'فوق‌العاده' ? 'text-blue-700' :
                        item.condition === 'خوب' ? 'text-yellow-700' : 'text-red-700'
                      }`}>
                        {item.condition}
                      </p>
                      <p className="text-gray-600 text-xs">وضعیت</p>
                    </div>
                  </div>

                  {/* Location & Source */}
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
                    <div className="flex items-center gap-1 text-gray-600 text-xs">
                      <MapPin size={14} />
                      {item.location}
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      item.source === 'divar' 
                        ? 'bg-blue-100 text-blue-700'
                        : item.source === 'sheypoor'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-pink-100 text-pink-700'
                    }`}>
                      {item.source === 'divar' ? '📱 دیوار' : item.source === 'sheypoor' ? '🛒 شیپور' : '📸 اینستاگرام'}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{item.seller}</span>
                    <span>👁️ {item.views} بازدید • {item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 text-center">
        <p className="text-xs text-gray-600">
          🐺 <strong>Veiseh Showroom</strong> • اسلامشهر، بزرگراه آیت‌الله سعیدی
        </p>
      </div>
    </div>
  )
}
