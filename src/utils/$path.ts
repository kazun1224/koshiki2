export const pagesPath = {
  "add": {
    $url: (url?: { hash?: string }) => ({ pathname: '/add' as const, hash: url?.hash })
  },
  "calculation": {
    $url: (url?: { hash?: string }) => ({ pathname: '/calculation' as const, hash: url?.hash })
  },
  "signin": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  "singup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/singup' as const, hash: url?.hash })
  },
  "start": {
    $url: (url?: { hash?: string }) => ({ pathname: '/start' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
