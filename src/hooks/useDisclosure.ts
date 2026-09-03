import { useCallback, useState } from 'react';

interface UseDisclosureProps {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export function useDisclosure({
  isOpen: defaultOpen = false,
  onOpen,
  onClose,
}: UseDisclosureProps = {}): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) onOpen?.();
      else onClose?.();
      return !prev;
    });
  }, [onOpen, onClose]);

  return {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  };
}
