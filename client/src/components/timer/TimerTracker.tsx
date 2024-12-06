import { useState, useEffect } from 'react';
import TimeEntry from './TimeEntryList';

const TimeTracker = () => {
 const [isTracking, setIsTracking] = useState(false);
 const [elapsedTime, setElapsedTime] = useState(0);
 
 useEffect(() => {
   let interval: number;
   if (isTracking) {
     interval = setInterval(() => {
       setElapsedTime(prev => prev + 1);
     }, 1000);
   }
   return () => clearInterval(interval);
 }, [isTracking]);

 const formatTime = (seconds: number): string => {
   const hrs = Math.floor(seconds / 3600);
   const mins = Math.floor((seconds % 3600) / 60);
   const secs = seconds % 60;
   return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
 };

 return (
   <div className="mt-8">
     <h2 className="text-xl font-semibold mb-4">Time Tracker</h2>
     <div className="text-4xl font-mono mb-4">{formatTime(elapsedTime)}</div>
     <div className="flex gap-4">
       <button 
         onClick={() => setIsTracking(!isTracking)}
         className="bg-zinc-800 px-4 py-2 rounded"
       >
         {isTracking ? 'Stop' : 'Start'}
       </button>
       <button className="bg-zinc-800 px-4 py-2 rounded">
         Manual Entry
       </button>
     </div>
   </div>
 );
};

export default TimeTracker;