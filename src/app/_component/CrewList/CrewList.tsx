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

const CrewList = () => {
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
                onPageMove={() => alert('작성버튼')}
              >
                <Text.xxs className="ml-1 font-bold">크루 개설하기</Text.xxs>
                <Plus size={12} strokeWidth={2} />
              </PostButton>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-6 tablet:grid-cols-1 mobile:grid-cols-1 SE:grid-cols-1 S2:grid-cols-1">
              <CrewCard
                title="크루명은 최대 15자 입니다."
                description="크루소개는 아무리 길어도 상관 없습니다. 크루소개는 아무리 길어도 상관 없습니다."
                tagSlot={
                  <>
                    {[
                      '모집중',
                      '멤버 수 50+',
                      '이 곳은',
                      '서버데이터',
                      '뿌립니다',
                      'TODO',
                      'FIXME',
                    ].map((tag, i) => (
                      <Badge key={i}>{tag}</Badge>
                    ))}
                  </>
                }
              />
              <CrewCard
                title="크루명은 최대 15자 입니다."
                description="크루소개는 아무리 길어도 상관 없습니다. 크루소개는 아무리 길어도 상관 없습니다."
                tagSlot={
                  <>
                    {['모집중', '게임광', '오버워치', '롤', '배틀그라운드'].map(
                      (tag, i) => (
                        <Badge key={i}>{tag}</Badge>
                      ),
                    )}
                  </>
                }
              />
              <CrewCard
                title="크루명은 최대 15자 입니다."
                description="크루소개는 아무리 길어도 상관 없습니다. 크루소개는 아무리 길어도 상관 없습니다."
                tagSlot={
                  <>
                    {[
                      'PUBG 파트너',
                      'POTG 제조기',
                      '매너있는사람',
                      '서울',
                      '평택',
                      '일산',
                    ].map((tag, i) => (
                      <Badge key={i}>{tag}</Badge>
                    ))}
                  </>
                }
              />
            </div>
          </div>
        }
      />
      <div className="flex justify-center pb-6">
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
