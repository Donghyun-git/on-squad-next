'use client';

import React from 'react';

import { Article } from '@/components/Article';
import { Text } from '@/components/Text';
import { Button } from '@/components/ui/button';

const MainDashboard = () => {
  return (
    <>
      <Article
        className="w-full shadow-sm basis-2/5 min-h-96"
        slot={
          <div>
            <div className="flex items-center justify-between">
              <Text.lg className="font-semibold">
                <h3>크루 랭킹</h3>
              </Text.lg>
              <Button className="px-2 py-1.5 h-fit" variant="ghost">
                더보기
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center mt-24 grow gap-9">
              <Text.sm className="font-semibold">크루 랭킹이 없습니다.</Text.sm>
              <Button className="w-full">크루 개설하기</Button>
            </div>
          </div>
        }
      />
      <Article
        className="w-full shadow-sm basis-3/5 min-h-96"
        slot={
          <div className="flex flex-col gap-6">
            <div>
              <Text.lg className="font-semibold">
                <h3>크루에 합류하기</h3>
              </Text.lg>
            </div>

            <div className="font-semibold">
              <Text.base>크루를 개설하고 크루원을 모집하세요.</Text.base>
            </div>
          </div>
        }
      />
    </>
  );
};

export default MainDashboard;
