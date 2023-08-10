export function usePage(data: Ref<any[]>, size = 20) {
  const page = reactive({
    index: 1,
    size,
    total: 0,
    isLoading: false,
    isFinished: false,
  })

  async function loadMore(
    reFn: (
      params: Record<string, any>,
    ) => Promise<{ list: any[]; total: number }>,
  ) {
    if (page.isFinished)
      return

    page.isLoading = true
    try {
      const { list, total } = await reFn({
        pageIndex: page.index,
        pageSize: page.size,
      })

      data.value = data.value.concat(list)

      page.index++
      page.total = total
      page.isFinished = data.value.length >= total
    }
    catch (error) { }
    page.isLoading = false
  }

  function resetPageData() {
    page.index = 1
    page.total = 0
    page.isFinished = false
    data.value = []
  }

  return {
    page,
    loadMore,
    resetPageData,
  }
}
