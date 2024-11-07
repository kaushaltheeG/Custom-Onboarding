import {isValidPlainObject } from '../utils/validations';
import IModel from "../interfaces/models/IModel";
import assert from 'assert';

export default abstract class Base<T = {}> {
  readonly _id!: string;
  private _created: number;

  constructor(dto: T & IModel) {
    if ('_id' in dto && dto._id) {
      this._id = dto._id;
    }

    this.fromDto(dto);

    this._created = dto.created || Date.now();
  }

  get created() {
    return this._created;
  }

  set created(val: number) {
    assert(typeof val === 'number', 'Object created must be of type number');
    assert(!isNaN(val), 'Object created cannot be NaN');
    assert(isFinite(val), 'Object created must be finite');
    this._created = val;
  }

  /**
   * Applies the properties from a DTO to it's Model.
   * Ensures that certain properties are not directly overwritten without out going
   * through the safe gaurds placed within the getter/setter
   * @param {T} dto
   */
  fromDto<T extends Object, K extends keyof T>(dto: T) {
    const keys = Object.keys(dto);
    for(let i = 0; i < keys.length; i++){
      if (keys[i] === '_id') {
         continue;
      }

      // prevents the direct assignment of internal properties when they are intended to be accessed only through a getter/setter
      if (keys[i].startsWith('_') && keys[i].substring(1) in this) {
        // tslint:disable-next-line max-line-length
        throw new Error('Cannot use a data transfer object that targets underscore properties where a getter/setter exists for that property');
      }

      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), keys[i]);
      // setter is called instead of the directly assigning the field
      if (descriptor && descriptor.set) {
        (this as any)[keys[i]] = dto[keys[i] as K];
      }

      if (descriptor && descriptor.value && typeof descriptor.value === 'function') {
        continue;
      }

      // direct assignment of the object's field is made if none of the conditions are met
      ((this as unknown) as T)[keys[i] as K] = dto[keys[i] as K];
    }
  }

  /**
   * Returns DTO representation of the model,
   * a new instance of the same model should be
   * instantiable from a DTO of the same class.
   * Remove undefined fields from the DTO
   * @returns {T}
   */
  toDTO(): T {
    const result: any = {};
    const props = this.getProperties();
    for(let i = 0; i < props.length; i++) {
      const key: string = props[i];
      // @ts-ignore
      const value: unknown = this[key];

      if (key.startsWith('_') && !(key === '_id')) {
        continue
      }

      result[key] = this.removeUndefinedProperties(value);
    }
    return result;
  }

  /**
   * returns a combination of prototype and instance properties
   * ie. All properties.
   */
  getProperties(): string[] {
    const proto = Object.getPrototypeOf(this);
    const modelChainProps: string[] = this.reflectAndFilterPrototypeProperties(proto);
    const instanceProps = Object.keys(this).filter((propName: string) => {
      const desc = Object.getOwnPropertyDescriptor(this, propName);
      return desc ? this.isDescriptorWithGetter(desc) : false;
    });

    return this._id
      ? ['_id', ...modelChainProps, ...instanceProps]
      : [...modelChainProps, ...instanceProps];
  }

  /**
   * Used to gather all properties from an object's prototype chain that have getters
   * @param proto
   * @returns
   */
  private reflectAndFilterPrototypeProperties = (proto: any): string[] => {
    const results: string[] = [];

    const keys = Reflect.ownKeys(proto);
    for(let i = 0; i< keys.length;i++){
      const desc = Reflect.getOwnPropertyDescriptor(proto, keys[i]) || {};
      if (keys[i] !== 'constructor' && this.isDescriptorWithGetter(desc)) {
        results.push(keys[i] as string);
      }
    }
    if (!Reflect.ownKeys(proto.__proto__).includes('__proto__')) {
      return [...results, ...this.reflectAndFilterPrototypeProperties(proto.__proto__)];
    }

    return results;
  }

  private isDescriptorWithGetter(desc: PropertyDescriptor) {
    return 'get' in desc && typeof desc.get === 'function';
  };

  /**
   * Preforms a deep clean of the object via recursion 
   * @param object 
   * @returns 
   */
  private removeUndefinedProperties(object: any): Record<string, unknown> | unknown {
    if (Array.isArray(object)) {
      return object.map((item: unknown) => {
        if (typeof item === 'object' && item !== null) {
          return this.removeUndefinedProperties(item);
        }
        return item;
      });
    }

    // if is not a safe javascript object or array, we just return the value as is
    if (!isValidPlainObject(object)) {
      return object;
    }

    const props = Object.keys(object);
    const result: Record<string, unknown> = {};
    for(let i = 0; i< props.length;i++) {
      const key: string = props[i];
      // @ts-ignore
      const value: unknown = object[key];
      if (typeof value === 'undefined') {
        continue;
      }

      result[key] = this.removeUndefinedProperties(value);
    }
    return result;
  }

}

