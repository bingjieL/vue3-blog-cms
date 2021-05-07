import { ref, computed } from 'vue';
import type { Ref, ComputedRef } from 'vue';
interface UseTest {
  moneyVal: Ref<number>;
  moneyTwo: ComputedRef<number>;
  addMoney: (addVal: number) => void;
}

export function useTest(money: number): UseTest {
  const moneyVal = ref<number>(money);

  const moneyTwo = computed(() => {
    return moneyVal.value * 2;
  });

  const addMoney = (addVal: number) => {
    moneyVal.value = moneyVal.value + addVal;
  };

  return {
    moneyVal,
    moneyTwo,
    addMoney,
  };
}
