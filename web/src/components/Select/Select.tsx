import React, { ForwardedRef, ReactElement, useCallback, useEffect } from 'react';
import ReactSelect, {
  components,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  Props,
  SelectInstance,
} from 'react-select';
import loaderIcon from '../../assets/loader.svg';
import searchIcon from '../../assets/search.svg';
import { cn } from '../../services/cn';
import checkIcon from './assets/check.svg';
import downChevron from './assets/chevron-down.svg';
import './style.css';

function DropdownIndicator<Option>(props: DropdownIndicatorProps<Option>) {
  const { menuIsOpen, isSearchable, isLoading, onMenuOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          WebkitMaskImage: `url(${isLoading ? loaderIcon : menuIsOpen && isSearchable ? searchIcon : downChevron})`,
          WebkitMaskSize: 'cover',
        }}
        className={cn('h-5 w-5 bg-neutral-70 duration-300', {
          'animate-spin-slow': isLoading,
          'rotate-180': !isSearchable && menuIsOpen,
        })}
        onClick={() => {
          if (!menuIsOpen) {
            onMenuOpen();
          }
        }}
      />
    </components.DropdownIndicator>
  );
}

function BaseOption<Option>(props: OptionProps<Option>) {
  const { isSelected, isFocused, children, innerRef } = props;
  let optionRef: HTMLDivElement | null = null;

  const setRef = useCallback(
    (ref: HTMLDivElement | null) => {
      optionRef = ref;
      if (innerRef) {
        innerRef(ref);
      }
    },
    [innerRef],
  );

  useEffect(() => {
    if (isSelected && optionRef) {
      optionRef.scrollIntoView({ block: 'center' });
    }
  }, [isSelected]);

  return (
    <components.Option
      {...props}
      innerRef={setRef}
      className={cn(
        'h-9 px-3.5 hover:cursor-pointer hover:bg-neutral-6',
        { 'bg-neutral-6 text-neutral-100': isSelected },
        { 'bg-neutral-6': isFocused },
      )}
    >
      <div className="flex h-full w-full items-center justify-between gap-3">
        <span className="truncate text-sm text-neutral-100" data-tooltip-id={children?.toString()}>
          {children}
        </span>
        <img alt="✔" src={checkIcon} className={`${isSelected ? 'visible' : 'invisible'} h-5 w-5`} />
      </div>
    </components.Option>
  );
}

function LoadingIndicator() {
  return <div />;
}

function GroupHeading(props: any) {
  return (
    <components.GroupHeading {...props}>
      <div className="pl-3 text-xs text-neutral-50">
        <div>{props.data.header}</div>
        <div>{props.data.subHeader}</div>
      </div>
    </components.GroupHeading>
  );
}

function SelectWrapped<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  { isMulti, components, isError, ...rest }: Props<Option, IsMulti, Group> & { isError: boolean },
  ref?: ForwardedRef<SelectInstance<Option, IsMulti, Group>>,
) {
  //TODO: Fix default styles on select (currently the component does not react to classes inside classNames from bellow)
  return (
    <ReactSelect
      tabSelectsValue={false}
      blurInputOnSelect
      isSearchable={false}
      isMulti={isMulti}
      classNamePrefix={'react-select'}
      classNames={{
        control: ({ selectProps: { isSearchable } }) =>
          cn(
            'select px-4 rounded-lg border border-neutral-15 bg-white shadow-sm focus-within:border-lightblue-100 hover:border-lightblue-100 hover:cursor-pointer',
            { 'hover:cursor-text': isSearchable },
            {
              '!border-red-40 hover:border-red-40 shadow-red-40 focus:border-red-40 active:border-red-40 outline !focus-within:outline !outline-red-40':
                isError,
            },
          ),
        menuList: () => 'bg-white border border-neutral-15 rounded-lg top-1 py-1 shadow-md scrollbar',
        clearIndicator: () => 'text-neutral-25 hover:text-neutral-50 cursor-pointer',
        singleValue: ({ selectProps: { menuIsOpen, isSearchable } }) =>
          cn('text-neutral-100 truncate duration-300', {
            'm-0 text-neutral-50': menuIsOpen && isSearchable,
          }),
        placeholder: () => 'text-neutral-50',
        multiValueLabel: () => 'bg-neutral-6 text-neutral-85 font-bold px-3 rounded-l-full',
        multiValueRemove: () => 'bg-neutral-6 pr-3 rounded-r-full text-sm',
        valueContainer: () => cn({ 'my-1 gap-2': isMulti }),
        menu: () => '!z-50',
        indicatorsContainer: () => 'cursor-pointer',
        menuPortal: () => 'z-50',
      }}
      noOptionsMessage={() => <div className="text-neutral-70">No result found.</div>}
      unstyled
      components={{
        DropdownIndicator,
        Option: BaseOption,
        LoadingIndicator,
        GroupHeading,
        ...components,
      }}
      {...rest}
      ref={ref}
    />
  );
}

export const Select = React.forwardRef(SelectWrapped) as <
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: Props<Option, IsMulti, Group> & { ref?: ForwardedRef<SelectInstance<Option, IsMulti, Group>> } & {
    isError?: boolean;
  },
) => ReactElement;
