export type BaseObject = {
  [key: string]: any;
};

export type BaseMap = Map<string, any>;

export type ExtractAllType<T> = T extends { [key: string]: infer U } ? U : T;

export type ExtractArrayType<T> = T extends (infer U)[] ? U : T;
