import { InjectionKey, ref } from 'vue';
import { Chapters } from '../utils/getChapters';

export const useNYobikoProvider = () => {
  const chapters = ref<Chapters>();
  const loading = ref<boolean>(true);

  chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    if (!tab.id) return;
    try {
      chrome.tabs.sendMessage(tab.id, {method: 'getDetail'}, (res: Chapters | null) => {
        if (res) chapters.value = res;
      });
    } catch (e) { // eslint-disable-line
      
    } finally {
      loading.value = false;
    }
  });

  return {

  }
}

export type NYobikoProviderStore = ReturnType<typeof useNYobikoProvider>;
export const NYobikoKey: InjectionKey<NYobikoProviderStore> = Symbol('NYobiko');
