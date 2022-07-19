import { SxProps } from '@mui/material';

export type Sx = {
  [key: string]: SxProps;
};

/**
 * Simple helper to create sx object
 *
 * references:
 * - https://stackoverflow.com/questions/51237668/typescript-declare-that-all-properties-on-an-object-must-be-of-the-same-type
 */
export const SxObject = <T extends Sx>(arg: T): T => arg;
