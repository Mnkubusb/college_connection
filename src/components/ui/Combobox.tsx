import { useEffect, useState } from 'react';

import { Check, ChevronsUpDown, CirclePlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type ComboboxOptions = {
  value: string;
  label: string;
};

interface ComboboxProps {
  options: ComboboxOptions[];
  selected: ComboboxOptions['value'];
  className?: string;
  placeholder?: string;
  disalbed?: boolean;
  onChange: (option: ComboboxOptions) => void;
  onCreate?: (label: ComboboxOptions['label']) => void;
}

/**
 * Convert katakana to hiragana(Only Japanese)
 *
 * カタカナをひらがなに変換する
 */
function toHiragana(value: string) {
  return value.replace(/[\u30a1-\u30f6]/g, function (match: string) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

/**
 * CommandItem to create a new query content
 *
 * クエリの内容を新規作成するCommandItem
 */
function CommandAddItem({
  query,
  onCreate,
}: {
  query: string;
  onCreate: () => void;
}) {
  return (
    <div
      tabIndex={0}
      onClick={onCreate}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          onCreate();
        }
      }}
      className={cn(
        'flex w-max text-blue-500 cursor-pointer text-sm px-2 py-1.5 rounded-sm items-center focus:outline-none'
      )}
    >
      <CirclePlus className="mr-2 h-4 w-4" />
      Create {query}
    </div>
  );
}

export function Combobox({
  options,
  selected,
  className,
  placeholder,
  disalbed,
  onChange,
  onCreate,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const [canCreate, setCanCreate] = useState(true);
  useEffect(() => {
    const isAlreadyCreated = !options.some((option) => option.label === query);
    setCanCreate(!!(query && isAlreadyCreated));
  }, [query, options]);

  function handleSelect(option: ComboboxOptions) {
    if (onChange) {
      onChange(option);
      setOpen(false);
      setQuery('');
    }
  }

  function handleCreate() {
    if (onCreate && query) {
      onCreate(query);
      setOpen(false);
      setQuery('');
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disalbed ?? false}
          aria-expanded={open}
          className={cn('w-max font-normal', className)}
        >
          {selected && selected.length > 0 ? (
            <div className="truncate mr-auto">
              {options.find((item) => item.value === selected)?.label}
            </div>
          ) : (
            <div className="text-slate-400 mr-auto">
              {placeholder ?? 'Select'}
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[200px] p-0 scroll scroll-smooth">
        <Command
          filter={(value, search) => {
            const v = toHiragana(value.toLocaleLowerCase());
            const s = toHiragana(search.toLocaleLowerCase());
            if (v.includes(s)) return 1;
            return 0;
          }}
          className='scroll scroll-smooth'
        >
          <CommandInput
            placeholder="Search or create new"
            value={query}
            onValueChange={(value: string) => setQuery(value)}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }}
          />
          <CommandEmpty className="flex pl-1 py-1 w-full">
            {query && (
              <CommandAddItem query={query} onCreate={() => handleCreate()} />
            )}
          </CommandEmpty>

          <CommandList>
            <CommandGroup className="overflow-y-auto scroll scroll-smooth">
              {options.length === 0 && !query && (
                <div className="py-1.5 pl-8 space-y-1 text-sm">
                  <p>No items</p>
                  <p>Enter a value to create a new one</p>
                </div>
              )}

              {/* Create */}
              {canCreate && (
                <CommandAddItem query={query} onCreate={() => handleCreate()} />
              )}

              {/* Select */}
              {options.map((option, index) => (
                <CommandItem
                  key={option.label}
                  tabIndex={0}
                  value={option.label}
                  onSelect={() => {
                    console.log('onSelect');
                    handleSelect(option);
                  }}
                  onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                    if (event.key === 'Enter') {
                      // Process to prevent onSelect from firing, but it does not work well with StackBlitz.
                      // onSelectの発火を防ぐ処理だが、StackBlitzだとうまく動作しない
                      event.stopPropagation();

                      handleSelect(option);
                    }
                  }}
                  className={cn(
                    'cursor-pointer',
                    ' aria-selected:bg-transparent'
                  )}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 min-h-4 min-w-4',
                      selected === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
