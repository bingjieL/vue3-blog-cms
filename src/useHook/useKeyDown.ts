import { onMounted, onUnmounted } from 'vue';

/**
 * @description: 监听键盘按下
 * @param  {*}
 * @return {*}
 * @param {function} cb 回调函数
 * @param {array} keyName 键名称数组
 */

const vk: any = {
  ENTER: 13,
  S: 83,
  COMMAND: 91,
};

export function useKeyDown(cb: (e: KeyboardEvent) => void, ...keyName: string[]) {
  const keyCode = keyName.map((item: string) => vk[item.toLocaleUpperCase()]);
  let keydownCode: number[] = [];

  function userKeyUp(e: KeyboardEvent) {
    keydownCode = [];
  }
  function userKeydown(e: KeyboardEvent) {
    const widowEvent = window.event;
    keydownCode.push(e.keyCode);
    const isSame = keydownCode.every((item: number) => keyCode.includes(item)) &&  keydownCode.length === keyCode.length;
    if (isSame) {
      if (widowEvent && widowEvent.preventDefault) {
        widowEvent.preventDefault();
      } else {
        widowEvent!.returnValue = false;
      }
      cb(e);
    }
  }
  function pageBlur(e: Event) {
    keydownCode = [];
  }

  onMounted(() => {
    window.addEventListener('blur', pageBlur);
    window.addEventListener('keydown', userKeydown);
    window.addEventListener('keyup', userKeyUp);
  });
  onUnmounted(() => {
    window.removeEventListener('keydown', userKeydown);
    window.removeEventListener('keyup', userKeyUp);
    window.removeEventListener('blur', pageBlur);
  });
}
