import { CSSProperties } from 'react';
import { Tooltip } from 'react-tooltip';

interface Props {
  id?: string;
  place: 'top' | 'bottom' | 'right' | 'left';
  content?: string;
  style?: CSSProperties;
}
const CustomTooltip = ({ id, place, content, style }: Props) => {
  return (
    <Tooltip
      id={id}
      place={place}
      content={content}
      style={{
        ...style,
        zIndex: 1000,
        borderRadius: '8px',
        boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
      }}
    />
  );
};

export default CustomTooltip;
