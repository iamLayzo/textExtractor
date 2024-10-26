import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full my-4">
      <p className="text-white">Progress: {(progress * 100).toFixed(2)}%</p>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div
          className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
