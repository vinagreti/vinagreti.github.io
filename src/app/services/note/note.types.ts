export type INote = {
  id: string;
  title: string;
  content: string;
};

export type INoteGroup = {
  id: string;
  title: string;
  notes: INote[];
};
