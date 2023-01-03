export interface Component {
  id?: string;
  component: string;
  label: string;
  propValue: string | Record<string, any>;
  icon: string;
  request?: Record<string, any>;
  style: Record<string, any>;
}

export interface ComponentParams {
  component: Component;
  index?: number;
}
export interface Pos {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  rotate?: number;
}
