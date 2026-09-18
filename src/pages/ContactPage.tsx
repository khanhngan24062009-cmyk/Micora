import React, { useState } from 'react';
import { FeedbackSubmission } from '../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Users, 
  MessageSquare, 
  Sparkles, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Building,
  GraduationCap
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: 'Góp ý tính năng & Trải nghiệm nhận diện',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedItem, setSubmittedItem] = useState<FeedbackSubmission | null>(null);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackSubmission[]>([
    {
      id: 'FB-9021',
      fullName: 'Trần Minh Quang',
      email: 'quang.tran@gmail.com',
      topic: 'Hợp tác nghiên cứu',
      message: 'Tôi rất quan tâm đến thuật toán tính PERCLOS của Micora và muốn đề xuất thử nghiệm tại trung tâm đào tạo lái xe.',
      createdAt: 'Hôm qua lúc 15:30',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newSubmission: FeedbackSubmission = {
        id: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        topic: formData.topic,
        message: formData.message.trim(),
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ', Hôm nay',
      };

      setFeedbackHistory(prev => [newSubmission, ...prev]);
      setSubmittedItem(newSubmission);
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        topic: 'Góp ý tính năng & Trải nghiệm nhận diện',
        message: '',
      });
    }, 600);
  };

  return (
    <div className="space-y-12 py-6 sm:py-10">
      
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Kênh Kết Nối & Đóng Góp Ý Kiến</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Liên hệ Nhóm Nghiên cứu & Phát triển Micora
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Chúng tôi trân trọng mọi đóng góp, phản hồi và cơ hội hợp tác nhằm hoàn thiện thuật toán nhận diện và lan tỏa nhận thức phòng chống Microsleep đến cộng đồng.
        </p>
      </div>

      {/* Grid: Information & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Team & Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Team Profile Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Nhóm Nghiên cứu Micora
                </h3>
                <p className="text-xs text-slate-400">
                  Đề tài Ứng dụng Thị giác Máy tính trong Chăm sóc Sức khỏe
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-300 leading-relaxed border-t border-slate-800">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Lĩnh vực nghiên cứu:</strong> Tương tác Người - Máy (HCI), Xử lý Thị giác Máy tính trong trình duyệt (Web Computer Vision) và Khoa học Giấc ngủ.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Đơn vị chủ trì:</strong> Nhóm Dự án Nghiên cứu Công nghệ Nhận diện Trạng thái Tỉnh táo Micora.
                </span>
              </div>
            </div>

            {/* Researchers List */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2 text-xs">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Thành viên thực hiện đề tài:
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-white">● Đặng Khánh Ngân:</span>
                  <span className="text-teal-400 font-medium">Tác giả đề tài & Nghiên cứu chính</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-white">● Nhóm Trí tuệ Nhân tạo:</span>
                  <span className="text-slate-400">Thuật toán PERCLOS & Eye Tracking</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-white">● Nhóm Phát triển Giao diện:</span>
                  <span className="text-slate-400">Kiến trúc Web thời gian thực</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-semibold text-white">● Nhóm Khảo sát & Dữ liệu:</span>
                  <span className="text-slate-400">Thu thập mẫu & Thống kê cộng đồng</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Official Contact Details */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-teal-400 font-display">
              Kênh liên hệ chính thức
            </h4>

            <div className="space-y-3.5 text-xs text-slate-300">
              <a
                href="mailto:contact@micora.health"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/70 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-slate-400">Email chính thức</div>
                  <div className="font-semibold text-white group-hover:text-teal-300">contact@micora.health</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <a
                href="mailto:micora.project@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/70 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] text-slate-400">Email dự phòng</div>
                  <div className="font-semibold text-white group-hover:text-cyan-300">micora.project@gmail.com</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/70">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Hotline hỗ trợ đề tài</div>
                  <div className="font-semibold text-white">1900 6824 / (+84) 24 3869 1234</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/70">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Văn phòng / Phòng thí nghiệm</div>
                  <div className="font-semibold text-white">Trung tâm Nghiên cứu Khoa học & Đổi mới Sáng tạo</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Feedback Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Gửi thông tin trực tuyến</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Biểu mẫu liên hệ & Phản hồi
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Vui lòng điền thông tin bên dưới để gửi câu hỏi, góp ý kỹ thuật hoặc liên hệ hợp tác với nhóm thực hiện.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" id="contact-feedback-form">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium flex items-center gap-1">
                    <span>Họ và tên</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium flex items-center gap-1">
                    <span>Địa chỉ Email</span>
                    <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">
                    Số điện thoại (tùy chọn)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">
                    Chủ đề phản hồi
                  </label>
                  <select
                    value={formData.topic}
                    onChange={e => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="Góp ý tính năng & Trải nghiệm nhận diện">Góp ý tính năng & Trải nghiệm nhận diện</option>
                    <option value="Báo lỗi kỹ thuật camera / phát hiện mắt">Báo lỗi kỹ thuật camera / phát hiện mắt</option>
                    <option value="Hợp tác khảo sát cộng đồng">Hợp tác khảo sát cộng đồng</option>
                    <option value="Câu hỏi về cơ chế sinh học Microsleep">Câu hỏi về cơ sở khoa học Microsleep</option>
                    <option value="Khác">Chủ đề khác</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium flex items-center gap-1">
                  <span>Nội dung phản hồi hoặc câu hỏi</span>
                  <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Nhập nội dung chi tiết phản hồi hoặc câu hỏi của bạn tại đây..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-teal-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="btn-submit-feedback"
                className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Đang gửi thông tin đến nhóm...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Gửi phản hồi cho nhóm thực hiện</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Success Banner when submitted */}
          {submittedItem && (
            <div className="p-6 rounded-3xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 space-y-3 animate-fade-in shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Thông báo: Phản hồi đã được ghi nhận thành công!
                  </h4>
                  <p className="text-xs text-emerald-300/80">
                    Mã tiếp nhận: <strong>{submittedItem.id}</strong> | Thời gian: {submittedItem.createdAt}
                  </p>
                </div>
              </div>

              <p className="text-xs text-emerald-100/90 leading-relaxed pl-13">
                Cảm ơn bạn <strong>{submittedItem.fullName}</strong>. Nhóm nghiên cứu Micora đã tiếp nhận phản hồi về chủ đề <em>"{submittedItem.topic}"</em>. Chúng tôi sẽ xử lý và gửi phản hồi đến email <strong>{submittedItem.email}</strong> trong vòng 24 - 48 giờ làm việc.
              </p>
            </div>
          )}

          {/* Feedback History in Session */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Các phản hồi đã tiếp nhận gần đây ({feedbackHistory.length})
              </h4>
              <span className="text-[10px] text-teal-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Bảo mật dữ liệu</span>
              </span>
            </div>

            <div className="space-y-2.5">
              {feedbackHistory.map(fb => (
                <div
                  key={fb.id}
                  className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{fb.fullName}</span>
                    <span className="text-[10px] text-slate-500">{fb.createdAt}</span>
                  </div>
                  <div className="text-teal-300 font-medium text-[11px]">{fb.topic}</div>
                  <p className="text-slate-300 text-[11px] line-clamp-2">{fb.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
