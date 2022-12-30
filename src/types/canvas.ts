export interface Component {
  component: string;
  label: string;
  propValue: string | Record<string, any>;
  icon: string;
  request?: Record<string, any>;
  style?: Record<string, any>;
}
