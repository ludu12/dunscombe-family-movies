import {PlayIcon} from '@heroicons/react/24/outline';

export function Card({
                       name, description, shortDescription
                     }: {
  name: string;
  description: string;
  shortDescription: string;
}) {

  return (
      <div className="card bg-base-100 shadow-xl flex-grow">
        <div className="card-body">
          <h3 className="text-sm italic">{name}</h3>
          <h2 className="card-title">{shortDescription}</h2>
          <p className={"text-sm line-clamp-3 overflow-ellipsis whitespace-pre-wrap overflow-hidden"}>{description}</p>
          <div className="card-actions justify-end">
            <PlayIcon className={'h-6'}/>
          </div>
        </div>
      </div>
  )
}
