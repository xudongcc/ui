/* eslint-disable @typescript-eslint/ban-types */

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ValidationMap,
  type WeakValidationMap,
} from "react";

export type As = ElementType;

export type PropsOf<T extends As> = ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never,
> = Omit<
  Target,
  "transition" | "as" | "color" | "translate" | OmitAdditionalProps
> & {
  htmlTranslate?: "yes" | "no" | undefined;
};

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = (
  | RightJoinProps<ComponentProps, AdditionalProps>
  | RightJoinProps<AsProps, AdditionalProps>
) & {
  as?: AsComponent;
};

export interface ComponentWithAs<
  Component extends As,
  Props extends object = {},
> {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      ComponentProps<Component>,
      ComponentProps<AsComponent>,
      Props,
      AsComponent
    >,
  ): JSX.Element;

  displayName?: string;
  propTypes?: WeakValidationMap<any>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
}
