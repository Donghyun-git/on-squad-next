'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Settings, Star } from 'lucide-react';
import { Avatar } from '@/components/Avatar';
import dayjs from 'dayjs';

import { Article } from '@/components/Article';
import { Text } from '@/components/Text';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

import { Badge } from '@/components/Badge';
import { Slider } from '@/components/Slider';

import { cn } from '@/lib/utils';
import { PostButton } from '@/components/PostButton';
import { Card } from '@/components/Card';
import { CrewHomeInfoResponseProps } from '@/api/crew/crewHomeInfoGetFetch';

type CrewHomeDataType = PropType<CrewHomeInfoResponseProps, 'data'>;

interface CrewHomeProps {
  data?: CrewHomeDataType;
}

const CrewHome = ({ data }: CrewHomeProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const body = document.body;

    body.style.backgroundColor = '#F9FAFB';

    return () => {
      body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="container px-0 pt-14 min-h-[calc(100vh)]">
      <div className="w-full tablet:w-full mobile:w-full SE:w-full S2:w-full bg-white cursor-pointer hover:shadow-md transition-all duration-200">
        <div className="relative overflow-hidden w-full h-[360px] tablet:w-full mobile:w-full SE:w-full S2:w-full ">
          <Image
            src={data?.crew?.imageUrl || '/images/mock1.png'}
            alt="크루이미지"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full px-4"
          />
          <div className="flex-col absolute bottom-0 left-0 w-full py-2 px-5 flex text-white bg-gradient-to-t from-black via-black/30 to-transparent backdrop-blur-sm  font-bold overflow-hidden truncate gap-3  bg-black bg-opacity-20">
            <div className="flex justify-between items-center ">
              <Text.base className="font-medium">크루 스페이스</Text.base>

              <Button
                variant="ghost"
                className="text-grayscale50 px-2 hover:bg-[0] hover:text-inherit active:bg-[0] active:scale-110"
              >
                {/* TODO: 크루 오너일 경우에만 버튼 활성화 및 block 처리 */}
                <Settings size={20} />
              </Button>
              {/* <Badge className="bg-primary text-black">모집중</Badge> */}
            </div>
            <Text.xl className="font-semibold">{data?.crew?.name}</Text.xl>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Slider
          slot={[
            <Article
              key="notice"
              className="w-full p-3 min-h-[360px]"
              slot={
                <>
                  <div className="flex justify-between items-center">
                    <Text.lg className="font-bold">
                      <h5>공지사항</h5>
                    </Text.lg>

                    <Button
                      className="hover:bg-[0] hover:text-grayscale600 active:text-grayscale600 active:bg-[0] active:scale-110 text-grayscale500"
                      variant="ghost"
                    >
                      <Text.xs>더보기</Text.xs>
                    </Button>
                  </div>
                  <ul className="mt-8 flex flex-col">
                    {data && data.announces.length > 0 ? (
                      data?.announces.map((announce, index) => (
                        <li
                          key={index}
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(`/crews/${data.crew.id}/announce`)
                          }
                        >
                          <div
                            className={cn(
                              'flex flex-col justify-center gap-2 border-t border-grayScale400 mt-2',
                              index === 0 && 'border-none',
                            )}
                          >
                            <div className="flex justify-between mt-2">
                              <Text.base className="font-semibold">
                                크루 규정 안내(신규 크루원 필독)
                              </Text.base>
                              {announce.fixed && (
                                <Star
                                  size={16}
                                  fill="#FFCD29"
                                  stroke="#FFCD29"
                                />
                              )}
                            </div>
                            <div className="footer flex justify-between items-center">
                              <div className="flex gap-[3px] items-center">
                                <div className="flex gap-0.5 items-center">
                                  <Avatar className="w-4 h-4" />
                                  <Text.xs className="pt-[0.05rem]">
                                    {announce.memberInfo.nickname}
                                  </Text.xs>
                                </div>
                                <Badge className="px-0.5 py-0">
                                  <Text.xxs>크루장</Text.xxs>
                                </Badge>
                              </div>
                              <div>
                                <Text.xs className="text-grayscale500">
                                  {dayjs(announce.createdAt).format(
                                    'YYYY년 MM월 DD일',
                                  )}
                                </Text.xs>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <Text.xl> 등록된 공지사항이 없어요.</Text.xl>
                      </li>
                    )}
                  </ul>
                </>
              }
            />,
            <Article
              key="info"
              className="w-full p-3 min-h-[360px]"
              slot={
                <div className="flex flex-col gap-3 min-h-[360px]">
                  <Text.lg className="font-bold mb-1">
                    <h5>{data?.crew.name}</h5>
                  </Text.lg>

                  <div className="flex gap-2 items-center">
                    <Text.base className="font-semibold">크루장</Text.base>
                    <div className="flex gap-1">
                      <Avatar className="w-4 h-4" />
                      <Text.xs className="font-medium pt-[0.05rem]">
                        {data?.crew.crewOwner.nickname}
                      </Text.xs>
                    </div>
                  </div>
                  <div>
                    <Text.xs>{data?.crew.introduce}</Text.xs>
                  </div>

                  <div className="flex gap-1 mt-1">
                    <Text.base className="font-semibold mb-1">
                      <h5>크루 상세정보</h5>
                    </Text.base>
                  </div>

                  <div>
                    <Text.xs>{data?.crew.detail}</Text.xs>
                  </div>

                  <div className="flex gap-1 flex-wrap items-center mt-auto">
                    {/* TODO: 후에 서버데이터 */}
                    {data?.crew.hashtags.map((tag, index) => {
                      if (index === 0) {
                        return <Badge key={index}>멤버 수 {tag}+</Badge>;
                      }
                      return <Badge key={index}>{tag}</Badge>;
                    })}
                  </div>
                </div>
              }
            />,
          ]}
        />
        <div className="flex flex-col items-center gap-6 mt-9 mx-5">
          <Article
            className="w-full p-3"
            slot={
              <>
                <div className="flex justify-between items-center">
                  <Text.lg className="font-semibold">
                    <h5>크루원 활동 랭킹</h5>
                  </Text.lg>

                  <Button
                    className="hover:bg-[0] active:bg-[0] active:scale-110 text-grayscale500 hover:text-grayscale600 active:text-grayscale60"
                    variant="ghost"
                  >
                    <Text.xs>랭킹 더보기</Text.xs>
                  </Button>
                </div>
                <div className="mt-6">
                  <ul>
                    {/* TODO: 서버데이터 교체 필요 */}
                    {data?.topMembers.map((member, index) => (
                      <li key={index}>
                        <div
                          className={cn(
                            'flex items-center py-2 gap-3 border-t border-grayScale400',
                            index === 0 && 'border-none',
                          )}
                        >
                          <Text.xs className="inline-block font-bold">
                            {member.rank}위
                          </Text.xs>
                          <div className="flex gap-[3px] items-center">
                            <div className="flex gap-0.5 items-center">
                              <Avatar className="w-5 h-5 mr-1" />
                              <Text.base className="pt-[0.09rem] font-semibold">
                                {member.nickname}
                              </Text.base>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            }
          />

          <div className="w-full">
            <div className="mb-3 flex justify-between items-center">
              <Text.lg className="font-bold">
                <h5>모집중인 스쿼드</h5>
              </Text.lg>
              <PostButton
                className="border border-primary"
                onPageMove={() => alert('스쿼드 모집하기')}
              >
                <Text.xxs className="ml-1 font-bold">스쿼드 모집하기</Text.xxs>
                <Plus className="pb-0.5" size={10} strokeWidth={2} />
              </PostButton>
            </div>

            <div className="flex flex-col gap-3 pb-10">
              {data?.squads.map((squad, index) => (
                <Card
                  key={index}
                  onClick={() => alert('cardlist fuck')}
                  title={
                    <div className="flex justify-between items-center">
                      <Text.sm className="font-bold py-3">
                        <h5>{squad.title}</h5>
                      </Text.sm>
                      <div className="flex items-center gap-2">
                        {squad.categories.slice(0, 2).map((tag, index) => (
                          <Badge key={index}>{tag}</Badge>
                        ))}
                        <Badge>
                          {squad.remain}/{squad.capacity} 명
                        </Badge>
                      </div>
                    </div>
                  }
                >
                  <div className="flex gap-1">
                    <Avatar className="w-4 h-4" />
                    <Text.xs className="font-medium pt-[0.05rem]">
                      {squad.squadOwner.nickname}
                    </Text.xs>
                  </div>
                  <div className="max-h-14 line-clamp-4 text-ellipsis mt-2">
                    <Text.xs className="font-medium">{squad.content}</Text.xs>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewHome;
