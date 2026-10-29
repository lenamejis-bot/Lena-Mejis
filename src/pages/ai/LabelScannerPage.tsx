import React, { useState } from 'react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';
import { scanNutritionLabel } from '../../lib/api';
import { ScanLine, Upload, AlertTriangle, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../../store/useStore';

export const LabelScannerPage: React.FC = () => {
  const { showToast } = useAppStore();

  const [description, setDescription] = useState('Organic Almond Cranberry Granola with Cane Sugar');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
  );
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleLabels = [
    {
      name: 'Almond Cranberry Granola',
      img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      desc: 'Packaged Granola: 1/2 cup serving, 220 calories, 12g added cane sugar, 140mg sodium, 4g fiber'
    },
    {
      name: 'Canned Cream of Mushroom Soup',
      img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      desc: 'Canned Soup: 1/2 cup condensed serving, 110 calories, 870mg sodium (38% DV), 7g fat, 1g fiber'
    },
    {
      name: 'Strawberry Greek Yogurt Drink',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
      desc: 'Yogurt Beverage: 7 fl oz serving, 140 calories, 10g protein, 18g total sugar (14g added), 65mg sodium'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setSelectedImage(base64);
        setImageBase64(base64);
        setDescription(file.name.replace(/\.[^/.]+$/, ''));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const data = await scanNutritionLabel(description, imageBase64);
      setResult(data);
      showToast('Scanned Nutrition Facts label!', 'success');
    } catch (err) {
      showToast('Scan error. Please try again.', 'error');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <PageWrapper title="Nutrition Facts Label Scanner">
      <div className="bg-[#F0F4EF] py-12 border-b border-[#D4E4D0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase mb-2">
            <ScanLine className="w-3.5 h-3.5 text-[#3A86FF]" /> Smart Grocery Consumer Assistant
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-[#1A2E1A]">
            Nutrition Facts Label Scanner
          </h1>
          <p className="text-sm text-[#4A6741] mt-2 max-w-xl mx-auto leading-relaxed">
            Unpack hidden added sugars, excessive sodium concentrations, and misleading packaging claims in plain English.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Column */}
          <div className="lg:col-span-5 bg-white p-6 rounded-[28px] border border-[#D4E4D0] shadow-sm space-y-6">
            <div>
              <h3 className="font-serif-heading text-lg font-bold text-[#1A2E1A] mb-3">
                1. Upload Label or Select Sample
              </h3>

              <div className="relative rounded-[20px] overflow-hidden aspect-[4/3] bg-stone-100 border-2 border-dashed border-[#D4E4D0] flex items-center justify-center group">
                {selectedImage ? (
                  <img src={selectedImage} alt="Packaged product" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <ScanLine className="w-10 h-10 text-[#8FAE8A] mx-auto mb-2" />
                    <p className="text-xs text-[#4A6741]">Drop label image here</p>
                  </div>
                )}
                <label className="absolute inset-0 cursor-pointer flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white font-bold flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                    <Upload className="w-3.5 h-3.5" /> Upload File
                  </span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>

              {/* Sample labels */}
              <div className="mt-4">
                <span className="text-[11px] font-bold text-[#8FAE8A] uppercase tracking-wider block mb-2">
                  Test sample supermarket items:
                </span>
                <div className="space-y-1.5">
                  {sampleLabels.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedImage(sample.img);
                        setImageBase64(undefined);
                        setDescription(sample.desc);
                      }}
                      className="w-full p-2.5 rounded-[12px] bg-[#FAFAF7] border border-[#E8EFE6] text-left hover:border-[#2D6A4F] text-xs font-semibold text-[#1A2E1A] transition-all cursor-pointer"
                    >
                      {sample.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A6741] uppercase mb-1">
                Product Details or Label Text
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-[12px] bg-[#FAFAF7] border border-[#D4E4D0] text-xs text-[#1A2E1A] focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full shadow-md"
              isLoading={isScanning}
              onClick={handleScan}
            >
              <Sparkles className="w-4 h-4 text-[#FFBE0B]" />
              Scan & Decode Nutrition Label
            </Button>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="bg-white p-8 rounded-[28px] border border-[#D4E4D0] shadow-sm space-y-6 animate-in fade-in">
                <div className="pb-4 border-b border-[#F0F4EF]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D6A4F]">
                    Decoded Nutrition Facts
                  </span>
                  <h2 className="font-serif-heading text-2xl font-bold text-[#1A2E1A]">
                    {result.productName || 'Scanned Packaged Product'}
                  </h2>
                  <p className="text-xs text-[#4A6741] mt-1 font-medium">
                    Serving Size: {result.servingSize} • {result.calories} Calories
                  </p>
                </div>

                {/* Summary */}
                <div className="p-5 rounded-[18px] bg-[#F0F4EF] border border-[#D4E4D0] text-xs text-[#245840] leading-relaxed">
                  <strong className="block text-sm text-[#1A2E1A] font-serif-heading mb-1">Dietitian Assessment:</strong>
                  {result.summary}
                </div>

                {/* Red Flags Alert */}
                {result.redFlags && result.redFlags.length > 0 && (
                  <div className="p-5 rounded-[18px] bg-red-50/70 border border-red-200 text-xs text-red-950 space-y-2">
                    <h4 className="font-bold flex items-center gap-1.5 text-red-900 uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4 text-red-600" /> Watch Out For:
                    </h4>
                    <ul className="space-y-1">
                      {result.redFlags.map((flag: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Healthier Alternatives */}
                {result.healthierAlternatives && result.healthierAlternatives.length > 0 && (
                  <div className="p-5 rounded-[18px] bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                    <h4 className="font-bold flex items-center gap-1.5 text-emerald-900 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-[#2D6A4F]" /> Cleaner Whole Food Alternatives:
                    </h4>
                    <ul className="space-y-1">
                      {result.healthierAlternatives.map((alt: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#2D6A4F] font-bold">✓</span>
                          <span>{alt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-[28px] border border-[#E8EFE6] text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F0F4EF] flex items-center justify-center text-[#2D6A4F] mx-auto text-2xl">
                  🔍
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#1A2E1A]">
                  Decode Nutrition Facts in Seconds
                </h3>
                <p className="text-xs text-[#4A6741] max-w-sm mx-auto leading-relaxed">
                  Select a sample product on the left or upload your own label to reveal ingredient quality and healthier alternatives.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
