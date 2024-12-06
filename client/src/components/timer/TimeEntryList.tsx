import { useState } from 'react';

interface TimeEntryProps {
  onSubmit: (entry: {
    startTime: string;
    endTime: string;
    description?: string;
  }) => void;
  onClose: () => void;
  isOpen: boolean;
}

const TimeEntryList = ({ onSubmit, onClose, isOpen }: TimeEntryProps) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-800 p-4 rounded-lg">
        <h3 className="text-lg mb-4">Manual Time Entry</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ startTime, endTime, description });
          onClose();
        }}>
          <div className="space-y-4">
            <div>
              <label>Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-zinc-700 p-2 rounded"
              />
            </div>
            <div>
              <label>End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-zinc-700 p-2 rounded"
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-700 p-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimeEntry;