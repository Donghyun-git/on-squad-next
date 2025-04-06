'use client';

import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CrewCard } from '@/components/Card/CrewCard';
import { Badge } from '@/components/Badge';
import { useRouter } from 'next/navigation';
import { CrewListResponseProps } from '@/api/crew/crewListGetFetch';
import { CREW_LIST_QUERY_KEY } from '@/services/options/crewListOptions';

interface CrewListDataProps {
  list: PropType<CrewListResponseProps, 'data'>;
}

//TODO: 검색어가 있다면 데이터를 props로 받아서 뿌린다.
const CrewList = ({ list: crewList }: CrewListDataProps) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-2 gap-3 pt-6 tablet:grid-cols-1 mobile:grid-cols-1 SE:grid-cols-1 S2:grid-cols-1">
      {crewList?.map((crew) => (
        <CrewCard
          key={crew.id}
          crewImage={crew.imageUrl || '/images/mock1.png'}
          ownerName={crew.crewOwner.nickname}
          title={crew.name}
          description={crew.introduce}
          tagSlot={crew.hashtags.map((tag, i) => {
            if (i === 0) {
              return <Badge key={i}>멤버 수 {tag}+</Badge>;
            }
            return <Badge key={i}>{tag}</Badge>;
          })}
          // TODO: 서버데이터의 각 리스트의 키값을 slug로 넘긴다.
          onClick={() => router.push(`/crews/${crew.id}`, { scroll: false })}
        />
      ))}
    </div>
  );
};

export default CrewList;
