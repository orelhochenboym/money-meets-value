import { formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { SearchResult } from 'yahoo-finance2/dist/esm/src/modules/search';
import { Card, CardContent } from '../../../../components/ui/card';

type Props = { search: SearchResult };

export const CompanyNews: React.FC<Props> = ({ search }) => {
  return (
    <Card className="col-span-2 h-full w-full">
      <div className="flex h-fit w-full justify-start border-b p-2 font-medium">
        Company News
      </div>
      <CardContent className="grid grid-flow-row auto-rows-fr grid-cols-3 gap-4 p-4">
        {search.news
          .sort(
            (a, b) =>
              b.providerPublishTime.getTime() - a.providerPublishTime.getTime(),
          )
          .map((news) => {
            return (
              <Link
                className="hover:bg-accent flex w-full flex-col gap-2 rounded-lg p-4 text-start focus-within:outline-none focus-within:ring-2 focus-within:ring-inset"
                key={news.uuid}
                rel="noopener noreferrer"
                target="_blank"
                href={news.link}
              >
                <div className="text-muted-foreground flex h-fit w-full justify-between text-xs font-medium">
                  <span className="flex-1">{news.publisher}</span>
                  <span className="shrink-0">{`${formatDistanceToNowStrict(
                    news.providerPublishTime,
                  )} ago`}</span>
                </div>
                <p className="line-clamp-2 w-full font-medium">{news.title}</p>
              </Link>
            );
          })}
      </CardContent>
    </Card>
  );
};
