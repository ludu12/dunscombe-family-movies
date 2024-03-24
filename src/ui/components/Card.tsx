import { PlayIcon } from '@heroicons/react/24/outline';

export function Card({
  name,
  description,
  shortDescription,
}: {
  name: string;
  description: string;
  shortDescription: string;
}) {
  return (
    <div className="card flex-grow bg-base-100 shadow-xl overflow-hidden">
      <div className="card-body">
        <h3 className="text-sm italic overflow-hidden overflow-ellipsis whitespace-nowrap">{name}</h3>
        <h2 className="card-title">{shortDescription}</h2>
        <p
          className={
            'line-clamp-3 overflow-hidden overflow-ellipsis whitespace-pre-wrap text-sm'
          }
        >
          {description}
        </p>
        <div className="card-actions justify-end">
          <PlayIcon className={'h-6'} />
        </div>
      </div>
    </div>
  );
}
