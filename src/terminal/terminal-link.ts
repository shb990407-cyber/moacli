export interface TerminalLink {
  url: string
  host: string
}

export function parseTerminalLink(value: string): TerminalLink | null {
  try {
    const url = new URL(value)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return { url: url.href, host: url.host }
  } catch {
    return null
  }
}
