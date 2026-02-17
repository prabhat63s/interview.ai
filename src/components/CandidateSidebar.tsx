'use client';
import { CandidateInfo } from '@/types';
import { User, Briefcase, MapPin, DollarSign, Calendar } from 'lucide-react';

export default function CandidateSidebar({ info }: { info: CandidateInfo }) {
    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold border-b border-gray-700 pb-4">Candidate Profile</h3>

            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                        <User className="w-4 h-4" /> Name
                    </p>
                    <p className="font-medium">{info.name}</p>
                    <p className="text-xs text-gray-500 font-mono">{info.id}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                        <Briefcase className="w-4 h-4" /> Role
                    </p>
                    <p className="font-medium">{info.role}</p>
                    <p className="text-sm text-blue-400">{info.tool}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4" /> Experience
                    </p>
                    <p className="font-medium">{info.experience}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4" /> CTC Details
                    </p>
                    <p className="font-medium text-sm">Current: {info.currentCTC}</p>
                    <p className="font-medium text-sm text-cyan-400">Expected: {info.expectedCTC}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4" /> Relocation
                    </p>
                    <p className="font-medium">{info.relocation}</p>
                </div>

                {info.datetime && (
                    <div>
                        <p className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4" /> Date
                        </p>
                        <p className="font-medium text-sm">
                            {new Date(info.datetime).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
