/**
 * Cache Manager - IndexedDB cache pro offline funkčnost
 * 
 * Features:
 * - Ukládání dat lokálně
 * - Offline first strategie
 * - Automatické cachování API responses
 * - TTL (Time To Live) pro cache expiraci
 */

const DB_NAME = 'podnikatelska_ctvrtka_cache';
const DB_VERSION = 1;
const STORE_NAME = 'api_cache';

interface CacheEntry<T = any> {
  key: string;
  data: T;
  timestamp: number;
  ttl?: number; // Time to live in milliseconds
}

class CacheManager {
  private db: IDBDatabase | null = null;

  /**
   * Inicializace IndexedDB
   */
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  /**
   * Uložit data do cache
   */
  async set<T>(key: string, data: T, ttl?: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      const entry: CacheEntry<T> = {
        key,
        data,
        timestamp: Date.now(),
        ttl,
      };

      const request = store.put(entry);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Načíst data z cache
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        const entry = request.result as CacheEntry<T> | undefined;

        if (!entry) {
          resolve(null);
          return;
        }

        // Check TTL
        if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
          // Expired - delete and return null
          this.delete(key);
          resolve(null);
          return;
        }

        resolve(entry.data);
      };

      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Smazat data z cache
   */
  async delete(key: string): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Vyčistit celou cache
   */
  async clear(): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Získat všechny klíče v cache
   */
  async keys(): Promise<string[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAllKeys();

      request.onsuccess = () => resolve(request.result as string[]);
      request.onerror = () => reject(request.error);
    });
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

/**
 * Wrapper pro fetch s automatickým cachováním
 */
export async function cachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Try cache first
  const cached = await cacheManager.get<T>(key);
  if (cached !== null) {
    console.log(`📦 Cache HIT: ${key}`);
    return cached;
  }

  // Cache miss - fetch and cache
  console.log(`🌐 Cache MISS: ${key} - fetching...`);
  const data = await fetchFn();
  await cacheManager.set(key, data, ttl);
  return data;
}

/**
 * Hook pro cached data
 */
import { useState, useEffect } from 'react';

export function useCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl?: number,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setLoading(true);
        const result = await cachedFetch(key, fetchFn, ttl);
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [key, ttl, ...dependencies]);

  return { data, loading, error };
}
