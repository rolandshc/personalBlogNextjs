import { PostType } from './post';

export interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string; // e.g., "website" or "article"
  date?: string;
  tag?: string;
}
