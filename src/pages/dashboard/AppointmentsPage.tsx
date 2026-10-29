import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppStore } from '../../store/useStore';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Calendar, Clock, Video, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment, showToast } = useAppStore();

  const handleJoinVideo = (appt: any) => {
    showToast(`Joining secure telehealth HIPAA-compliant video room with ${appt.dietitianName}...`, 'info');
  };

  return (
    <DashboardLayout title="My Dietitian Appointments">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8EFE6]">
          <div>
            <h1 className="font-serif-heading text-3xl font-bold text-[#1A2E1A]">
              Telehealth Consultations
            </h1>
            <p className="text-xs text-[#4A6741] mt-0.5">
              Manage your scheduled 1-on-1 sessions with licensed Registered Dietitians and Board Certified Specialists.
            </p>
          </div>

          <Link to="/nutritionist-services">
            <Button variant="primary" size="sm">
              <Calendar className="w-3.5 h-3.5" /> Book New Session
            </Button>
          </Link>
        </div>

        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appt) => {
              const isCancelled = appt.status === 'cancelled';
              return (
                <div
                  key={appt.id}
                  className={`bg-white p-6 rounded-[24px] border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                    isCancelled ? 'border-stone-200 opacity-60' : 'border-[#E8EFE6]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCancelled
                            ? 'bg-stone-200 text-stone-600'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {appt.status}
                      </span>
                      <span className="text-xs text-[#8FAE8A]">
                        Booked {new Date(appt.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                      {appt.dietitianName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A6741]">
                      <span className="flex items-center gap-1 font-semibold text-[#1A2E1A]">
                        <Calendar className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        {appt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        {appt.timeSlot} ({appt.durationMin} mins)
                      </span>
                      <span className="font-bold text-[#2D6A4F]">Fee: ${appt.feeUsd}.00</span>
                    </div>

                    <p className="text-xs text-[#4A6741] italic max-w-lg">
                      Clinical focus: "{appt.reason}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isCancelled ? (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleJoinVideo(appt)}
                        >
                          <Video className="w-3.5 h-3.5" /> Join Telehealth Room
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => cancelAppointment(appt.id)}
                          className="text-stone-500 hover:text-red-600"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </Button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-stone-400">
                        Session Cancelled
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-[#E8EFE6] p-12 text-center space-y-3">
            <Calendar className="w-12 h-12 text-[#8FAE8A] mx-auto" />
            <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
              No Consultations Scheduled
            </h3>
            <p className="text-xs text-[#4A6741] max-w-sm mx-auto">
              Need personalized medical nutrition therapy or accountability? Book a session with one of our Board Certified Registered Dietitians.
            </p>
            <Link to="/nutritionist-services" className="inline-block mt-2">
              <Button variant="primary" size="sm">Browse Dietitians</Button>
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
