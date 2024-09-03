import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';

// 리액트 훅은 반드시 리액트 컴포넌트에서만 호출되어야 정상적으로 실행
it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result: 훅을 호출하여 얻은 결과 값을 반환 -> result.current 값의 참조를 통해 최신 상태를 추적할 수 있다.
  // rerender: 훅을 원하는 인자와 함께 새로 호출하여 상태를 갱신한다.
  const { result, rerender } = renderHook(useConfirmModal);

  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result, rerender } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result, rerender } = renderHook(useConfirmModal);

  // 상호 작용을 함께 그룹화하고 실행하여 실제 앱에서 동작하는 것 처럼 렌더링과 업데이트 상태를 반영하도록 도와줌
  // 테스트 환경에서 컴포넌트의 렌더링, 업데이트 결과를 jsdom에 반영할 때 사용해야 함
  // React Testing Library의 render함수와 user-event는 내부적으로 act 함수를 호출하기 때문에 편리하게테스트 코드 작성 가능
  // 이외에 별도로 리액트 state를 업데이트하여 변경 사항을 검증해야 한다면, act 함수를 사용하여 state를 반영해야 함
  act(() => {
    result.current.toggleIsModalOpened();
  });

  expect(result.current.isModalOpened).toBe(true);
  //
});
