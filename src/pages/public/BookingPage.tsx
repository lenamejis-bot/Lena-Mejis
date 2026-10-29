import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { mockDietitians } from '../../data/mockDietitians';
import { Calendar, Clock, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAppStore } from '../../store/useStore';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookAppointment, user } = useAppStore();

  const dietitian = mockDietitians.find(d => d.id === id) || mockDietitians[0];

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [reason, setReason] = useState<string>('Comprehensive personalized nutrition therapy and meal planning.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const timeSlots = ['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      bookAppointment({
        dietitianId: dietitian.id,
        dietitianName: `${dietitian.fullName}, ${dietitian.credential}`,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        durationMin: dietitian.consultationDurationMin,
        feeUsd: dietitian.consultationFeeUsd,
        reason,
        status: 'confirmed'
      });
      setIsSubmitting(false);
      navigate('/dashboard/appointments');
    }, 600);
  };

  return (
    <PageWrapper title={`Book with ${dietitian.fullName}`}>
      <div className="bg-white border-b border-[#E8EFE6]">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(`/nutritionist-services/${dietitian.id}`)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6741] hover:text-[#2D6A4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-[28px] border border-[#D4E4D0] p-8 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] block mb-1">
              Telehealth Appointment
            </span>
            <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
              Schedule Consultation with {dietitian.fullName}
            </h1>
            <p className="text-xs text-[#4A6741] mt-1">
              50-Minute Video Visit • ${dietitian.consultationFeeUsd} Standard Rate
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Date Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6741]">
                1. Select Preferred Date
              </label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full h-12 px-4 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-sm text-[#1A2E1A] focus:border-[#2D6A4F] focus:outline-none"
              />
            </div>

            {/* 2. Time Slot Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6741]">
                2. Select Available Time (EST)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-2 px-3 text-xs font-semibold rounded-[10px] transition-colors cursor-pointer border ${
                      selectedTimeSlot === slot
                        ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                        : 'bg-[#FAFAF7] text-[#4A6741] border-[#E8EFE6] hover:bg-[#F0F4EF]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Reason for Visit */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6741]">
                3. Primary Goal or Health Concern
              </label>
              <textarea
                rows={3}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe what you'd like to address (e.g. improving digestion, heart health, blood sugar, athletic performance)..."
                className="w-full p-4 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-sm text-[#1A2E1A] focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
              />
            </div>

            {/* Payment Summary */}
            <div className="p-5 rounded-[16px] bg-[#F0F4EF] border border-[#D4E4D0] space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-[#1A2E1A]">
                <span>50-Min Consultation Fee</span>
                <span>${dietitian.consultationFeeUsd}.00</span>
              </div>
              <div className="flex items-center justify-between text-[#4A6741]">
                <span>Platform Processing</span>
                <span>$0.00 (Included)</span>
              </div>
              <div className="pt-2 border-t border-[#D4E4D0] flex items-center justify-between font-bold text-sm text-[#2D6A4F]">
                <span>Total Due</span>
                <span>${dietitian.consultationFeeUsd}.00</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
            >
              <CheckCircle2 className="w-4 h-4" /> Confirm & Book Consultation
            </Button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};
