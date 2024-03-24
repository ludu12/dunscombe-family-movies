export function Card({
                       name, description, shortDescription
                     }: {
  name: string;
  description: string;
  shortDescription: string;
}) {
  return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h3 className="text-sm font-medium">{name}</h3>
        </div>
        <div className={`truncate rounded-xl bg-white px-4 py-8 text-lg h-36`}>
          <p>
            {shortDescription}
          </p>
          <p className={'text-sm line-clamp-3 overflow-ellipsis whitespace-pre-wrap overflow-hidden'}>
            {description}
          </p>
        </div>
      </div>
  );
}
