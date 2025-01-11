'use client';

import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Article } from '@/components/Article';
import { Text } from '@/components/Text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/Avatar';
import { Badge } from '@/components/Badge';
import { PencilLine, Star } from 'lucide-react';
import { PostButton } from '@/components/PostButton';

const AnnounceList = () => {
  const router = useRouter();

  useLayoutEffect(() => {
    const body = document.body;

    body.style.backgroundColor = '#F9FAFB';

    return () => {
      body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="container px-0 pt-14 overflow-hidden">
      <div className="tablet:mx-0 mobile:mx-0 SE:mx-0 S2:mx-0 mx-5 mt-6">
        <Article
          className="w-full p-3 min-h-[360px]"
          slot={
            <>
              <div className="flex justify-between items-center">
                <Text.lg className="font-bold">
                  <h5>공지사항</h5>
                </Text.lg>

                <PostButton
                  className="border border-primary px-2 py-0.5"
                  onPageMove={() => alert('fuck')}
                >
                  <PencilLine size={12} strokeWidth={2} />
                  <Text.xxs className="ml-1 font-bold">글쓰기</Text.xxs>
                </PostButton>
              </div>
              <ScrollArea className="mt-6 h-[68dvh]">
                <ul className="flex flex-col px-4">
                  {/* TODO: 서버데이터로 교체 필요 */}
                  {Array.from({ length: 20 }).map((_, index) => (
                    <li
                      key={index}
                      className="cursor-pointer"
                      onClick={() => router.push('/crews/1/announce')}
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
                          {/* TODO: 공지사항 상단고정 서버 데이터일때만  */}
                          <Star size={16} fill="#FFCD29" stroke="#FFCD29" />
                        </div>
                        <div className="footer flex justify-between items-center">
                          <div className="flex gap-[3px] items-center">
                            <div className="flex gap-0.5 items-center">
                              <Avatar className="w-4 h-4" />
                              <Text.xs className="pt-[0.05rem]">
                                홍길동 크루장
                              </Text.xs>
                            </div>
                            <Badge className="px-0.5 py-0">
                              <Text.xxs>크루장</Text.xxs>
                            </Badge>
                          </div>
                          <div>
                            <Text.xs className="text-grayscale500">
                              2024-10-12
                            </Text.xs>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </>
          }
        />
      </div>
    </div>
  );
};

export default AnnounceList;
