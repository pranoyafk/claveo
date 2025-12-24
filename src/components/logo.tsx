import { cn } from '@/lib/utils'
import { useTheme } from './theme-provider'

export function Logo({
  size,
  className,
  showText = true,
  showBg = true,
}: {
  size: number
  className?: string
  showText?: boolean
  showBg?: boolean
}) {
  const { theme } = useTheme()
  return (
    <div
      className={cn(
        {
          'flex items-center justify-center gap-1.5': showText,
        },
        className,
      )}
    >
      <svg
        className={cn({
          'bg-secondary border p-1 w-fit rounded-lg': showBg,
        })}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={size}
        height={size}
      >
        <defs>
          <path id="petal" d="M 0,-20 L 20,-20 L 20,0 A 20,20 0 1 1 0,-20 Z" />
        </defs>

        <g fill={theme === 'dark' ? 'white' : 'black'}>
          <use href="#petal" transform="translate(71, 29)" />
          <use href="#petal" transform="translate(71, 71) rotate(90)" />
          <use href="#petal" transform="translate(29, 71) rotate(180)" />
          <use href="#petal" transform="translate(29, 29) rotate(270)" />
        </g>
      </svg>
      {showText && <h2 className="font-medium">Claveo</h2>}
    </div>
  )
}
