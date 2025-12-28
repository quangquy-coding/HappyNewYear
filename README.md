# 🐎 Nexus 2026 - Trang Đón Tết Bính Ngọ

Ứng dụng web chúc Tết năm mới 2026 với AI tích hợp, hiệu ứng pháo hoa và đếm ngược thời gian.

## ✨ Tính năng

- 🎆 **Hiệu ứng pháo hoa** tương tác
- ⏰ **Đếm ngược** đến năm mới 2026
- 🤖 **AI tạo lời chúc** sử dụng Google Gemini
- 🐎 **Chủ đề năm Bính Ngọ** với linh vật ngựa
- 📱 **Responsive design** cho mọi thiết bị

## 🚀 Cài đặt

```bash
# Clone dự án
git clone <repository-url>
cd copy-of-nexus-2026_-new-year-vision

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## 🔧 Cấu hình

Tạo file `.env.local` và thêm API key của Google Gemini:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 📦 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview build

## 🛠️ Công nghệ sử dụng

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Google Gemini AI** - Tạo lời chúc
- **Lucide React** - Icons
- **Tailwind CSS** - Styling

## 📁 Cấu trúc dự án

```
├── components/
│   ├── AIWishGenerator.tsx    # Component tạo lời chúc AI
│   ├── CountdownTimer.tsx     # Đếm ngược thời gian
│   ├── FireworkCanvas.tsx     # Hiệu ứng pháo hoa
│   └── NewYearGallery.tsx     # Gallery hình ảnh
├── services/
│   └── gemini.ts             # Service tích hợp Gemini AI
├── App.tsx                   # Component chính
├── types.ts                  # Type definitions
└── vite.config.ts           # Vite configuration
```

## 🎨 Giao diện

- Nền tối với gradient màu cam/đỏ
- Hiệu ứng pháo hoa động
- Typography hiện đại với font chữ đậm
- Responsive design cho mobile và desktop

## 📄 License

Private project - All rights reserved