import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import Button from './Button'

describe('Button', () => {
  afterEach(cleanup)

  it('Should render', () => {
    render(<Button>Label</Button>)
  })
})
