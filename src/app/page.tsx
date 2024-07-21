//임시
'use client';

import { Text } from '@/components/Text';
import { Searchbar } from '@/components/Searchbar';
import { Article } from '@/components/Article';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

/**
 * 랜딩
 */
export default function Home() {
  const handlePageMove = () => {
    return;
  };

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="container px-2">
        <div className="w-full bg-[#144A7D] ease-linear p-9 flex justify-between items-center rounded-xl mt-6">
          <div className="text-white font-semibold">
            <Text.lg className="mb-1">모임이 좋았을 뿐인데,,,</Text.lg>
            <Text.xxl className="mb-2">
              <h2 className="flex items-center">
                점점 <Text.xxxl className="font-extrabold ml-1">부담</Text.xxxl>
                이 되고 있다면?
              </h2>
            </Text.xxl>
            <div className="flex items-center gap-3">
              <Image
                src="/icons/onsquad_logo.svg"
                alt="온스쿼드 로고"
                width={200}
                height={50}
              />
              <Text.lg>에 합류하세요!</Text.lg>
            </div>
          </div>
          <Image
            src="/images/main_banner.svg"
            width={350}
            height={240}
            alt="온스쿼드 배너"
          />
        </div>
        <div className="mt-6 mb-14 w-1/2 mx-auto">
          <Searchbar onSubmit={async () => console.log('d')} />
        </div>

        <section className="flex items-center w-full justify-center gap-4">
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
      </div>
    </div>
  );
}
