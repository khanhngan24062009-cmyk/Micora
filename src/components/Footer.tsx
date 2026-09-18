import React from 'react';
import { PageTab } from '../types';
import { Eye, Shield, HeartHandshake, AlertCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-12 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500 text-slate-950 font-bold">
                <Eye className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white font-display">Micora</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Hệ thống hỗ trợ nhận diện hiện tượng Microsleep thông qua phân tích biểu hiện khuôn mặt thời gian thực và thông tin giấc ngủ, giúp nâng cao sự an toàn trong học tập, lao động và điều khiển phương tiện.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium pt-1">
              <Shield className="w-4 h-4" />
              <span>Bảo vệ quyền riêng tư: Xử lý video cục bộ 100% trên trình duyệt của bạn</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-300 font-bold mb-4 font-display">
              Điều hướng
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Trang chủ & Tổng quan
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('detector')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Camera nhận diện & Cảnh báo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('statistics')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Thực trạng Microsleep
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Nhóm nghiên cứu & Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Standards & Guidelines */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-slate-300 font-bold mb-4 font-display">
              Chỉ số & Công nghệ
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>Chỉ số mắt nhắm PERCLOS</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>Ngưỡng cảnh báo ngủ gật: 2.0 giây</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>Cơ chế Cooldown âm thanh: 10 giây</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                <span>Tổng hợp mô hình 3 cấp độ cảnh báo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="my-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-amber-300">Tuyên bố miễn trừ trách nhiệm y khoa:</span> Hệ thống chỉ hỗ trợ nhận diện các dấu hiệu liên quan đến Microsleep và trạng thái buồn ngủ/ngủ gật. Kết quả không phải là chẩn đoán y khoa và không thay thế cho đánh giá chuyên môn của bác sĩ hoặc chuyên gia thần kinh học/giấc ngủ.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-2">
          <p>© {new Date().getFullYear()} Micora Project. Bản quyền thuộc về Nhóm Nghiên cứu Tương tác & Trí tuệ Nhân tạo.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Xây dựng vì sức khỏe & an toàn cộng đồng</span>
            <HeartHandshake className="w-3.5 h-3.5 text-teal-400 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
