type Props = { items: string[] };

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <div className="flex w-full items-center h-fit gap-2 text-muted-foreground whitespace-nowrap">
      {items
        .map((item, i) => <span key={i}>{item}</span>)
        .flatMap((item, i, array) =>
          array.length - 1 !== i
            ? [
                item,
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
                />,
              ]
            : item,
        )}
    </div>
  );
};
