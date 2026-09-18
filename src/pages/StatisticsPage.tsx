import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Moon, 
  Clock, 
  CheckCircle,
  FileSpreadsheet,
  HelpCircle,
  Car,
  Briefcase,
  GraduationCap,
  Factory
} from 'lucide-react';

export const StatisticsPage: React.FC = () => {
  const [selectedGroupMetric, setSelectedGroupMetric] = useState<'profession' | 'age' | 'sleepHours'>('profession');

  return (
    <div className="space-y-12 py-6 sm:py-10">
      
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Dữ liệu Điều tra Xã hội & Y tế Dự phòng</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Thực trạng Microsleep & Rối loạn Giấc ngủ
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
          Tổng hợp kết quả khảo sát quy mô cộng đồng về thói quen ngủ, mức độ buồn ngủ ban ngày và các episode giấc ngủ vi mô (Microsleep) ngoài ý muốn.
        </p>
      </div>

      {/* 1. Tổng quan khảo sát */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
          <Users className="w-5 h-5 text-teal-400" />
          <span>1. Tổng quan khảo sát cộng đồng</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium">Quy mô người tham gia</span>
            <div className="text-3xl font-extrabold text-white font-display">
              1,520 <span className="text-sm font-medium text-slate-400">người</span>
            </div>
            <p className="text-xs text-slate-400">
              Khảo sát trực tiếp và trực tuyến theo phương pháp ngẫu nhiên phân tầng.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium">Phạm vi khảo sát</span>
            <div className="text-xl font-bold text-teal-300 font-display">
              Toàn quốc (3 Miền)
            </div>
            <p className="text-xs text-slate-400">
              Miền Bắc: 38% | Miền Trung: 24% | Miền Nam: 38% (tập trung đô thị & tuyến giao thông).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 font-medium">Đối tượng khảo sát</span>
            <div className="text-xl font-bold text-cyan-300 font-display">
              4 Nhóm trọng điểm
            </div>
            <p className="text-xs text-slate-400">
              Tài xế lái xe, Học sinh - Sinh viên, Nhân viên văn phòng và Công nhân ca kíp.
            </p>
          </div>
        </div>

        {/* Group Distribution Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">24% (365 người)</div>
              <div className="text-slate-400">Tài xế đường dài / CN</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">32% (486 người)</div>
              <div className="text-slate-400">Học sinh & Sinh viên</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">26% (395 người)</div>
              <div className="text-slate-400">Nhân viên văn phòng</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center shrink-0">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">18% (274 người)</div>
              <div className="text-slate-400">Công nhân ca đêm</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Các số liệu nổi bật */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>2. Các số liệu nổi bật đáng báo động</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 space-y-2 relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-display">
              68.4%
            </div>
            <div className="text-sm font-bold text-white">Thường xuyên thiếu ngủ</div>
            <p className="text-xs text-slate-400">
              Ngủ dưới 7 giờ/ngày hoặc giấc ngủ ngắt quãng, không liên tục.
            </p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-teal-400 h-full rounded-full" style={{ width: '68.4%' }}></div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 space-y-2 relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-display">
              54.2%
            </div>
            <div className="text-sm font-bold text-white">Mệt mỏi ban ngày</div>
            <p className="text-xs text-slate-400">
              Cảm thấy uể oải, mất năng lượng trong giờ làm việc hoặc học tập.
            </p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: '54.2%' }}></div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 space-y-2 relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 font-display">
              42.8%
            </div>
            <div className="text-sm font-bold text-white">Từng trải qua Microsleep</div>
            <p className="text-xs text-slate-400">
              Từng bị chợp mắt vài giây vô thức và giật mình tỉnh dậy khi đang thức.
            </p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-rose-400 h-full rounded-full" style={{ width: '42.8%' }}></div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 space-y-2 relative overflow-hidden">
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-500 font-display">
              31.5%
            </div>
            <div className="text-sm font-bold text-white">Nguy cơ lái xe nguy hiểm</div>
            <p className="text-xs text-slate-400">
              Tài xế từng nhắm mắt thiếp đi ít nhất một lần khi xe đang lăn bánh!
            </p>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: '31.5%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Biểu đồ thống kê chi tiết */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>3. Biểu đồ thống kê phân tích đa biến</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Phân bố thời lượng ngủ (Cột) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Phân bố thời lượng giấc ngủ trung bình
                </h3>
                <p className="text-xs text-slate-400">Số giờ ngủ thực tế mỗi đêm của các đối tượng</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-teal-300">
                N = 1,520
              </span>
            </div>

            {/* SVG Bar Chart */}
            <div className="space-y-4 pt-2">
              {[
                { label: 'Dưới 5 giờ/đêm (Thiếu ngủ nặng)', percent: 19.2, color: 'bg-rose-500', count: '292 người' },
                { label: '5 – 6 giờ/đêm (Thiếu ngủ nhẹ)', percent: 46.8, color: 'bg-amber-500', count: '711 người' },
                { label: '7 – 8 giờ/đêm (Chuẩn khuyến nghị)', percent: 30.1, color: 'bg-teal-500', count: '458 người' },
                { label: 'Trên 8 giờ/đêm (Ngủ nhiều)', percent: 3.9, color: 'bg-blue-500', count: '59 người' },
              ].map(item => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <span className="text-white font-bold">{item.percent}% ({item.count})</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 text-xs text-slate-400 flex items-center justify-between">
              <span>Độ lệch chuẩn: <strong>± 1.2 giờ</strong></span>
              <span>Thời lượng ngủ trung bình: <strong>6.1 giờ/đêm</strong></span>
            </div>
          </div>

          {/* Chart 2: Tỷ lệ Microsleep theo nhóm đối tượng (Cột so sánh) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  Tỷ lệ từng gặp Microsleep theo nghề nghiệp
                </h3>
                <p className="text-xs text-slate-400">Tỷ lệ phần trăm người từng ngủ gật ngoài ý muốn</p>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-rose-300">
                So sánh nhóm
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {[
                { group: 'Tài xế đường dài / xe công nghệ', rate: 62.4, color: 'bg-rose-500', note: 'Nguy cơ cao nhất' },
                { group: 'Công nhân ca đêm / tăng ca', rate: 56.1, color: 'bg-rose-400', note: 'Rối loạn nhịp sinh học' },
                { group: 'Học sinh & Sinh viên', rate: 43.8, color: 'bg-amber-400', note: 'Thức khuya dùng thiết bị' },
                { group: 'Nhân viên văn phòng', rate: 32.5, color: 'bg-teal-400', note: 'Áp lực màn hình máy tính' },
              ].map(item => (
                <div key={item.group} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <span>{item.group}</span>
                      <span className="text-[10px] text-slate-500">({item.note})</span>
                    </span>
                    <span className="text-white font-bold">{item.rate}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                      style={{ width: `${item.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
              ⚠️ <strong>Cảnh báo an toàn:</strong> Hơn 6/10 tài xế từng trải qua hiện tượng mất nhận thức chớp nhoáng, tiềm ẩn nguy cơ tai nạn giao thông cực kỳ nghiêm trọng.
            </div>
          </div>

        </div>

        {/* Donut & Factor Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Donut: Tự đánh giá chất lượng giấc ngủ */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Chất lượng giấc ngủ gần đây</h3>
              <p className="text-xs text-slate-400">Đánh giá cảm nhận chủ quan của người tham gia</p>
            </div>

            <div className="flex items-center justify-center py-4">
              <div className="relative w-40 h-40">
                {/* SVG Donut Chart */}
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {/* Background track */}
                  <path
                    className="text-slate-800"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Kém / Rất kém 46% */}
                  <path
                    className="text-rose-500"
                    strokeDasharray="46, 100"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Bình thường 34% (offset 46) */}
                  <path
                    className="text-amber-400"
                    strokeDasharray="34, 100"
                    strokeDashoffset="-46"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Tốt / Rất tốt 20% (offset 80) */}
                  <path
                    className="text-teal-400"
                    strokeDasharray="20, 100"
                    strokeDashoffset="-80"
                    strokeWidth="3.8"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-extrabold text-white font-display">46%</span>
                  <span className="text-[10px] text-rose-300 font-medium">Kém & Rất kém</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                <span className="text-rose-400 font-bold block">46%</span>
                <span className="text-slate-400 text-[11px]">Kém/Rất kém</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-400 font-bold block">34%</span>
                <span className="text-slate-400 text-[11px]">Bình thường</span>
              </div>
              <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                <span className="text-teal-400 font-bold block">20%</span>
                <span className="text-slate-400 text-[11px]">Tốt/Rất tốt</span>
              </div>
            </div>
          </div>

          {/* Causes Breakdown */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">
              Nguyên nhân chính dẫn đến suy giảm tỉnh táo & Microsleep
            </h3>
            <p className="text-xs text-slate-400">Tỷ lệ người gặp phải các yếu tố kích hoạt buồn ngủ ngoài ý muốn</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Dùng smartphone trước khi ngủ</span>
                  <span className="text-teal-300">81.2%</span>
                </div>
                <p className="text-[11px] text-slate-400">Ánh sáng xanh ức chế tiết hormone Melatonin gây khó vào giấc.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Lịch trình làm việc & học tập quá tải</span>
                  <span className="text-amber-300">64.5%</span>
                </div>
                <p className="text-[11px] text-slate-400">Áp lực deadline, làm thêm giờ, thời gian ngủ bị cắt ngắn.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Lịch sinh hoạt thất thường / Ca kíp</span>
                  <span className="text-rose-300">48.3%</span>
                </div>
                <p className="text-[11px] text-slate-400">Đảo lộn đồng hồ sinh học cơ thể tự nhiên.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <div className="flex justify-between text-xs font-bold text-white">
                  <span>Thiếu nghỉ ngơi giữa giờ làm việc</span>
                  <span className="text-cyan-300">52.7%</span>
                </div>
                <p className="text-[11px] text-slate-400">Ngồi làm việc liên tục trên 3 tiếng không đổi tư thế hoặc vận động.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Nhận xét thực trạng & Ý nghĩa khoa học */}
      <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-white font-display flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-teal-400" />
          <span>4. Nhận xét thực trạng & Sự cần thiết của việc nhận diện, phòng ngừa</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300 leading-relaxed">
          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <span className="text-teal-400">●</span> Thực trạng đáng lo ngại
            </h4>
            <p className="text-xs text-slate-300">
              Số liệu khảo sát cho thấy tình trạng thiếu ngủ và buồn ngủ quá mức không còn là vấn đề cá nhân mà đã trở thành nguy cơ cộng đồng phổ biến. Đặc biệt với tỷ lệ 42.8% từng gặp Microsleep, phần lớn đối tượng hoàn toàn không thể kiểm soát được thời điểm não bộ tự động tắt trạng thái thức.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <span className="text-amber-400">●</span> Cơ chế sinh học bất khả kháng
            </h4>
            <p className="text-xs text-slate-300">
              Microsleep là phản xạ bảo vệ cuối cùng của cơ thể khi lượng chất Adenosine trong não tích tụ quá cao. Con người không thể dùng ý chí để vượt qua cơn kiệt sức sinh học mà chỉ có thể chủ động nhận diện sớm các chỉ báo như mắt khép chậm, nhắm kéo dài để dừng lại nghỉ ngơi.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <span className="text-rose-400">●</span> Ý nghĩa của công nghệ Micora
            </h4>
            <p className="text-xs text-slate-300">
              Việc ứng dụng camera thị giác máy tính phát hiện mắt nhắm ≥ 2s kèm âm thanh báo động và tính toán chỉ số PERCLOS mang lại lá chắn bảo vệ tự động, hỗ trợ giảm thiểu tối đa tai nạn đáng tiếc cho người lao động và người tham gia giao thông.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
