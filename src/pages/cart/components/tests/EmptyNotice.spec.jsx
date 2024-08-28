import { screen } from '@testing-library/react';
import React from 'react';

import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

// Mocking
// -> 실제 모듈, 객체와 동일한 동작을 하도록 만든 모의 모듈, 객체(Mock)로 실제를 대체하는 것

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행
// useNavigate 훅으로 반환받은 navigate 함수가 올바르게 호출되었는가 -> 스파이 함수
const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  // 컴포넌트 내부에서 useNavigate호출시 선언한 spy 함수로 대체
  return { ...original, useNavigate: () => navigateFn };
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  await user.click(screen.getByText('홈으로 가기'));

  // 1번의 호출 및 '/' 인자가 들어갔는지 검증
  expect(navigateFn).toHaveBeenNthCalledWith(1, '/');
});
