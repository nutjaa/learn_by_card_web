import { Group } from '../../types';
import { CardsIcon, CrownIcon } from '../ui/icons';
import styles from './GroupCard.module.css';  


// src/components/groups/GroupCard.tsx
interface GroupCardProps {
  group: Group;
  isSelected: boolean;
  onClick: () => void;
}

const backgroundColors = [
  'bg-indigo-50',
  'bg-blue-50',
  'bg-teal-50',
  'bg-green-50',
  'bg-red-50',
  'bg-lime-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-yellow-50',
  'bg-orange-50',
  'bg-cyan-50',
  'bg-emerald-50',
  'bg-violet-50',
  'bg-rose-50',
];

const textColors = [
  'text-indigo-700',
  'text-blue-700',
  'text-teal-700',
  'text-green-700',
  'text-red-700',
  'text-lime-700',
  'text-purple-700',
  'text-pink-700',
  'text-yellow-700',
  'text-orange-700',
  'text-cyan-700',
  'text-emerald-700',
  'text-violet-700',
  'text-rose-700',
];

export function GroupCard({ group, isSelected, onClick }: GroupCardProps) {
  // Split emojis to show first and last
  const firstEmoji = group.emoji1 || '';
  const lastEmoji = group.emoji2 || '';

  // Generate consistent random background based on group ID or name
  const getColorIndex = () => {
    const hash = group.id ? group.id.toString() : group.getNameTranslation();
    let hashValue = 0;
    for (let i = 0; i < hash.length; i++) {
      hashValue = hash.charCodeAt(i) + ((hashValue << 5) - hashValue);
    }
    return Math.abs(hashValue) % backgroundColors.length;
  };

  const colorIndex = getColorIndex();
  const backgroundColor = backgroundColors[colorIndex];
  const textColor = textColors[colorIndex];

  return (
    <a
      className={`group block rounded-lg border cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-50 border-blue-500'
          : `${backgroundColor} border-gray-200 hover:border-gray-300`
      }`}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className={`text-2xl ${styles.emoji}`}>{firstEmoji}</span>
          </div>
          <div className="flex-1 text-center">
            <div className={`font-medium text-nowrap truncate  ${textColor}`}>
              {group.getNameTranslation()}
            </div>
            <div className="text-gray-500 text-sm mt-1">
              <span className="inline-flex items-center gap-1">
                <CardsIcon />
                {group.numActiveThings}
              </span>
              <span className="mx-2">•</span>
              <span
                title="Premium cards"
                className="inline-flex items-center gap-1"
              >
                <CrownIcon />0
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className={`text-2xl ${styles.emoji}`}>{lastEmoji}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
