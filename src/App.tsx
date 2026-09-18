/**
 * Micora - Website hỗ trợ nhận diện hiện tượng Microsleep
 * thông qua phân tích biểu hiện khuôn mặt và thông tin giấc ngủ
 */

import React, { useState } from 'react';
import { PageTab, CameraState, SurveyData } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DetectorPage } from './pages/DetectorPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');

  // Shared camera tracking state
  const [cameraState, setCameraState] = useState<CameraState>({
    hasPermission: null,
    isStreaming: false,
    faceDetected: false,
    faceCentered: false,
    lightingOk: true,
    lightingValue: 120,
    eyeStatus: 'open',
    currentClosedDuration: 0,
    totalBlinks: 0,
    prolongedClosuresCount: 0,
    sleepEpisodesCount: 0,
    perclos: 0,
    sessionDuration: 0,
    isAlerting: false,
    cooldownRemaining: 0,
  });

  // Shared survey data state
  const [surveyData, setSurveyData] = useState<SurveyData>({
    dailySleepHours: 7,
    bedTime: '23:30',
    wakeTime: '06:30',
    lastNightSleepHours: 6,
    sleepQuality: 'normal',
    fatigueLevel: 2,
    frequentLateNight: false,
    phoneBeforeBed: true,
    insufficientSleepRegularly: false,
    hadEnoughRestToday: true,
    currentConditions: {
      tired: false,
      lossFocus: false,
      sleepy: false,
      sleepDeprived: false,
      scheduleDisrupted: false,
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-white font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCameraActive={cameraState.isStreaming}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <HomePage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'detector' && (
          <DetectorPage
            cameraState={cameraState}
            setCameraState={setCameraState}
            surveyData={surveyData}
            setSurveyData={setSurveyData}
          />
        )}

        {activeTab === 'statistics' && (
          <StatisticsPage />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

    </div>
  );
}
