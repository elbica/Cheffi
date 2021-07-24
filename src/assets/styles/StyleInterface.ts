export interface SectionProps {
  flexNumber: number;
  className?: string;
  background?: string;
  row?: boolean;
  paddings?: string;
  margin?: string;
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

export interface FontProps {
  [key: string]: string;
  size: 'xlarge' | 'large' | 'medium' | 'small';
}
