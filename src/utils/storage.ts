import { useState } from "react";

// Basic types
type StorageValue<T> = T | null;

interface StorableValue<T> {
    value: T;
    expiry?: number; // Unix timestamp in milliseconds
}


export const storage = {
    /**
     * Set item in localStorage with optional expiry
     * @param key Storage key
     * @param value Value to store
     * @param ttl Time to live in milliseconds (optional)
     */
    set<T>(key: string, value: T, ttl?: number): void {
        try {
            const item: StorableValue<T> = {
                value,
                expiry: ttl ? Date.now() + ttl : undefined
            };
            const serializedValue = JSON.stringify(item);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`LocalStorage set error for key "${key}":`, error);
        }
    },

    /**
     * Get item from localStorage
     * @param key Storage key
     * @param defaultValue Default value if item doesn't exist or is expired
     * @returns Stored value or defaultValue
     */
    get<T>(key: string, defaultValue: StorageValue<T> = null): StorageValue<T> {
        try {
            const serializedValue = localStorage.getItem(key);
            if (!serializedValue) return defaultValue;

            const item = JSON.parse(serializedValue) as StorableValue<T>;

            // Check if item has expired
            if (item.expiry && Date.now() > item.expiry) {
                this.remove(key); // Clean up expired item
                return defaultValue;
            }

            return item.value;
        } catch (error) {
            console.error(`LocalStorage get error for key "${key}":`, error);
            return defaultValue;
        }
    },

    // Delete information (Delete)
    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`LocalStorage remove error for key "${key}":`, error);
        }
    },

    // Clear all data
    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('LocalStorage clear error:', error);
        }
    },

    // Get existing keys
    keys(): string[] {
        try {
            return Object.keys(localStorage);
        } catch (error) {
            console.error('LocalStorage keys error:', error);
            return [];
        }
    },

    // Check if key exists and not expired
    has(key: string): boolean {
        try {
            const item = localStorage.getItem(key);
            if (!item) return false;

            const parsedItem = JSON.parse(item) as StorableValue<unknown>;
            if (parsedItem.expiry && Date.now() > parsedItem.expiry) {
                this.remove(key);
                return false;
            }

            return true;
        } catch (error) {
            console.error(`LocalStorage has error for key "${key}":`, error);
            return false;
        }
    },

    /**
     * Get remaining time until expiry
     * @param key Storage key
     * @returns Remaining time in milliseconds or null if no expiry
     */
    getRemainingTime(key: string): number | null {
        try {
            const serializedValue = localStorage.getItem(key);
            if (!serializedValue) return null;

            const item = JSON.parse(serializedValue) as StorableValue<unknown>;
            if (!item.expiry) return null;

            const remaining = item.expiry - Date.now();
            return remaining > 0 ? remaining : 0;
        } catch (error) {
            console.error(`LocalStorage getRemainingTime error for key "${key}":`, error);
            return null;
        }
    }
};

// Hook version with expiry support
export function useLocalStorage<T>(
    key: string,
    initialValue: T,
    ttl?: number
): [T, (value: T | ((val: T) => T)) => void, () => number | null] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = storage.get<T>(key);
            return item !== null ? item : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            storage.set(key, valueToStore, ttl);
        } catch (error) {
            console.error(error);
        }
    };

    const getRemainingTime = () => storage.getRemainingTime(key);

    return [storedValue, setValue, getRemainingTime];
}

// Time constants for convenience
export const StorageExpiry = {
    SECOND: 1000,
    MINUTE: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24,
    WEEK: 1000 * 60 * 60 * 24 * 7,
    MONTH: 1000 * 60 * 60 * 24 * 30, // Approximate
    YEAR: 1000 * 60 * 60 * 24 * 365 // Approximate
} as const;