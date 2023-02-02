export interface Component {
  id?: string;
  isLock?: boolean;
  component: string;
  label: string;
  propValue: string | Record<string, any>;
  icon: string;
  request?: Record<string, any>;
  style: Record<string, any>;
  // common attr
  collapseName?: string;
}

export interface ComponentParams {
  component: Component | null;
  index?: number | null;
}
export interface Pos {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  rotate?: number;
}
