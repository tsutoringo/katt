import { getChapters } from '../utils/getChapters';

chrome.runtime.onMessage.addListener(
    function({ method }, sender, sendResponse) {
        if (method === 'getDetail') {
            sendResponse(getChapters());
        }
    }
);
