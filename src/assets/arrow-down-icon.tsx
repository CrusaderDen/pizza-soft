type ArrowDownIconProps = {
  className: string
}

export const ArrowDownIcon = ({ className }: ArrowDownIconProps) => {
  return (
    <svg
      className={className || ''}
      fill={'none'}
      viewBox={'0 0 8 5'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <path
        d={'M1.54688 1.05559L3.99826 3.50003L6.44965 1.05559'}
        stroke={'#000'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={'1.5'}
      />
    </svg>
  )
}
