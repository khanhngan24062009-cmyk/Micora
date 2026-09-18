import React from 'react';
import { SurveyData } from '../types';
import { BedDouble, BatteryMedium, Smartphone, HeartPulse, Info } from 'lucide-react';

interface SurveyFormProps {
  surveyData: SurveyData;
  setSurveyData: React.Dispatch<React.SetStateAction<SurveyData>>;
  onSubmitReady?: () => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ surveyData, setSurveyData }) => {
  const handleQualityChange = (val: SurveyData['sleepQuality']) => {
    setSurveyData(prev => ({ ...prev, sleepQuality: val }));
  };

  const handleConditionToggle = (key: keyof SurveyData['currentConditions']) => {
    setSurveyData(prev => ({
      ...prev,
      currentConditions: {
        ...prev.currentConditions,
        [key]: !prev.currentConditions[key],
      },
    }));
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl">
      <div>
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
          <span>Khảo sát thông tin cá nhân</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
          Thông tin giấc ngủ & Thói quen sinh hoạt
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Dữ liệu khảo sát được kết hợp cùng chỉ số camera để đưa ra kết quả đánh giá toàn diện.
        </p>
      </div>

      {/* SECTION 1: Giấc ngủ */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-sm font-semibold text-teal-300">
          <BedDouble className="w-4 h-4" />
          <span>🛌 Thông tin về giấc ngủ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              Bạn ngủ khoảng bao nhiêu giờ mỗi ngày? (trung bình)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="3"
                max="14"
                step="0.5"
                value={surveyData.dailySleepHours}
                onChange={e => setSurveyData(prev => ({ ...prev, dailySleepHours: parseFloat(e.target.value) || 0 }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-xs text-slate-400 whitespace-nowrap">giờ / ngày</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              Đêm qua bạn ngủ khoảng bao nhiêu giờ?
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="16"
                step="0.5"
                value={surveyData.lastNightSleepHours}
                onChange={e => setSurveyData(prev => ({ ...prev, lastNightSleepHours: parseFloat(e.target.value) || 0 }))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
              />
              <span className="text-xs text-slate-400 whitespace-nowrap">giờ</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              Thời gian đi ngủ thông thường:
            </label>
            <input
              type="time"
              value={surveyData.bedTime}
              onChange={e => setSurveyData(prev => ({ ...prev, bedTime: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-medium">
              Thời gian thức dậy thông thường:
            </label>
            <input
              type="time"
              value={surveyData.wakeTime}
              onChange={e => setSurveyData(prev => ({ ...prev, wakeTime: e.target.value }))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Quality selector */}
        <div className="space-y-2 pt-2">
          <label className="text-xs text-slate-300 font-medium">
            Chất lượng giấc ngủ gần đây như thế nào?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'very_good', label: 'Rất tốt', emoji: '✨' },
              { id: 'good', label: 'Tốt', emoji: '😊' },
              { id: 'normal', label: 'Bình thường', emoji: '😐' },
              { id: 'poor', label: 'Kém', emoji: '🥱' },
              { id: 'very_poor', label: 'Rất kém', emoji: '😫' },
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleQualityChange(item.id as SurveyData['sleepQuality'])}
                className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1 ${
                  surveyData.sleepQuality === item.id
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/60 shadow-sm'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className="text-base">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Mức độ mệt mỏi */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
            <BatteryMedium className="w-4 h-4" />
            <span>😵 Mức độ mệt mỏi hiện tại (Thang điểm 1 – 5)</span>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Điểm: {surveyData.fatigueLevel}/5
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {[
            { level: 1, title: '1 = Hoàn toàn tỉnh táo', desc: 'Sảng khoái, tập trung tối đa' },
            { level: 2, title: '2 = Hơi mệt', desc: 'Có thể làm việc bình thường' },
            { level: 3, title: '3 = Khá mệt', desc: 'Giảm chú ý, cần nỗ lực duy trì' },
            { level: 4, title: '4 = Rất mệt', desc: 'Mắt nặng trĩu, ngáp nhiều' },
            { level: 5, title: '5 = Cực kỳ buồn ngủ', desc: 'Nguy cơ sụp mí, rất mệt mỏi' },
          ].map(item => (
            <button
              key={item.level}
              type="button"
              onClick={() => setSurveyData(prev => ({ ...prev, fatigueLevel: item.level }))}
              className={`p-3 rounded-xl text-left border transition-all space-y-1 ${
                surveyData.fatigueLevel === item.level
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="font-bold text-xs">{item.title}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3: Thói quen sinh hoạt */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
          <Smartphone className="w-4 h-4" />
          <span>📱 Thói quen sinh hoạt</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              key: 'frequentLateNight',
              label: 'Bạn có thường xuyên thức khuya không?',
              val: surveyData.frequentLateNight,
            },
            {
              key: 'phoneBeforeBed',
              label: 'Bạn có sử dụng điện thoại trước khi ngủ không?',
              val: surveyData.phoneBeforeBed,
            },
            {
              key: 'insufficientSleepRegularly',
              label: 'Bạn có thường xuyên ngủ không đủ giờ không?',
              val: surveyData.insufficientSleepRegularly,
            },
            {
              key: 'hadEnoughRestToday',
              label: 'Hôm nay bạn đã có thời gian nghỉ ngơi đầy đủ chưa?',
              val: surveyData.hadEnoughRestToday,
            },
          ].map(item => (
            <div
              key={item.key}
              className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/70 flex items-center justify-between gap-3"
            >
              <span className="text-xs text-slate-200">{item.label}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setSurveyData(prev => ({ ...prev, [item.key]: true }))}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    item.val
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Có
                </button>
                <button
                  type="button"
                  onClick={() => setSurveyData(prev => ({ ...prev, [item.key]: false }))}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    !item.val
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Không
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Tình trạng hiện tại */}
      <div className="space-y-4 pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-sm font-semibold text-rose-300">
          <HeartPulse className="w-4 h-4" />
          <span>❤️ Tình trạng hiện tại (chọn các biểu hiện bạn đang cảm thấy)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            { key: 'tired', label: 'Cảm thấy mệt mỏi' },
            { key: 'lossFocus', label: 'Khó tập trung' },
            { key: 'sleepy', label: 'Buồn ngủ' },
            { key: 'sleepDeprived', label: 'Thiếu ngủ' },
            { key: 'scheduleDisrupted', label: 'Lịch sinh hoạt bị thay đổi' },
          ].map(cond => {
            const checked = surveyData.currentConditions[cond.key as keyof SurveyData['currentConditions']];
            return (
              <button
                key={cond.key}
                type="button"
                onClick={() => handleConditionToggle(cond.key as keyof SurveyData['currentConditions'])}
                className={`p-3 rounded-xl text-left border text-xs font-medium flex items-center gap-2.5 transition-all ${
                  checked
                    ? 'bg-rose-500/20 text-rose-200 border-rose-500/50 shadow-sm'
                    : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                    checked ? 'bg-rose-500 border-rose-400 text-white' : 'border-slate-600'
                  }`}
                >
                  {checked && <span className="text-[10px] leading-none">✓</span>}
                </div>
                <span>{cond.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Non-diagnostic notice */}
      <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
        <span>
          Các thông tin này chỉ được sử dụng để hỗ trợ đánh giá và không được sử dụng để đưa ra chẩn đoán bệnh. Mọi dữ liệu chỉ lưu trữ cục bộ trong phiên làm việc hiện tại.
        </span>
      </div>
    </div>
  );
};
