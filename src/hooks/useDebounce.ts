import { type DependencyList, type EffectCallback, useEffect } from 'react';

const useDebounce = (effect: EffectCallback, deps: DependencyList, delay: number) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  }, [...(deps || []), delay]);
};

export default useDebounce;
