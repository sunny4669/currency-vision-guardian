import { DetectionResult } from '@/types';

// This is a mock service that simulates currency detection using a CNN model
// In a real app, this would connect to a backend service or use a web-based ML model

export const detectCurrency = (file: File): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    // Simulate processing time between 1.5 and 3 seconds
    const processingTime = Math.random() * 1500 + 1500;
    
    setTimeout(() => {
      // For demo purposes, we'll randomly determine if a note is genuine 
      // with some slight bias toward genuine results
      const randomValue = Math.random();
      const isGenuine = randomValue > 0.3;
      
      // Higher confidence for results closer to the extremes
      let confidence;
      if (isGenuine) {
        confidence = 0.75 + (Math.random() * 0.2); // 75-95% confidence for genuine
      } else {
        confidence = 0.8 + (Math.random() * 0.15); // 80-95% confidence for fake
      }
      
      resolve({
        isGenuine,
        confidence,
        processingTime,
        modelUsed: 'CNN-CurrencyNet v1.2',
      });
    }, processingTime);
  });
};

// Process an image URL instead of a file (for sample images)
export const detectCurrencyFromUrl = (imageUrl: string): Promise<DetectionResult> => {
  return new Promise((resolve) => {
    // Create a new image object to load the URL
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    
    img.onload = () => {
      // Simulate processing time between 1.5 and 3 seconds
      const processingTime = Math.random() * 1500 + 1500;
      
      setTimeout(() => {
        // For sample images, determine genuineness based on the URL
        // This allows us to consistently classify sample images
        const isGenuine = imageUrl.includes('genuine');
        
        // Add some randomness to confidence but keep it high
        const confidence = 0.85 + (Math.random() * 0.1); // 85-95%
        
        resolve({
          isGenuine,
          confidence,
          processingTime,
          modelUsed: 'CNN-CurrencyNet v1.2',
        });
      }, processingTime);
    };
    
    img.onerror = () => {
      // Handle image loading error
      resolve({
        isGenuine: false,
        confidence: 0.99,
        processingTime: 500,
        modelUsed: 'CNN-CurrencyNet v1.2 (Error Mode)',
      });
    };
  });
};
