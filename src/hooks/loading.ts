export function useLoading(value: boolean) {
  const isLoading = ref(value)

  function setLoading(value: boolean) {
    isLoading.value = value
  }

  function toggleLoading() {
    isLoading.value = !isLoading.value
  }

  return { isLoading, setLoading, toggleLoading }
}
