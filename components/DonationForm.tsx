import React, { useState } from 'react';
import { Button } from './Button';
import { Heart, CreditCard, AlertCircle } from 'lucide-react';
import { generateCaptainMessage } from '../services/geminiService';
import { Donation } from '../types';

interface DonationFormProps {
  onDonate: (donation: Donation) => void;
}

const PRESET_AMOUNTS = [50000, 100000, 250000, 500000, 1000000];

export const DonationForm: React.FC<DonationFormProps> = ({ onDonate }) => {
  const [amount, setAmount] = useState<number>(100000);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!amount || amount < 10000) {
        setError('Minimal donasi adalah Rp 10.000');
        return;
    }
    if (!name.trim()) {
        setError('Mohon isi nama Anda agar kami bisa berterima kasih');
        return;
    }

    setLoading(true);
    
    try {
        const aiResponse = await generateCaptainMessage(name, amount, message);
        
        const newDonation: Donation = {
            id: Date.now().toString(),
            name,
            amount,
            message,
            timestamp: new Date(),
            aiResponse
        };

        onDonate(newDonation);
        // Reset form
        setName('');
        setMessage('');
        setAmount(100000);
        setIsCustomAmount(false);
    } catch (error) {
        console.error("Donation failed", error);
        setError("Terjadi kesalahan saat memproses donasi. Silakan coba lagi.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-ocean-100 p-3 rounded-full text-ocean-600">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-serif">Formulir Dukungan</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Pilih Nominal Donasi</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            {PRESET_AMOUNTS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => { setAmount(preset); setIsCustomAmount(false); setError(null); }}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  amount === preset && !isCustomAmount
                    ? 'bg-ocean-900 text-white ring-2 ring-ocean-900 ring-offset-2'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Rp {preset.toLocaleString('id-ID')}
              </button>
            ))}
             <button
                type="button"
                onClick={() => { setIsCustomAmount(true); setError(null); }}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  isCustomAmount
                    ? 'bg-ocean-900 text-white ring-2 ring-ocean-900 ring-offset-2'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Nominal Lain
              </button>
          </div>
          
          {isCustomAmount && (
             <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
                <input
                    type="number"
                    min="10000"
                    value={amount}
                    onChange={(e) => { setAmount(Number(e.target.value)); setError(null); }}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 outline-none transition-all"
                    placeholder="Masukkan nominal (min. 10.000)"
                />
             </div>
          )}
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(null); }}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-ocean-500 outline-none"
                    placeholder="Nama Kapten / Donatur"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pesan Dukungan (Opsional)</label>
                <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-ocean-500 outline-none"
                    placeholder="Semangat untuk para pembuat kapal..."
                />
            </div>
        </div>

        {/* Error Message */}
        {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
            </div>
        )}

        {/* Submit */}
        <Button 
            type="submit" 
            variant="gold" 
            className="w-full h-12 text-lg"
            isLoading={loading}
        >
            {loading ? (
                <span>Kapten sedang menulis...</span>
            ) : (
                <>
                    <CreditCard className="w-5 h-5" />
                    Kirim Donasi
                </>
            )}
        </Button>
        
        <p className="text-xs text-slate-500 text-center mt-2">
            Pembayaran diamankan dengan enkripsi standar industri.
        </p>
      </form>
    </div>
  );
};