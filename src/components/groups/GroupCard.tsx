import { Group } from '../../types';

// src/components/groups/GroupCard.tsx
interface GroupCardProps {
  group: Group;
  isSelected: boolean;
  onClick: () => void;
}

export function GroupCard({ group, isSelected, onClick }: GroupCardProps) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <h4 className="font-medium">{group.getNameTranslation()}</h4>
      <p className="text-2xl my-2">{group.emojis}</p>
      <p className="text-sm text-gray-500">{group.numActiveThings} things</p>
    </div>
  );
}
