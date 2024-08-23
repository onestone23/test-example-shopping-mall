import { screen } from '@testing-library/react';
import React from 'react';

import ErrorPage from '@/pages/error/components/ErrorPage';
import render from '@/utils/test/render';

const navigateFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');

  // 컴포넌트 내부에서 useNavigate호출시 선언한 spy 함수로 대체
  return { ...original, useNavigate: () => navigateFn };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  const { user } = await render(<ErrorPage />);

  await user.click(screen.getByRole('button', { name: '뒤로 이동' }));

  expect(navigateFn).toHaveBeenCalledWith(-1);
});
