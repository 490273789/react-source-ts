import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
  Type,
  Key,
  Props,
  Ref,
  ReactElementType,
  ElementType
} from 'shared/ReactTypes';

const ReactElement = function (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'nan'
  };

  return element;
};

export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
    }
    if (props === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  // const maybeChildrenLength = maybeChildren.length;
  // if (maybeChildrenLength) {
  //   if (maybeChildrenLength === 1) {
  //     props.children = maybeChildren[0];
  //   } else {
  //     props.children = maybeChildren;
  //   }
  // }
  return ReactElement(type, key, ref, props);
};
