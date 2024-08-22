import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// 테스트 실행 시 1번만 호출 먼저 호출됨
// my-class란 class가 항상 적용된 컴포넌트를 렌더링
beforeAll(async () => {
  await render(<TextField className={'my-class'} />);
  console.log('root - beforeAll');
});

// 테스트 실행 전 매번 호출
// 내부 스코프(ex, placeholder)에 있는 beforeEach와 같이 실행 됨
beforeEach(() => {
  console.log('root - beforeEach');
  // 전역 변수를 사용한 조건부 setUp 은 좋지않음
  // 이전 테스트에서 전역 변수 변경이 될 수 있기떄문에 > 독립적인 테스트 불가능, 신뢰성 있는 테스트가 아님. 실행순서 보장 불가
  // if(전역변수)~~
});

afterEach(() => {
  console.log('root - afterEach');
});
afterAll(() => {
  console.log('root - afterAll');
});

it('className prop설정 값 css class 적용', async () => {
  // Arrange - 테스트를 위한 환경 만들기
  // -> className을 지닌 컴포넌트 렌더링
  // Act - 테스트할 동작 발생
  // -> 렌더링에 대한 검증이기 때문에 이 단계는 생략
  // -> 클릭이나 메서드 호출, prop 변경 등등에 대한 작업이 여기에 해당
  // Assert - 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 할당 class가 존재하는지 검증

  // redner API를 호출 -> 테스트 환경의 jsDOM에 리액트 컴포넌트가 렌더링된 DOM 구조가 반영
  // jsDOM: Node.js에서 사용하기 위해 많은 웹 표준을 순수 자바스크립트로 구현
  // await render(<TextField className={'my-class'} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  screen.debug(); // DOM 구조 확인
  // vitest의 expect 함수로 기대 결과 검증

  // className이란 내부 prop이나 state 값을 검증 (X)
  // 렌더링되는 DOM 구조가 올바르게 변경되었는지 확인 (O) -> 최종적으로 사용자가 보는 결과는 DOM
  expect(textInput).toHaveClass('my-class');
});

describe('placeholder', () => {
  beforeEach(() => {
    console.log('placeholder - beforeEach');
  });
  afterEach(() => {
    console.log('placeholder - afterEach');
  });

  // it -> test 함수의 alias
  it('기본 placehoder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    // it - 테스트의 단위
    // 기대결과 정의, 검증하고자 하는 대상의 최종 상태를 예상하여 정의
    // 기대결과 === 실제 결과 -> 성공
    // 기대결과 !== 실제 결과 -> 실패
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    screen.debug();

    expect(textInput).toBeInTheDocument();
    // 단언(assertion) -> 테스트가 통과하기 위한 조건 -> 검증실행
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async () => {
    await render(<TextField placeholder={'상품명을 입력해 주세요.'} />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    screen.debug();

    expect(textInput).toBeInTheDocument();
  });
});
// https://vitest.dev/api/expect.html
// https://github.com/testing-library/jest-dom?tab=readme-ov-file#custom-matchers
