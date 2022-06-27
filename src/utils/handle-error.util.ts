import { UnprocessableEntityException } from '@nestjs/common';

export function handleError(error: Error): undefined {
  const errorLines = error.message?.split('/n');
  const newError = errorLines[errorLines.length - 1]?.trim();

  if (!newError) {
    console.error(error);
  }

  throw new UnprocessableEntityException(newError || 'new undefined error');
}
