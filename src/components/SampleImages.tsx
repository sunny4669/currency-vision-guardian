
import React from 'react';
import { CurrencySample } from '@/types';
import { CheckCircle, XCircle } from 'lucide-react';

interface SampleImagesProps {
  samples: CurrencySample[];
  onSampleClick: (sample: CurrencySample) => void;
}

const SampleImages: React.FC<SampleImagesProps> = ({ samples, onSampleClick }) => {
  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <h2 className="text-xl font-medium mb-4">Sample Currency Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {samples.map((sample) => (
          <div
            key={sample.id}
            className="relative rounded-lg overflow-hidden border border-gray-700 bg-navy-light/30 hover:bg-navy-light/50 transition-colors cursor-pointer group"
            onClick={() => onSampleClick(sample)}
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={sample.imageUrl}
                alt={sample.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                <div className="p-3 w-full">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{sample.name}</span>
                    {sample.isGenuine ? (
                      <CheckCircle className="w-5 h-5 text-genuine" />
                    ) : (
                      <XCircle className="w-5 h-5 text-fake" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-2 right-2">
              {sample.isGenuine ? (
                <span className="text-xs bg-genuine text-black px-2 py-1 rounded-full font-medium">Genuine</span>
              ) : (
                <span className="text-xs bg-fake text-white px-2 py-1 rounded-full font-medium">Fake</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleImages;
