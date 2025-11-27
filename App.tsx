import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DonationForm } from './components/DonationForm';
import { Button } from './components/Button';
import { ProgressChart } from './components/ProgressChart';
import { UpdateCard } from './components/UpdateCard';
import { Footer } from './components/Footer';
import { Donation, BuildingPhase } from './types';
import { CheckCircle2, Ship, Map, Users } from 'lucide-react';
import { generateConstructionUpdate } from './services/geminiService';

const MOCK_DONATIONS: Donation[] = [
    { id: '1', name: 'Budi Santoso', amount: 500000, message: 'Semoga cepat berlayar!', timestamp: new Date(), aiResponse: 'Terima kasih Budi! 500rb mu telah membelikan kami paku baja berkualitas tinggi untuk memperkuat lambung kapal.' },
    { id: '2', name: 'Siti Aminah', amount: 1000000, message: 'Untuk kejayaan laut kita.', timestamp: new Date(), aiResponse: 'Luar biasa Siti! Donasimu cukup untuk satu lembar kayu jati tua yang kokoh.' },
    { id: '3', name: 'Hamba Allah', amount: 250000, message: '', timestamp: new Date(), aiResponse: 'Terima kasih Hamba Allah, tali temali kapal kini bertambah panjang berkat kebaikanmu.' },
];

const TARGET_AMOUNT = 5000000000; // 5 Miliar

const App: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>(MOCK_DONATIONS);
  const [totalRaised, setTotalRaised] = useState<number>(0);
  const [chartData, setChartData] = useState<{ name: string; amount: number }[]>([]);
  const [latestUpdate, setLatestUpdate] = useState<string>("Sedang menghubungkan ke galangan...");
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [lastDonation, setLastDonation] = useState<Donation | null>(null);

  // Calculate totals and chart data
  useEffect(() => {
    const total = donations.reduce((acc, curr) => acc + curr.amount, 0);
    setTotalRaised(total);

    // Create simple chart data accumulation
    const newChartData = donations.map((d, index) => ({
        name: `Donatur ${index + 1}`,
        amount: donations.slice(0, index + 1).reduce((sum, item) => sum + item.amount, 0)
    }));
    setChartData(newChartData);
  }, [donations]);

  // Initial AI Status Fetch on Mount
  useEffect(() => {
    const fetchInitialUpdate = async () => {
        setIsUpdateLoading(true);
        try {
            // Calculate total from initial mock data directly to ensure value is available
            const currentTotal = MOCK_DONATIONS.reduce((acc, curr) => acc + curr.amount, 0);
            const updateText = await generateConstructionUpdate(currentTotal, TARGET_AMOUNT);
            setLatestUpdate(updateText);
        } catch (error) {
            setLatestUpdate("Galangan kapal sedang sibuk, namun semangat pekerja tetap membara.");
        } finally {
            setIsUpdateLoading(false);
        }
    };
    fetchInitialUpdate();
  }, []);

  const handleNewDonation = async (donation: Donation) => {
    setDonations(prev => [donation, ...prev]);
    setLastDonation(donation);
    setShowModal(true);
    
    // Update global build status via AI
    setIsUpdateLoading(true);
    try {
        const newTotal = donations.reduce((acc, curr) => acc + curr.amount, 0) + donation.amount;
        const updateText = await generateConstructionUpdate(newTotal, TARGET_AMOUNT);
        setLatestUpdate(updateText);
    } catch (e) {
        // Keep old update if fail
    } finally {
        setIsUpdateLoading(false);
    }
  };

  const progressPercentage = Math.min((totalRaised / TARGET_AMOUNT) * 100, 100);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main>
        <Hero />

        {/* Stats & Progress Section */}
        <section id="progress" className="py-20 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-white wave-bg opacity-50 z-0 pointer-events-none"></div>
             
             <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-ocean-900 mb-4">Status Pembangunan</h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">Pantau terus perkembangan pembangunan Alfath Nusantara secara real-time. Transparansi adalah kunci kepercayaan kami.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left: Progress Visuals */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Progress Bar */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-ocean-100">
                             <div className="flex justify-between items-end mb-4">
                                <div>
                                    <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">Total Dana Terkumpul</p>
                                    <p className="text-4xl font-bold text-ocean-600">Rp {totalRaised.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-500">Target</p>
                                    <p className="text-xl font-bold text-slate-700">Rp {TARGET_AMOUNT.toLocaleString('id-ID')}</p>
                                </div>
                             </div>
                             
                             <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden relative">
                                <div 
                                    className="h-full bg-gradient-to-r from-ocean-500 to-ocean-400 rounded-full transition-all duration-1000 ease-out relative"
                                    style={{ width: `${progressPercentage}%` }}
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                                </div>
                             </div>
                             <div className="mt-2 flex justify-between text-xs font-semibold text-ocean-800">
                                <span>0%</span>
                                <span>{progressPercentage.toFixed(1)}%</span>
                                <span>100%</span>
                             </div>

                             <div className="mt-8">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Map className="w-5 h-5 text-gold-500"/> Peta Dana</h3>
                                <ProgressChart data={chartData} />
                             </div>
                        </div>

                        {/* Construction Phase Card with Blueprint Effect */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div 
                                className="bg-ocean-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), 
                                                      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Ship className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-mono mb-4 border border-white/20">
                                        BLUEPRINT STATUS: ACTIVE
                                    </div>
                                    <h3 className="text-lg font-bold text-gold-400 mb-1">Fase Konstruksi</h3>
                                    <p className="text-3xl font-bold mb-4 tracking-wide">{BuildingPhase.KEEL_LAYING}</p>
                                    <p className="text-ocean-100 text-sm border-t border-white/10 pt-4 mt-2">
                                        Pemasangan struktur dasar kapal yang menjadi tulang punggung kekuatan Alfath Nusantara.
                                    </p>
                                </div>
                            </div>
                            
                            <UpdateCard 
                                date={new Date().toLocaleDateString('id-ID')} 
                                text={latestUpdate} 
                                isLoading={isUpdateLoading}
                            />
                        </div>
                    </div>

                    {/* Right: Donation Form (Sticky on Desktop) */}
                    <div className="lg:col-span-1 lg:sticky lg:top-24" id="donate">
                        <DonationForm onDonate={handleNewDonation} />
                    </div>
                </div>
             </div>
        </section>

        {/* Donors Wall */}
        <section id="donors" className="py-20 bg-ocean-50">
            <div className="container mx-auto px-4">
                 <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-ocean-900 mb-2">Pahlawan Nusantara</h2>
                        <p className="text-slate-600">Mereka yang telah menanamkan jejak di lautan sejarah.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Users className="w-5 h-5 text-ocean-500" />
                        <span className="font-bold text-slate-700">{donations.length} Donatur</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donations.map((donor) => (
                        <div key={donor.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center text-white font-bold text-lg">
                                        {donor.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">{donor.name}</p>
                                        <p className="text-xs text-slate-500">{new Date(donor.timestamp).toLocaleDateString('id-ID')}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-ocean-600 bg-ocean-50 px-3 py-1 rounded-full text-sm">
                                    Rp {donor.amount.toLocaleString('id-ID')}
                                </span>
                            </div>
                            {donor.message && (
                                <p className="text-slate-600 text-sm italic mb-4">"{donor.message}"</p>
                            )}
                            {donor.aiResponse && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <p className="text-xs font-bold text-wood-800 mb-1 flex items-center gap-1">
                                        <Ship className="w-3 h-3" /> Pesan Kapten:
                                    </p>
                                    <p className="text-sm text-wood-600 leading-relaxed font-serif">
                                        {donor.aiResponse}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>

      <Footer />

      {/* Thank You Modal */}
      {showModal && lastDonation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl transform transition-all scale-100">
                <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                >
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 font-serif">Donasi Berhasil!</h3>
                    <p className="text-slate-500">Terima kasih atas kontribusi Anda.</p>
                </div>

                <div className="bg-ocean-50 rounded-xl p-5 mb-6 border border-ocean-100">
                    <p className="text-center font-serif text-lg text-ocean-900 mb-2">Dari Meja Kapten:</p>
                    <p className="text-center text-slate-700 italic leading-relaxed">
                        "{lastDonation.aiResponse}"
                    </p>
                </div>

                <Button onClick={() => setShowModal(false)} className="w-full">
                    Kembali ke Beranda
                </Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;