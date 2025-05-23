import { atom } from 'jotai'

export const userAtom = atom(null)
export const formModalAtom = atom(false)
export const pathAtom = atom('')
export const isEditingAtom = atom(false)
export const editRowAtom = atom<any>({});

export const selectedCustomerAtom = atom<any | null>(null);
export const selectedSupplierAtom = atom<any | null>(null);

export const selectedDetailsAtom = atom<any[]>([]);
export const selectedTransactionAtom = atom<any[]>([]);

export const finalCalculationsAtom = atom<any>({});