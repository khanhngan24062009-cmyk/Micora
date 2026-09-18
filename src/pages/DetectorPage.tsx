import React, { useState } from 'react';
import { CameraState, SurveyData, AssessmentResult } from '../types';
import { CameraView } from '../components/CameraView';
import { SurveyForm } from '../components/SurveyForm';
import { AssessmentResultModal } from '../components/AssessmentResultModal';
import { evaluateMicrosleepRisk } from '../utils/assessment';
import { 
  Video, 
  ClipboardCheck, 
  Sparkles, 
  ShieldAlert, 
  HelpCircle, 
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface DetectorPageProps {
  cameraState: CameraState;
  setCameraState: React.Dispatch<React.SetStateAction<CameraState>>;
  surveyData: SurveyData;
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
}

export const DetectorPage: React.FC<DetectorPageProps> = ({
  cameraState,
  setCameraState,
  surveyData,
  setSurveyData,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'camera' | 'survey'>('camera');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  // Compute final assessment
  const handleGenerateAssessment = () => {
    const result = evaluateMicrosleepRisk(cameraState, surveyData);
    setAssessmentResult(result);
  };

  const handleRetest = () => {
    setAssessmentResult(null);
    setCameraState(prev => ({
      ...prev,
      sessionDuration: 0,
      totalBlinks: 0,
      prolongedClosuresCount: 0,
      sleepEpisodesCount: 0,
      perclos: 0,
      currentClosedDuration: 0,
      isAlerting: false,
    }));
  };

  return (
    <div className="space-y-8 py-6 sm:py-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold">
            <Video className="w-3.5 h-3.5" />
            <span>Khu vực Kiểm tra & Nhận diện Thời gian thực</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Camera & Hệ thống Nhận diện, Cảnh báo Microsleep
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Theo dõi trạng thái mắt liên tục, phát hiện dấu hiệu ngủ gật tức thời (≥ 2s) và kết hợp dữ liệu thói quen sinh hoạt để đánh giá mức độ rủi ro.
          </p>
        </div>

        {/* Action Button: Finish & Assess */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerateAssessment}
            id="btn-evaluate-risk"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 hover:opacity-95 transition-all"
          >
            <ClipboardCheck className="w-4 h-4" />
            <span>Tổng hợp & Xem kết quả đánh giá</span>
          </button>
        </div>
      </div>

      {/* 7-Step Workflow Process Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hidden lg:block">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          Quy trình kiểm tra 7 bước chuẩn khoa học:
        </div>
        <div className="grid grid-cols-7 gap-2 text-center text-xs">
          {[
            { step: '1', title: 'Mở trang', desc: 'Bắt đầu kiểm tra' },
            { step: '2', title: 'Cấp quyền', desc: 'Cho phép camera' },
            { step: '3', title: 'Kiểm tra', desc: 'Mặt & ánh sáng' },
            { step: '4', title: 'Thu thập', desc: 'Mắt & biểu mẫu' },
            { step: '5', title: 'Phân tích', desc: 'PERCLOS & số liệu' },
            { step: '6', title: 'Kết quả', desc: 'Đánh giá 3 mức' },
            { step: '7', title: 'Cảnh báo', desc: 'Âm thanh thời gian thực' },
          ].map(item => (
            <div key={item.step} className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-0.5">
              <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 font-bold mx-auto text-[10px] flex items-center justify-center border border-teal-500/30">
                {item.step}
              </div>
              <div className="font-semibold text-white text-[11px]">{item.title}</div>
              <div className="text-[10px] text-slate-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Responsive 2-column or tabbed interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col (Camera Viewport) - 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-lg font-bold text-white font-display">
                Camera Phân tích Biểu hiện Khuôn mặt
              </h2>
            </div>

            <div className="text-xs text-slate-400">
              {cameraState.isStreaming ? (
                <span className="text-emerald-400 font-medium">● Đang theo dõi</span>
              ) : (
                <span>Chờ kích hoạt</span>
              )}
            </div>
          </div>

          <CameraView
            cameraState={cameraState}
            setCameraState={setCameraState}
            onStopAndReview={handleGenerateAssessment}
          />
        </div>

        {/* Right Col (Survey Form) - 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-lg font-bold text-white font-display">
                Biểu mẫu Giấc ngủ & Thói quen
              </h2>
            </div>

            <span className="text-xs text-slate-400">Bước 4/7</span>
          </div>

          <SurveyForm
            surveyData={surveyData}
            setSurveyData={setSurveyData}
          />

          {/* Quick Submit Block */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sẵn sàng đánh giá</span>
            </div>
            <p className="text-xs text-slate-300">
              Nhấn nút bên dưới để hệ thống kết hợp dữ liệu camera thời gian thực và khảo sát thói quen sinh hoạt.
            </p>
            <button
              onClick={handleGenerateAssessment}
              className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-500/20 transition-all"
            >
              <span>Xem kết quả đánh giá (3 Mức)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Assessment Modal if active */}
      {assessmentResult && (
        <AssessmentResultModal
          result={assessmentResult}
          onClose={() => setAssessmentResult(null)}
          onRetest={handleRetest}
        />
      )}

    </div>
  );
};
