import { CameraState, SurveyData, AssessmentResult, AssessmentLevel } from '../types';

export function evaluateMicrosleepRisk(
  camera: CameraState,
  survey: SurveyData
): AssessmentResult {
  let riskScore = 0;

  // 1. Camera Factor (Weight: 50%)
  // PERCLOS evaluation (>15% is warning, >25% is severe)
  if (camera.perclos > 25) {
    riskScore += 25;
  } else if (camera.perclos > 12) {
    riskScore += 15;
  } else if (camera.perclos > 6) {
    riskScore += 8;
  }

  // Sleep episodes (closures >= 2.0s)
  if (camera.sleepEpisodesCount >= 2) {
    riskScore += 25;
  } else if (camera.sleepEpisodesCount === 1) {
    riskScore += 18;
  }

  // Prolonged closures (0.5s - 2.0s)
  if (camera.prolongedClosuresCount >= 4) {
    riskScore += 10;
  } else if (camera.prolongedClosuresCount >= 1) {
    riskScore += 5;
  }

  // 2. Survey Factor (Weight: 50%)
  // Sleep deficit
  const sleepDeficit = Math.max(0, 7.5 - survey.lastNightSleepHours);
  if (sleepDeficit >= 3) {
    riskScore += 15;
  } else if (sleepDeficit >= 1.5) {
    riskScore += 10;
  } else if (sleepDeficit > 0) {
    riskScore += 5;
  }

  // Self-reported fatigue (1 - 5)
  if (survey.fatigueLevel >= 4) {
    riskScore += 15;
  } else if (survey.fatigueLevel === 3) {
    riskScore += 8;
  }

  // Sleep quality
  if (survey.sleepQuality === 'very_poor' || survey.sleepQuality === 'poor') {
    riskScore += 8;
  }

  // Lifestyle risk factors
  let riskFactorsCount = 0;
  if (survey.frequentLateNight) riskFactorsCount++;
  if (survey.phoneBeforeBed) riskFactorsCount++;
  if (survey.insufficientSleepRegularly) riskFactorsCount++;
  if (!survey.hadEnoughRestToday) riskFactorsCount++;

  // Current conditions
  let conditionsCount = 0;
  if (survey.currentConditions.tired) conditionsCount++;
  if (survey.currentConditions.lossFocus) conditionsCount++;
  if (survey.currentConditions.sleepy) conditionsCount++;
  if (survey.currentConditions.sleepDeprived) conditionsCount++;
  if (survey.currentConditions.scheduleDisrupted) conditionsCount++;

  if (riskFactorsCount >= 3) riskScore += 6;
  if (conditionsCount >= 3) riskScore += 8;

  // Cap riskScore between 0 and 100
  riskScore = Math.min(100, Math.max(5, riskScore));

  // Determine Level based on standard 3 levels
  let level: AssessmentLevel = 'level_1';
  let levelTitle = 'MỨC 1 – ÍT DẤU HIỆU CẦN LƯU Ý';
  let badgeColor = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  let message = 'Hiện tại hệ thống chưa ghi nhận nhiều dấu hiệu đáng chú ý liên quan đến Microsleep.';
  let recommendation = 'Hãy tiếp tục duy trì giấc ngủ và thời gian nghỉ ngơi hợp lý.';

  if (riskScore >= 55 || camera.sleepEpisodesCount >= 1 || (camera.prolongedClosuresCount >= 3 && survey.fatigueLevel >= 4)) {
    level = 'level_3';
    levelTitle = 'MỨC 3 – NHIỀU DẤU HIỆU CẦN CẢNH GIÁC';
    badgeColor = 'bg-rose-500/15 text-rose-400 border-rose-500/30';
    message = 'Hệ thống ghi nhận nhiều dấu hiệu liên quan đến trạng thái buồn ngủ và suy giảm tỉnh táo.';
    recommendation = 'Bạn nên dừng các hoạt động đòi hỏi sự tỉnh táo cao và ưu tiên nghỉ ngơi. Không nên tiếp tục lái xe hoặc vận hành máy móc khi đang buồn ngủ.';
  } else if (riskScore >= 25 || camera.prolongedClosuresCount >= 1 || survey.fatigueLevel >= 3 || sleepDeficit >= 2) {
    level = 'level_2';
    levelTitle = 'MỨC 2 – CÓ DẤU HIỆU CẦN LƯU Ý';
    badgeColor = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    message = 'Hệ thống ghi nhận một số dấu hiệu có thể liên quan đến trạng thái buồn ngủ hoặc Microsleep.';
    recommendation = 'Bạn nên nghỉ ngơi và hạn chế các hoạt động đòi hỏi sự tỉnh táo cao khi đang cảm thấy mệt mỏi.';
  }

  return {
    level,
    levelTitle,
    badgeColor,
    score: riskScore,
    message,
    recommendation,
    cameraMetrics: {
      sessionDuration: camera.sessionDuration,
      perclos: Math.round(camera.perclos * 10) / 10,
      sleepEpisodesCount: camera.sleepEpisodesCount,
      prolongedClosuresCount: camera.prolongedClosuresCount,
      totalBlinks: camera.totalBlinks,
    },
    surveySummary: {
      sleepDeficitHours: Math.round(sleepDeficit * 10) / 10,
      fatigueLevel: survey.fatigueLevel,
      riskFactorsCount: riskFactorsCount + conditionsCount,
    },
    timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}
