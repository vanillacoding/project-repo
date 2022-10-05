import useFetch from './useFetch';

// NOTE: 이전 과제에서 post/ patch? 쪽 옵션 설정이 많이 바꼈었다. 특히 cors 관련,
// 바뀔 때 마다 모든 post를 돌아다니면서 수정하기가 번거로왔다.
// 그래서 훅으로 뺌.

export default function usePost(url, data) {
  const { response, error, isLoading } = useFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  return { response, error, isLoading };
}
