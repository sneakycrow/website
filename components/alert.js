import Container from './container';
import cn from 'classnames';

export default function Alert({ children }) {
  return (
    <div
      className={cn('border-b', {
        'bg-accent-1 border-accent-2': true,
      })}
    >
      <Container>
        <div className="py-2 text-center text-sm">
          {children}
        </div>
      </Container>
    </div>
  );
}
