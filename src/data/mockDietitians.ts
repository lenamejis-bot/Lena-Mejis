import { Dietitian } from '../types';

export const mockDietitians: Dietitian[] = [
  {
    id: 'rd-1',
    fullName: 'Sarah Jenkins',
    credential: 'MS, RDN, LD, CDCES',
    title: 'Gastrointestinal & Metabolic Health Specialist',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813579-455b57f0012b?auto=format&fit=crop&w=400&q=80',
    bio: '12+ years clinical experience guiding clients through IBS, SIBO, sustainable weight regulation, and prediabetes management. Former lead clinical dietitian at Johns Hopkins Medicine.',
    specializations: ['Gastrointestinal Health', 'Prediabetes & Insulin Resistance', 'Weight Management', 'Plant-Based Nutrition'],
    consultationFeeUsd: 135,
    consultationDurationMin: 50,
    isAcceptingClients: true,
    ratingAvg: 4.95,
    ratingCount: 88,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Saturday']
  },
  {
    id: 'rd-2',
    fullName: 'Marcus Hayes',
    credential: 'MS, RDN, CSSD',
    title: 'Cardiovascular & Sports Performance Dietitian',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    bio: 'Board Certified Specialist in Sports Dietetics (CSSD). Marcus helps active adults and athletes optimize endurance fuel, lower LDL cholesterol, and master heart-healthy meal prep.',
    specializations: ['Cardiovascular Health & Lipids', 'Sports Nutrition & Hypertophy', 'Hypertension (DASH)', 'Meal Prep Systems'],
    consultationFeeUsd: 150,
    consultationDurationMin: 50,
    isAcceptingClients: true,
    ratingAvg: 4.92,
    ratingCount: 64,
    availableDays: ['Tuesday', 'Thursday', 'Friday']
  },
  {
    id: 'rd-3',
    fullName: 'Dr. Kimberly Vance-O’Connor',
    credential: 'PhD, RDN, FAND',
    title: 'Hormonal Nutrition & Women’s Longevity Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    bio: 'Fellow of the Academy of Nutrition and Dietetics (FAND). Specializes in PCOS, perimenopausal metabolic shifts, thyroid support, and anti-inflammatory dietary therapies.',
    specializations: ['PCOS & Hormonal Health', 'Perimenopause & Menopause', 'Anti-Inflammatory Protocols', 'Senior Wellness'],
    consultationFeeUsd: 165,
    consultationDurationMin: 50,
    isAcceptingClients: true,
    ratingAvg: 4.98,
    ratingCount: 104,
    availableDays: ['Monday', 'Tuesday', 'Wednesday']
  }
];
