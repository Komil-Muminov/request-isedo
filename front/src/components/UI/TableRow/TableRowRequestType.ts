export interface TProps {
  item: {
    id: number;
    name: string;
  };
  file: {
    number: number;
    file: File | null;
  };
  handleGetFile: (id: number, file: File | null) => void;
}
