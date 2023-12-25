const storage = window.localStorage;

export enum StorageEnum {
	UserStorage = 'user-storage',
}

export function deleteData(key: string) {
	storage.removeItem(key);
}

export function deleteAll() {
	storage.clear()
}