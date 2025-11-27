import React from 'react';
import { Calendar, Hammer } from 'lucide-react';

interface UpdateCardProps {
    date: string;
    text: string;
    isLoading?: boolean;
}

export const UpdateCard: React.FC<UpdateCardProps> = ({ date, text, isLoading }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full">
            <div className="flex items-center gap-2 text-ocean-600 mb-3 text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
            </div>
            
            {isLoading ? (
                <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
            ) : (
                <div className="flex items-start gap-4">
                    <div className="bg-wood-400/20 p-2 rounded-lg shrink-0">
                        <Hammer className="w-5 h-5 text-wood-600" />
                    </div>
                    <p className="text-slate-700 leading-relaxed italic">
                        "{text}"
                    </p>
                </div>
            )}
        </div>
    )
}