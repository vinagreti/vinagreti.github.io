export enum NOTE_STATUS {
  PENDING = "PENDING",
  DONE = "DONE",
}

export enum NOTE_GROUP_TYPE {
  REGULAR = "REGULAR",
  TODO = "TO-DO",
}

export type INote = {
  id: string;
  title: string;
  content: string;
  status?: NOTE_STATUS;
};

export type INoteGroup = {
  id: string;
  title: string;
  notes: INote[];
  dueDate?: string;
  type: NOTE_GROUP_TYPE;
};
