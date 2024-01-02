import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { forEach, isPlainObject, omitBy, transform } from "lodash";
import {
  Fragment,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { type ControllerProps } from "react-hook-form/dist/types";

import { Button } from "../Button";
import { Input } from "../Input";
import { Spinner } from "../Spinner";
import { type Field } from "../types";

const isEmpty = (value: unknown): boolean => {
  return (
    typeof value === "undefined" ||
    value === "" ||
    (value instanceof Array && value.length === 0)
  );
};

const omitEmpty = (obj: any): any => omitBy(obj, isEmpty);

const formatRenderValue = (obj: any): any => {
  return transform<any, any>(
    obj,
    (result, value, key) => {
      if (isPlainObject(value) || Array.isArray(value)) {
        forEach(formatRenderValue(value), (flattenedValue, flattenedKey) => {
          if (Array.isArray(value)) {
            if (typeof result[key] === "undefined") {
              result[key] = [];
            }
          } else {
            if (typeof result[key] === "undefined") {
              result[key] = {};
            }
          }

          result[key][flattenedKey] =
            flattenedValue instanceof Date
              ? dayjs(flattenedValue).format("YYYY-MM-DD")
              : flattenedValue;
        });
      } else {
        result[key] =
          value instanceof Date ? dayjs(value).format("YYYY-MM-DD") : value;
      }
    },
    {},
  );
};

const flattenObject = (obj: any): any => {
  return transform<any, any>(
    obj,
    (result, value, key) => {
      if (typeof key === "string" && isPlainObject(value)) {
        const nested = flattenObject(value);
        forEach(nested, (nestedValue, nestedKey) => {
          result[`${key}.${nestedKey}`] = nestedValue;
        });
      } else {
        result[key] = value;
      }
    },
    {},
  );
};

export interface FilterItemProps<T> {
  label: string;
  field: Field<T>;
  render: ControllerProps["render"];
  pinned?: boolean;
}

export interface FilterSearchConfig {
  querySuffix?: ReactNode;
  queryPrefix?: ReactNode;
  queryPlaceholder?: string;
  disabled?: boolean;
}

export interface FilterProps<T> {
  loading?: boolean;
  filters?: Array<FilterItemProps<T>>;
  extra?: ReactNode;
  search?: false | FilterSearchConfig;
  values?: Record<Field<T>, any> & { query?: string };
  onChange?: (value: Record<Field<T>, any> & { query?: string }) => void;
}

export function Filter<T>({
  loading = false,
  filters = [],
  extra,
  search,
  values,
  onChange,
}: FilterProps<T>): ReactElement {
  const { control, setValue, watch } = useForm<any>();

  const fixedFilters = useMemo(
    () =>
      filters
        .filter((item) => item.pinned)
        .map((item) => ({
          ...item,
        })),
    [filters],
  );

  const handleChange = useCallback(() => {
    onChange?.(omitEmpty(flattenObject(watch())));
  }, [onChange, watch]);

  useEffect(() => {
    const oldValues = watch();

    if (typeof values !== "undefined") {
      for (const key in values) {
        if ((values as any)[key] !== oldValues[key]) {
          setValue(key, (values as any)[key]);
        }
      }
    }
  }, [values, setValue, watch]);

  return (
    <div>
      <div className="flex gap-2">
        {typeof search !== "undefined" && search !== false && (
          <Controller<{ query: string }>
            control={control}
            name="query"
            render={({ field }) => (
              <Input
                className="flex-1"
                disabled={field?.disabled ?? search?.disabled}
                placeholder={search?.queryPlaceholder}
                prefix={
                  search?.queryPrefix ?? (
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  )
                }
                suffix={loading ? <Spinner /> : search?.querySuffix}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  handleChange();
                }}
              />
            )}
          />
        )}

        {extra}
      </div>

      {filters.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {fixedFilters.map(({ field, label, render }) => {
            const fieldValue = watch(field);

            return (
              <Popover className="relative" key={field}>
                {({ close }) => (
                  <>
                    <Button
                      rounded
                      as={Popover.Button}
                      className="pr-2"
                      size="sm"
                    >
                      <span className="flex items-center whitespace-nowrap">
                        {isEmpty(fieldValue) ? (
                          <>
                            {label}
                            <ChevronDownIcon className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            {`${label}: ${String(
                              formatRenderValue({ [field]: fieldValue })[field],
                            )}`}
                            <XMarkIcon
                              className="h-4 w-4"
                              onClick={(event) => {
                                event.stopPropagation();
                                close();
                                setValue(field, undefined as any);
                                handleChange();
                              }}
                            />
                          </>
                        )}
                      </span>
                    </Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 mt-2 w-auto transform px-0">
                        <div className="whitespace-nowrap rounded-md bg-surface p-3 shadow-md ring-1 ring-black ring-opacity-5">
                          <Controller
                            control={control}
                            name={field}
                            render={(renderProps) =>
                              render({
                                ...renderProps,
                                field: {
                                  ...renderProps.field,
                                  onChange: (value) => {
                                    renderProps.field.onChange(value);
                                    handleChange();
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            );
          })}

          {filters?.length > fixedFilters.length && (
            <Button rounded className="bg-gray-50 text-gray-600" size="sm">
              <span className="flex items-center">
                添加筛选条件
                <PlusIcon className="h-4 w-4" />
              </span>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
