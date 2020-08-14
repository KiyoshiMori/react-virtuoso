import * as React from 'react'
import { debounceTime, mapTo, skip, subject, TObservable, duc } from './tinyrx'

interface TScrollLocationWithAlign {
  index: number
  align: 'start' | 'center' | 'end'
  behavior?: 'smooth' | 'auto'
}

export type TScrollLocation = number | TScrollLocationWithAlign

export type TContainer =
  | React.ComponentType<{ className: string; style?: React.CSSProperties; key?: number }>
  | keyof JSX.IntrinsicElements

export const buildIsScrolling = (scrollTop$: TObservable<number>): TObservable<boolean> => {
  const isScrolling$ = subject(false)

  scrollTop$.pipe(skip(1), duc(), mapTo(true)).subscribe(isScrolling$.next)

  scrollTop$.pipe(skip(1), mapTo(false), debounceTime(200)).subscribe(isScrolling$.next)

  return isScrolling$
}
