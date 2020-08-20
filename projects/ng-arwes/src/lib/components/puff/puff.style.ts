import { rgba } from 'polished';
import { NgArwesTheme } from '../../types/theme.interfaces';

export const genPuffStyle = (theme: NgArwesTheme) => {
  const duration = 1000;
  const colorAlpha = theme.alpha / 1.5;
  const shadow1 = theme.shadowLength;
  const shadow2 = theme.shadowLength * 2;
  return `
.na-puff {
  display: block;
  position: relative;
}

.na-puff-children {
  display: block;
}

.na-puff-item {
  position: absolute;
  display: block;
  width: 1px;
  height: 1px;
  background-color: ${rgba(theme.color.primary.base, colorAlpha)};
  box-shadow: 0 0 ${shadow1}px ${shadow1}px ${rgba(theme.color.primary.base, colorAlpha)};
  border-radius: 50%;
  opacity: 0;
  animation: na-puff ${duration}ms ease-out 0ms 1;
}

.puff-long {
  box-shadow: 0 0 ${shadow2}px ${shadow2}px ${rgba(theme.color.primary.base, colorAlpha)};
  animation: na-puff-1 ${duration}ms ease-out 0ms 1;
}

@keyframes na-puff {
  0% {
    transform: scale(0.5, 0.5) translate(0, 30px);
    opacity: 0.25;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5, 1.5) translate(0, -30px);
    opacity: 0;
  }
}

@keyframes na-puff-1 {
  0% {
    transform: scale(0.5, 0.5) translate(0, 50px);
    opacity: 0.25;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: scale(1.5, 1.5) translate(0, -50px);
    opacity: 0;
  }
}
`;
};
