import React, { useState } from 'react';
import { PageTab } from '../types';
import { 
  Eye, 
  Video, 
  Brain, 
  Heart, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Sparkles,
  Play,
  Moon,
  Zap,
  Volume2
} from 'lucide-react';
import { playTestChime } from '../utils/audio';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab }) => {
  const [activeIntervalDemo, setActiveIntervalDemo] = useState<'blink' | 'prolonged' | 'microsleep'>('microsleep');

  return (
    <div className="space-y-20 py-8 sm:py-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-800/80 via-slate-900 to-slate-950 border border-slate-700/60 p-6 sm:p-12 lg:p-16 shadow-2xl">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          
          {/* Tag badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Đề tài Nghiên cứu Công nghệ Nhận diện Microsleep</span>
          </div>

          {/* Slogan */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-display leading-tight sm:leading-tight">
            Nhận diện những khoảnh khắc <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
              tỉnh thức đang dần vụt tắt.
            </span>
          </h1>

          {/* Intro text as specified */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Microsleep có thể xuất hiện chỉ trong vài giây, âm thầm làm gián đoạn sự tỉnh táo mà đôi khi chính chúng ta cũng không nhận ra. Website được xây dựng nhằm hỗ trợ nhận diện những dấu hiệu liên quan đến microsleep, kết hợp với thông tin về giấc ngủ và thói quen sinh hoạt để giúp bạn hiểu rõ hơn về trạng thái tỉnh táo của mình và chủ động phòng ngừa những rủi ro không đáng có.
          </p>

          {/* CTA Group */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('detector')}
              id="hero-start-check-btn"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-base shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Video className="w-5 h-5 stroke-[2.2]" />
              <span>Bắt đầu kiểm tra tỉnh táo</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('statistics')}
              id="hero-view-stats-btn"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all"
            >
              <Activity className="w-4 h-4 text-teal-400" />
              <span>Xem số liệu khảo sát</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80 text-left">
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Không lưu trữ video máy chủ</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Clock className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Cảnh báo nhắm mắt ≥ 2s</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Zap className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Chuẩn phân tích PERCLOS</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Heart className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Kết hợp khảo sát giấc ngủ</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Microsleep là gì? */}
      <section className="max-w-5xl mx-auto space-y-8" id="section-definition">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold">
            <Moon className="w-3.5 h-3.5" />
            <span>Kiến thức nền tảng</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
            💤 Microsleep là gì?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Khái niệm khoa học về giấc ngủ vi mô và cơ chế kích hoạt ngoài ý muốn của não bộ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Definition Main Card */}
          <div className="md:col-span-7 rounded-2xl bg-slate-800/50 border border-slate-700/60 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Định nghĩa y khoa & sinh học</h3>
              <p className="text-slate-300 text-base leading-relaxed">
                <strong className="text-teal-300 font-semibold">Microsleep (giấc ngủ vi mô)</strong> là những đợt ngủ rất ngắn, thường chỉ kéo dài vài giây, xảy ra ngoài ý muốn trong lúc con người vẫn đang cố gắng duy trì trạng thái thức.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Hiện tượng này có thể đi kèm với <span className="text-white font-medium">nhắm mắt, giảm khả năng đáp ứng</span> và <span className="text-white font-medium">suy giảm tạm thời khả năng xử lý thông tin</span> của võ não.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
              <span>Thời gian diễn ra: <strong>0.5s – 15s</strong></span>
              <span>Ý thức: <strong>Bị gián đoạn tạm thời</strong></span>
            </div>
          </div>

          {/* Interactive Interval Simulator */}
          <div className="md:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mô phỏng chuỗi thời gian</span>
                <button
                  onClick={() => playTestChime()}
                  className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1"
                  title="Thử âm thanh cảnh báo"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Thử chuông</span>
                </button>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-800/80 mb-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveIntervalDemo('blink')}
                  className={`py-2 px-1 rounded-lg transition-colors ${
                    activeIntervalDemo === 'blink'
                      ? 'bg-slate-700 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  0.2 – 0.5s
                </button>
                <button
                  onClick={() => setActiveIntervalDemo('prolonged')}
                  className={`py-2 px-1 rounded-lg transition-colors ${
                    activeIntervalDemo === 'prolonged'
                      ? 'bg-amber-500/20 text-amber-300 shadow-sm border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  0.5 – 1.9s
                </button>
                <button
                  onClick={() => setActiveIntervalDemo('microsleep')}
                  className={`py-2 px-1 rounded-lg transition-colors ${
                    activeIntervalDemo === 'microsleep'
                      ? 'bg-rose-500/20 text-rose-300 shadow-sm border border-rose-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ≥ 2.0s
                </button>
              </div>

              {/* Interval detail box */}
              {activeIntervalDemo === 'blink' && (
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-emerald-400 font-bold">
                    <span>Chớp mắt sinh lý bình thường</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[11px]">An toàn</span>
                  </div>
                  <p className="text-slate-300">
                    Mắt nhắm và mở lại gần như ngay lập tức để giữ ẩm giác mạc.
                  </p>
                  <p className="text-slate-400 font-medium">
                    Hệ thống: <strong>Không cảnh báo, hủy bộ đếm tức thì.</strong>
                  </p>
                </div>
              )}

              {activeIntervalDemo === 'prolonged' && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>Nhắm mắt kéo dài (Prolonged Closure)</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[11px]">Theo dõi</span>
                  </div>
                  <p className="text-slate-300">
                    Thời gian mi mắt khép chậm hơn bình thường. Dấu hiệu đầu tiên của mỏi cơ mi và suy giảm chú ý.
                  </p>
                  <p className="text-amber-300/90 font-medium">
                    Hệ thống: <strong>Kích hoạt bộ đếm thời gian, tích lũy chỉ số PERCLOS, chưa phát chuông.</strong>
                  </p>
                </div>
              )}

              {activeIntervalDemo === 'microsleep' && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-rose-400 font-bold">
                    <span>Dấu hiệu Microsleep / Ngủ gật</span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-[11px]">CẢNH BÁO</span>
                  </div>
                  <p className="text-slate-300">
                    Mắt duy trì trạng thái nhắm liên tục từ 2 giây trở lên. Nguy cơ mất kiểm soát hành vi nghiêm trọng.
                  </p>
                  <p className="text-rose-300 font-semibold">
                    Hệ thống: <strong>Phát âm thanh cảnh báo + Thông báo màn hình tức thời (có cooldown 10s).</strong>
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveTab('detector')}
              className="mt-4 w-full py-2.5 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/40 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trải nghiệm nhận diện thực tế trên Camera</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Microsleep ảnh hưởng đến chúng ta như thế nào? */}
      <section className="max-w-5xl mx-auto space-y-10" id="section-impact">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Tác động & Hệ quả</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
            Microsleep ảnh hưởng đến chúng ta như thế nào?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Một khoảnh khắc chợp mắt vô thức có thể dẫn đến những ảnh hưởng sâu sắc trên cả ba phương diện.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Học tập & làm việc */}
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700/60 p-6 sm:p-7 space-y-5 hover:border-teal-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Brain className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧠</span>
                <h3 className="text-lg font-bold text-white">Học tập & làm việc</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Những khoảng ngủ ngắn làm gián đoạn sự chú ý, giảm khả năng tiếp nhận và xử lý thông tin, từ đó dễ dẫn đến sai sót và giảm hiệu suất trong học tập cũng như công việc hàng ngày.
              </p>
            </div>
            <div className="pt-2 text-xs text-blue-300/80 bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
              Hậu quả: Gián đoạn dòng tư duy, giảm sút trí nhớ ngắn hạn và gia tăng tỷ lệ mắc lỗi xử lý.
            </div>
          </div>

          {/* Card 2: Sức khỏe */}
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700/60 p-6 sm:p-7 space-y-5 hover:border-teal-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">❤️</span>
                <h3 className="text-lg font-bold text-white">Sức khỏe sinh học</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Microsleep có thể là dấu hiệu của tình trạng thiếu ngủ hoặc buồn ngủ quá mức; nếu xuất hiện thường xuyên, đây là tín hiệu cho thấy cơ thể chưa được nghỉ ngơi đầy đủ.
              </p>
            </div>
            <div className="pt-2 text-xs text-rose-300/80 bg-rose-500/5 p-3 rounded-lg border border-rose-500/10">
              Tín hiệu: Rối loạn nhịp sinh học, suy nhược thần kinh và cảnh báo suy giảm hệ miễn dịch.
            </div>
          </div>

          {/* Card 3: An toàn */}
          <div className="rounded-2xl bg-slate-800/40 border border-slate-700/60 p-6 sm:p-7 space-y-5 hover:border-amber-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                <h3 className="text-lg font-bold text-white">An toàn tính mạng</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Chỉ vài giây mất tỉnh táo khi lái xe, vận hành máy móc hoặc thực hiện công việc đòi hỏi phản ứng nhanh cũng có thể khiến con người bỏ lỡ tín hiệu quan trọng và gia tăng nguy cơ xảy ra sự cố.
              </p>
            </div>
            <div className="pt-2 text-xs text-amber-300/80 bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">
              Rủi ro: Ở tốc độ 60 km/h, 2 giây nhắm mắt tương đương xe di chuyển 33 mét hoàn toàn mất kiểm soát.
            </div>
          </div>

        </div>
      </section>

      {/* HOW MICORA WORKS BANNER */}
      <section className="max-w-5xl mx-auto rounded-3xl bg-slate-800/30 border border-slate-700/60 p-8 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">Giải pháp của Micora</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Kết hợp thị giác máy tính và phân tích giấc ngủ
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Khác biệt với các ứng dụng đo lường thụ động, Micora tiếp cận đa chiều: theo dõi trạng thái mắt liên tục theo chuỗi thời gian (PERCLOS & phát hiện ngủ gật ≥ 2s) và kết hợp với khảo sát thói quen sinh hoạt để đưa ra khuyến nghị phòng ngừa chính xác nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setActiveTab('detector')}
                className="px-6 py-3 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm hover:bg-teal-400 transition-colors flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Bắt đầu kiểm tra ngay</span>
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <span>Liên hệ nhóm nghiên cứu</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-teal-400 font-bold text-sm">👁️ Trạng thái mắt</div>
              <p className="text-slate-400">Nhận diện mở, mở một phần, nhắm và nhắm kéo dài thời gian thực.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-cyan-400 font-bold text-sm">⏱️ Ngưỡng 2 Giây</div>
              <p className="text-slate-400">Âm thanh cảnh báo tự động khi phát hiện dấu hiệu ngủ gật liên tục.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-amber-400 font-bold text-sm">⏸️ Cooldown 10s</div>
              <p className="text-slate-400">Tránh chuông lặp lại gây khó chịu, duy trì khả năng cảnh giác cao.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-emerald-400 font-bold text-sm">📊 Đánh giá 3 mức</div>
              <p className="text-slate-400">Tổng hợp dữ liệu hình ảnh và biểu mẫu khách quan, rõ ràng.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
