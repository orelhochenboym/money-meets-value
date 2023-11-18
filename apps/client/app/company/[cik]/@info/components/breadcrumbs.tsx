type Props = { items: string[] };

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <div className="text-muted-foreground flex h-fit w-fit items-center gap-2 whitespace-nowrap">
      {items
        .map((item, i) => <span key={i}>{item}</span>)
        .flatMap((item, i, array) =>
          array.length - 1 !== i
            ? [
                item,
                <div
                  key={i}
                  className="bg-muted-foreground h-1.5 w-1.5 rounded-full"
                />,
              ]
            : item,
        )}
    </div>
  );
};
