import { useEffect } from 'react'

/*
  This hook is used to set the title of the page

  Params:
  title: title of the page
*/
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title}`
  }, [title])
}
