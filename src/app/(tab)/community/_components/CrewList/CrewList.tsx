'use client';

import React from 'react';
import { CrewCard } from '@/components/Card/CrewCard';
import { Badge } from '@/components/Badge';
import { useRouter } from 'next/navigation';

//TODO: 검색어가 있다면 데이터를 props로 받아서 뿌린다.
const CrewList = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-3 pt-6 tablet:grid-cols-1 mobile:grid-cols-1 SE:grid-cols-1 S2:grid-cols-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <CrewCard
          key={index}
          title="크루명은 최대 15자 입니다."
          description="크루소개는 아무리 길어도 상관 없습니다. 크루소개는 아무리 길어도 상관 없습니다."
          tagSlot={
            <>
              {['이경학', '이경학', '이경학', '이경학', '화로상회'].map(
                (card, i) => (
                  <Badge key={i}>{card}</Badge>
                ),
              )}
            </>
          }
          // TODO: 서버데이터의 각 리스트의 키값을 slug로 넘긴다.
          onClick={() => router.push(`/crews/${1}`)}
        />
      ))}
    </div>
  );
};

export default CrewList;
