'use client';

import React from 'react';
import { Text } from '@/components/Text';
import { Button } from '@/components/ui/button';
import { CrewCard } from '@/components/Card/CrewCard';
import { Badge } from '@/components/Badge';
import { PostButton } from '@/components/PostButton';

import { PATH } from '@/constants/paths';
import { useRouter } from 'next/navigation';

/**
 * 나의 크루 탭
 */
const MyCrew = () => {
  const router = useRouter();
  return (
    <>
      <div className="container px-5 pb-6 pt-20">
        <div className="flex items-center gap-2 py-6 ">
          <Text.lg className="font-semibold">
            <h3>내가 개설한 크루</h3>
          </Text.lg>
          <Button className="p-2 pb-1.5 h-fit mb-0.5" variant="ghost">
            <Text.base className="text-[#464646]">더 보기</Text.base>
          </Button>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-3 tablet:grid-cols-1 mobile:grid-cols-1 SE:grid-cols-1 S2:grid-cols-1">
            <CrewCard
              ownerName="이경학"
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
            />
            <CrewCard
              title="크루명은 최대 15자 입니다."
              ownerName="이경학"
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
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between gap-2 pt-[30px] pb-6 ">
            <Text.lg className="font-semibold">
              <h3>나의 크루</h3>
            </Text.lg>
            <PostButton
              className="mr-4 px-2"
              onPageMove={() => router.push(PATH.community, { scroll: false })}
            >
              <Text.xxs className="ml-1 font-bold">
                모집중인 크루 보러가기
              </Text.xxs>
            </PostButton>
          </div>
          <div className="grid grid-cols-2 gap-3 tablet:grid-cols-1 mobile:grid-cols-1 SE:grid-cols-1 S2:grid-cols-1">
            <CrewCard
              title="크루명은 최대 15자 입니다."
              ownerName="이경학"
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
            />
            <CrewCard
              title="크루명은 최대 15자 입니다."
              ownerName="이경학"
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCrew;
