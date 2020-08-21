import { objectToMap, mapToObject } from "@Util/index";
import { BaseObject, BaseMap } from "@/types";
import { isArray, isFunction, isRegExp } from "@/util/base";
import { FieldRule } from "./field";

type FormMethods = "submit" | "reset";

type FieldsError = {
  key: string;
  value: any;
  rule: FieldRule;
};

type FieldsValue = {
  key: string;
  value: any;
};
interface FormInitPorps {
  update: () => void;
  onReset?: () => void;
  onSubmit?: (data: any) => any;
  initialValues: BaseObject;
  rules: {
    key: string;
    rules: FieldRule[];
  }[];
}
class Form {
  values: BaseMap;
  onReset?: () => void;
  formUpdate: () => void;
  onSubmit?: (data: any) => any;
  rules: Map<string, FieldRule[]>;
  errors: Map<string, FieldsError>;
  constructor(props: FormInitPorps) {
    const { initialValues = {}, rules = [], onReset, onSubmit, update } = props;
    this.errors = new Map();
    this.formUpdate = update;
    this.onReset = onReset;
    this.onSubmit = onSubmit;
    this.values = objectToMap(initialValues);
    this.rules = this.transformRules(rules);
    // 初始化验证
    this.validateFields([], this.formUpdate);
  }
  private transformRules(
    rules: FormInitPorps["rules"]
  ): Map<string, FieldRule[]> {
    let ruleMap = new Map();
    if (!isArray(rules) || rules.length == 0) return ruleMap;
    rules.forEach((rule) => {
      const { key, rules: keyRules } = rule;
      if (key && keyRules != null && isArray(keyRules) && keyRules.length > 0) {
        ruleMap.set(key, keyRules);
      }
    });
    return ruleMap;
  }
  triggle(type: FormMethods) {
    if (type === "reset") {
      this.reset();
    } else if (type === "submit") {
      this.submit();
    }
  }
  private reset(): void {
    this.values.forEach((_, key) => {
      this.values.set(key, null);
    });
    this.validateFields(null, this.formUpdate);
    this.onReset?.();
  }
  private submit(): void {
    this.validateFields(null, this.formUpdate);
    if (this.errors.size !== 0) return;
    this.onSubmit?.(mapToObject(this.values));
  }
  getFieldsError(keys?: string | string[]): FieldsError[] {
    if (keys == null) {
      keys = Object.keys(mapToObject(this.values));
    } else if (typeof keys === "string") {
      keys = [keys];
    }
    let res: FieldsError[] = [];
    keys.forEach((key) => {
      if (this.errors.has(key)) {
        res.push(this.errors.get(key) as FieldsError);
      }
    });
    return res;
  }
  setFieldsError(errors: FieldsError | FieldsError[]) {
    if (errors == null) return;
    if (!isArray(errors)) errors = [errors];
    errors.forEach((error) => {
      const key = error.key;
      if (key) {
        this.errors.set(key, error);
      }
    });
  }
  getFieldsValue(keys?: string | string[]): any {
    if (typeof keys === "string" && this.values.has(keys)) {
      return this.values.get(keys);
    } else if (isArray(keys)) {
      keys
        .filter((key) => this.values.has(key))
        .reduce((res, curr) => {
          res[curr] = this.values.get(curr);
          return res;
        }, {});
    }
  }
  setFieldsValue(values: FieldsValue | FieldsValue[], update: () => void) {
    if (!isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      const { key, value: _value } = value;
      if (!key) {
        console.warn(`未设置key导致无法设置value:`, value);
        return;
      }
      this.values.set(key, _value);
      this.validateFields(key, update);
    });
  }
  validateFields(keys?: string | string[] | null, update?: () => void) {
    if (keys == null) {
      keys = Object.keys(mapToObject(this.rules));
    } else if (typeof keys === "string") {
      keys = [keys];
    }
    keys = keys.filter((key) => this.rules.get(key));
    keys.forEach((key) => {
      const rules: FieldRule[] = this.rules.get(key) as FieldRule[];
      // if (!rules || rules.length === 0) {
      //   update?.();
      //   return;
      // }
      for (let i = 0, len = rules.length; i < len; i++) {
        const {
          message,
          transform,
          validator,
          required,
          min = 0,
          max = Number.MAX_SAFE_INTEGER,
          pattern,
        } = rules[i];
        let value = this.values.get(key);
        if (transform && isFunction(transform)) {
          value = transform(value);
        }
        if (!required && (value == null || value === "")) continue;
        let promise: Promise<any>;
        if (validator && isFunction(validator)) {
          promise = validator(rules[i], value, this);
        } else {
          const valueLen: number = value?.length || 0;
          const validatorResult = {
            required: value != null && value !== "",
            min: min ? valueLen >= min : !min,
            max: max ? valueLen <= max : !max,
            pattern: isRegExp(pattern) ? pattern?.test(value) : true,
          };
          promise = new Promise((resolve, reject) => {
            const isValid = Object.values(validatorResult).every(Boolean);
            isValid ? resolve() : reject(message);
          });
        }
        promise
          .then(() => {
            if (this.errors.has(key)) {
              this.errors.delete(key);
              update?.();
            }
          })
          .catch((errorMsg: string) => {
            this.setFieldsError({
              key,
              value,
              rule: {
                ...rules[i],
                message: errorMsg || message,
              },
            });
            // 重新渲染form表单
            update?.();
          });
      }
    });
  }
}
export default Form;
