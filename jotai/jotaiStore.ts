import { atom } from 'jotai'

export const userAtom = atom(null)
export const formModalAtom = atom(false)
export const pathAtom = atom('')
export const isEditingAtom = atom(false)
export const editRowAtom = atom<any>({ });
