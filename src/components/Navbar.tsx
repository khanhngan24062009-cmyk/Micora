import React, { useState } from 'react';
import { PageTab } from '../types';
import { Eye, ShieldAlert, BarChart3, Mail, Video, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  isCameraActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isCameraActive = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Trang chủ', icon: <Sparkles className="w-4 h-4" /> },
    {
      id: 'detector',
      label: 'Kiểm tra & Camera',
      icon: <Video className="w-4 h-4" />,
      badge: isCameraActive ? 'Live' : undefined,
    },
    { id: 'statistics', label: 'Thực trạng Microsleep', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'contact', label: 'Liên hệ', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/85 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Slogan */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
            id="nav-logo"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 font-bold shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <Eye className="w-6 h-6 stroke-[2.4]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-300"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-display">Micora</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  AI Guard
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Hệ thống nhận diện & phòng ngừa Microsleep
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" id="nav-desktop-menu">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-800/90 text-teal-400 shadow-sm border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500 text-white animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {activeTab !== 'detector' ? (
              <button
                onClick={() => setActiveTab('detector')}
                id="header-cta-start"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-semibold text-sm hover:opacity-90 transition-opacity shadow-md shadow-teal-500/20 active:scale-95"
              >
                <Video className="w-4 h-4" />
                <span>Kiểm tra ngay</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                <ShieldAlert className="w-4 h-4 text-teal-400" />
                <span>Bảo vệ thời gian thực</span>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-800 flex flex-col gap-1.5" id="mobile-menu-dropdown">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-slate-800 text-teal-400 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('detector');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-500 text-slate-950 font-semibold text-sm"
              >
                <Video className="w-4 h-4" />
                <span>Bắt đầu kiểm tra tỉnh táo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
