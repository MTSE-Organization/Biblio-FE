'use client';

import { Textarea } from '@/components/ui/textarea';
import './order-note.css';
import { useOrderStore } from '@/store';
import { useEffect, useMemo } from 'react';
import { debounce } from 'lodash';

export default function OrderNote() {
  const { note, setNote } = useOrderStore();

  const debouncedSetNote = useMemo(
    () =>
      debounce((value: string) => {
        setNote(value.trim());
      }, 400),
    [setNote]
  );

  useEffect(() => {
    return () => {
      debouncedSetNote.cancel();
    };
  }, [debouncedSetNote]);

  return (
    <div className='flex gap-2'>
      <h3>Lời nhắn</h3>
      <div className='flex-1'>
        <Textarea
          defaultValue={note}
          onChange={(e) => debouncedSetNote(e.target.value)}
          className='order-note focus-visible:ring-green-primary max-h-65 min-h-30 overflow-auto focus-visible:border-transparent focus-visible:ring-2 focus-visible:outline-none'
        />
      </div>
    </div>
  );
}
