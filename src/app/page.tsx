//TODO: page 컴포넌트 서버컴포넌트로 분리하고 handler를 사용하는 section 별로 클라이언트 컴포넌트로 분리해야한다.
'use client';
import { useState } from 'react';

import { Text } from '@/components/Text';
import { Searchbar } from '@/components/Searchbar';
import { Article } from '@/components/Article';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PostButton } from '@/components/PostButton';
import { Plus } from 'lucide-react';

import { CrewCard } from '@/components/Card/CrewCard';
import { Badge } from '@/components/Badge';

/**
 * 랜딩
 */
export default function Home() {
  return (
    <div className="w-full h-full bg-gray-50">
      <div className="container px-2">
        <div className="w-full bg-[#144A7D] ease-linear p-9 flex justify-between items-center rounded-xl mt-6 mobile:flex-col tablet:flex-col SE:flex-col S2:flex-col">
          <Image
            src="/images/main_banner.svg"
            width={220}
            height={110}
            className="mobile:inline-block hidden mobile:mb-12 tablet:inline-block tablet:mb-12 SE:inline-block S2:inline-block SE:mb-12 S2:mb-12"
            alt="온스쿼드 배너"
          />
          <div className="text-white font-semibold">
            <Text.lg className="mb-1 S2:text-sm">
              모임이 좋았을 뿐인데,,,
            </Text.lg>
            <Text.xxl className="mb-2">
              <h2 className="flex items-center S2:text-xs">
                점점{' '}
                <Text.xxxl className="font-extrabold ml-1 S2:text-xl">
                  부담
                </Text.xxxl>
                이 되고 있다면?
              </h2>
            </Text.xxl>
            <div className="flex flex-col gap-3 mobile:flex-row tablet:flex-row">
              <Image
                src="/icons/onsquad_logo.svg"
                alt="온스쿼드 로고"
                width={150}
                height={50}
              />
              <Text.lg>에 합류하세요!</Text.lg>
            </div>
          </div>
          <Image
            src="/images/main_banner.svg"
            width={220}
            height={110}
            className="mobile:hidden tablet:hidden SE:hidden S2:hidden"
            alt="온스쿼드 배너"
          />
        </div>
        <div className="mt-6 mb-14 w-1/2 mx-auto tablet:w-11/12 mobile:w-11/12 S2:w-11/12 SE:w-11/12">
          <Searchbar onSubmit={async () => alert('TODO: 검색 API')} />
        </div>

        <section className="flex items-center w-full justify-center gap-4 tablet:flex-col mobile:flex-col SE:flex-col S2:flex-col">
          <Article
            className="w-full shadow-sm basis-2/5 min-h-96"
            slot={
              <div>
                <div className="flex justify-between items-center">
                  <Text.lg className="font-semibold">
                    <h3>크루 랭킹</h3>
                  </Text.lg>
                  <Button className="px-2 py-1.5 h-fit" variant="ghost">
                    더보기
                  </Button>
                </div>
                <div className="grow flex flex-col items-center justify-center gap-9 mt-24">
                  <Text.sm>크루 랭킹이 없습니다.</Text.sm>
                  <Button>크루 개설하기</Button>
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
        </section>
        <section>
          <Article
            className="w-full min-h-96 bg-inherit"
            slot={
              <div>
                <div className="flex justify-between items-center">
                  <Text.lg className="font-semibold">
                    <h3>모집중인 크루</h3>
                  </Text.lg>
                  <PostButton
                    className="shadow-sm"
                    onPageMove={() => alert('작성버튼')}
                  >
                    <Text.xxs className="ml-1 font-bold">
                      크루 개설하기
                    </Text.xxs>
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
                        {[
                          '모집중',
                          '게임광',
                          '오버워치',
                          '롤',
                          '배틀그라운드',
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
        </section>
      </div>
    </div>
  );
}
