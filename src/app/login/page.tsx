import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { squadListOptions } from "@/services/options/squadListOptions";
import { getQueryClient } from "@/services/get-query-client";

import { Button } from "@/components/ui/button";

const Login = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(squadListOptions);

  const info = await queryClient.getQueryData<Promise<{ title: string }[]>>([
    "@test",
  ]);

  console.log(info, "test");

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {info?.map((item) => (
          <>
            <h1>{item.title}</h1>
            <br />
          </>
        ))}
        <Button>로그인</Button>
      </HydrationBoundary>
    </>
  );
};

export default Login;
