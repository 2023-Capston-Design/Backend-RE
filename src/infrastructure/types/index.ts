import * as common from './common';
import * as member from './member';
import * as jwtTypes from './jwt';
import * as classImg from './class-image';

export type CommonReturnType = Promise<ReturnType<any>> | ReturnType<any>;

export type SwaggerObject<T extends object> = {
  [k in keyof T]: MethodDecorator;
} & {
  Controller?: ClassDecorator;
};

export { common, member, jwtTypes, classImg };
