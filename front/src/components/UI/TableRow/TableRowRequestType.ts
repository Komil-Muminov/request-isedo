export interface TProps {
  item: {
    id: number;
    name: string;
  };
  getFile: {
    number: number;
    file: File | null;
  };

  handleGetFile: (id: number, file: File | null, executorFile: number) => void;
}
