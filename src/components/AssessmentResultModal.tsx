import React, { useEffect } from 'react';
import { AssessmentResult } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  ShieldAlert, 
  Clock, 
  Eye, 
  FileText, 
  Share2, 
  RefreshCw, 
  X,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentResultModalProps {
  result: AssessmentResult;
  onClose: () => void;
  onRetest: () => void;
}

export const AssessmentResultModal: React.FC<AssessmentResultModalProps> = ({
  result,
  onClose,
  onRetest,
}) => {
  useEffect(() => {
    if (result.level === 'level_1') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [result.level]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        
        {/* Header Ribbon */}
        <div className={`p-6 sm:p-8 border-b ${
          result.level === 'level_1' ? 'bg-emerald-950/40 border-emerald-500/30' :
          result.level === 'level_2' ? 'bg-amber-950/40 border-amber-500/30' :
          'bg-rose-950/50 border-rose-500/40'
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                result.level === 'level_1' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                result.level === 'level_2' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                'bg-rose-500/20 text-rose-400 border-rose-500/40'
              }`}>
                {result.level === 'level_1' && <CheckCircle2 className="w-8 h-8" />}
                {result.level === 'level_2' && <AlertTriangle className="w-8 h-8" />}
                {result.level === 'level_3' && <AlertOctagon className="w-8 h-8" />}
              </div>

              <div>
                <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-1.5 ${result.badgeColor}`}>
                  {result.levelTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Đánh giá Dấu hiệu Tỉnh táo & Microsleep
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Đóng kết quả"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main Statement Box */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Kết luận từ hệ thống
            </div>
            <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
              “{result.message}”
            </p>
          </div>

          {/* Actionable Recommendations */}
          <div className={`p-5 rounded-2xl border space-y-2 ${
            result.level === 'level_1' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-100' :
            result.level === 'level_2' ? 'bg-amber-500/10 border-amber-500/20 text-amber-100' :
            'bg-rose-500/10 border-rose-500/20 text-rose-100'
          }`}>
            <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>💡 Khuyến nghị hành động phù hợp</span>
            </div>
            <p className="text-sm font-medium leading-relaxed">
              {result.recommendation}
            </p>
          </div>

          {/* Combined Data Metrics */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tổng hợp dữ liệu ghi nhận
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <span className="text-[11px] text-slate-400">Thời gian kiểm tra</span>
                <div className="text-base font-bold text-white font-display">
                  {result.cameraMetrics.sessionDuration}s
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <span className="text-[11px] text-slate-400">Chỉ số PERCLOS</span>
                <div className="text-base font-bold text-teal-300 font-display">
                  {result.cameraMetrics.perclos}%
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <span className="text-[11px] text-slate-400">Số lần ngủ gật (≥2s)</span>
                <div className={`text-base font-bold font-display ${
                  result.cameraMetrics.sleepEpisodesCount > 0 ? 'text-rose-400' : 'text-slate-300'
                }`}>
                  {result.cameraMetrics.sleepEpisodesCount}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-1">
                <span className="text-[11px] text-slate-400">Nhắm kéo dài (0.5-2s)</span>
                <div className="text-base font-bold text-amber-400 font-display">
                  {result.cameraMetrics.prolongedClosuresCount}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-700/40 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
              <span>Độ mệt mỏi tự báo cáo: <strong>{result.surveySummary.fatigueLevel}/5</strong></span>
              <span>Thiếu ngủ so với tiêu chuẩn: <strong>{result.surveySummary.sleepDeficitHours} giờ</strong></span>
              <span>Yếu tố nguy cơ ghi nhận: <strong>{result.surveySummary.riskFactorsCount}</strong></span>
            </div>
          </div>

          {/* Medical Disclaimer Note */}
          <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 text-xs text-slate-400 leading-relaxed space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
              <span>Nguyên tắc khoa học & Miễn trừ trách nhiệm</span>
            </div>
            <p>
              Hệ thống chỉ hỗ trợ nhận diện các dấu hiệu liên quan đến Microsleep và trạng thái buồn ngủ/ngủ gật dựa trên phân tích thị giác máy tính và thông tin lối sống. Kết quả chỉ mang tính tham khảo và hỗ trợ theo dõi, không phải là chẩn đoán y khoa và không thay thế cho đánh giá chuyên môn của bác sĩ.
            </p>
          </div>
        </div>

        {/* Modal Footer Buttons */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Thời điểm đánh giá: {result.timestamp}
          </span>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onRetest}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
              <span>Kiểm tra lại</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-teal-500/20"
            >
              Hoàn thành
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
