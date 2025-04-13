
import React from 'react';
import { CheckCircle, XCircle, BarChart3, Clock, Brain } from 'lucide-react';
import { DetectionResult } from '@/types';

interface ResultDisplayProps {
  result: DetectionResult | null;
  imageSrc: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, imageSrc }) => {
  if (!result || !imageSrc) return null;

  const confidencePercentage = Math.round(result.confidence * 100);
  
  return (
    <div className="w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="rounded-lg overflow-hidden border border-gray-700 bg-navy-light/30">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-medium">Detection Results</h3>
          <span className="text-sm text-muted-foreground flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {result.processingTime.toFixed(2)}ms
          </span>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="aspect-w-16 aspect-h-9 relative mb-4">
                <img
                  src={imageSrc}
                  alt="Analyzed currency"
                  className="w-full h-auto rounded-md object-contain"
                />
                
                <div className={`absolute inset-0 flex items-center justify-center rounded-md ${
                  result.isGenuine ? 'bg-genuine/10' : 'bg-fake/10'
                }`}>
                  {result.isGenuine ? (
                    <div className="bg-black/50 rounded-full p-4 animate-pulse-scan">
                      <CheckCircle className="w-12 h-12 text-genuine" />
                    </div>
                  ) : (
                    <div className="bg-black/50 rounded-full p-4 animate-pulse-scan">
                      <XCircle className="w-12 h-12 text-fake" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className={`flex items-center gap-2 text-2xl font-bold mb-4 ${
                result.isGenuine ? 'text-genuine' : 'text-fake'
              }`}>
                {result.isGenuine ? (
                  <>
                    <CheckCircle className="w-8 h-8" />
                    <span>Genuine Note</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8" />
                    <span>Fake Note Detected</span>
                  </>
                )}
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Confidence Score</span>
                  <span className="text-sm font-medium">{confidencePercentage}%</span>
                </div>
                <div className="accuracy-bar-container">
                  <div 
                    className={`accuracy-bar ${result.isGenuine ? 'bg-genuine' : 'bg-fake'}`} 
                    style={{ width: `${confidencePercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-navy rounded-md p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Classification confidence:</span>
                  <span className="font-medium">{confidencePercentage}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Brain className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Model:</span>
                  <span className="font-medium">{result.modelUsed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
