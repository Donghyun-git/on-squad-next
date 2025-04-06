'use client';

import React from 'react';
import { Spinner } from '@/components/Spinner';

const Loading = () => {
  return <Spinner helperText="데이터를 로딩중이에요 ..." splitCount={4} />;
};

export default Loading;
