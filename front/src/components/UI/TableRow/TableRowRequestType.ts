export interface TProps {
  item: {
    id: number;
    name: string;
  };
  handleGetFile: (id: number, file: File | null) => void;
}
