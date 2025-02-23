'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PostButton } from '@/components/PostButton';
import { Text } from '@/components/Text';
import { Plus } from 'lucide-react';
import { Article } from '@/components/Article';
import { CrewCard } from '@/components/Card/CrewCard';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/paths';

import { type CrewListDataType } from '@/app/page';

export type CrewDataType = ArrayType<CrewListDataType>;

interface CrewListPropsType {
  list: CrewDataType[];
}

const CrewList = ({ list }: CrewListPropsType) => {
  const router = useRouter();

  return (
    <>
      <Article
        className="w-full min-h-96 bg-inherit"
        slot={
          <div>
            <div className="flex items-center justify-between">
              <Text.lg className="font-semibold">
                <h3>모집중인 크루</h3>
              </Text.lg>
              <PostButton
                className="shadow-sm"
                onPageMove={() => router.push(PATH.addCrew)}
              >
                <Text.xxs className="ml-1 font-bold">크루 개설하기</Text.xxs>
                <Plus size={12} strokeWidth={2} />
              </PostButton>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-6 tablet:grid-cols-1 mobile:grid-cols-1 SE:grid-cols-1 S2:grid-cols-1">
              {list && list.length > 0
                ? list.map((crew, index) => (
                    <CrewCard
                      key={index}
                      crewImage={crew.imageUrl}
                      ownerName={crew.crewOwner.nickname}
                      title={crew.name}
                      description={crew.introduce}
                      tagSlot={
                        <>
                          {crew.hashtags.map((tag, i) => {
                            if (i === 0) {
                              return <Badge key={i}>멤버 수 {tag}+</Badge>;
                            }
                            return <Badge key={i}>{tag}</Badge>;
                          })}
                        </>
                      }
                      onClick={() => router.push(`/crews/${crew.id}`)}
                    />
                  ))
                : null}
            </div>
          </div>
        }
      />
      <div className="flex justify-center pb-12">
        <Button
          className="p-2 h-fit font-semibold text-[#909090] hover:text-[#6C6C6C] active:text-[#464646]"
          variant="ghost"
          onClick={() => router.push(PATH.community)}
        >
          모집중인 크루 더 보러가기
        </Button>
      </div>
    </>
  );
};

export default CrewList;
